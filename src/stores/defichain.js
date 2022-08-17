import { defineStore } from 'pinia';
import { useBasicsStore } from "stores/basics";
import { useUserStore } from "stores/user";
import { defichain } from "boot/defichain-whale"

export const useDeFiChainStore = defineStore('defichain', {
  state: () => ({
    allKnownMasterNodes: [],
    allKnownBlocks: [],
    rewardDistribution: {
      anchor: 0,
      community: 0,
      liquidity: 0,
      loan: 0,
      masternode: 0,
      options: 0,
      unallocated: 0,
    },
  }),

  persistedState: {
    key: 'mamon-defichain',
  },

  getters: {
    hasKnownMasterNodeList: state => state.allKnownMasterNodes.length > 0,

    currentStakingReward: state => parseFloat(state.rewardDistribution.masternode),

    masternode: state => identifier => state.allKnownMasterNodes.find(entry =>
        entry.operator.address == identifier
        || entry.owner.address == identifier
      || entry.id == identifier
    ),

    masternodeKnown: state => identifier => state.allKnownMasterNodes.some(entry =>
        entry.operator.address == identifier
        || entry.owner.address == identifier
      || entry.id == identifier
    ),

    blockKnown: state => blockHash => {
      return state.allKnownBlocks.some(block => block.hash == blockHash)
    },

    block: state => blockHash => {
      return state.allKnownBlocks.find(block => block.hash == blockHash)
    }
  },

  actions: {
    /**
     *
     * @param {String} customOceanUrl
     */
    setCustomOceanUrl(customOceanUrl) {
      if (customOceanUrl && customOceanUrl.length > 0) {
        defichain.options.url = customOceanUrl.trim();
      } else {
        defichain.options.url = process.env.OCEAN_URL;
      }
    },

    // ------------------------------------------------------------------------------

    /**
     *
     * @param {String} networkName
     */
    setChainNetwork(networkName) {
      if (networkName && networkName.length > 0) {
        defichain.options.network = networkName;
      } else {
        defichain.options.network = process.env.OCEAN_NETWORK;
      }
    },

    // ------------------------------------------------------------------------------

    /**
     *
     */
    async fetchRewardDistribution() {
      this.rewardDistribution = await defichain.stats.getRewardDistribution()
    },

    // ------------------------------------------------------------------------------

    /**
     *
     * @param {String} address
     * @returns {Promise}
     */
    async masterNodeDetails(address) {
      const basicsStore = useBasicsStore()
      const fetchingKey = 'masternode_details_' + address
      basicsStore.setFetching(fetchingKey)

      if (!this.hasKnownMasterNodeList || !this.masternodeKnown(address)) {
        // Fetch all Masternodes when no MN is available
        await this.fetchAllKnownMasterNodes()
      }

      const masterNode = this.masternode(address)
      const masterNodeData = await this.fetchMasterNodeData(masterNode?.id) || null

      basicsStore.setFetchingFinished(fetchingKey)

      // Update this masternode's data and return it
      return masterNodeData
    },

    // ------------------------------------------------------------------------------

    /**
     *
     */
    async fetchMasterNodeData(id) {
      const index = this.allKnownMasterNodes.findIndex(entry => entry.id == id)
      try {
        const masterNodeData = await defichain.masternodes.get(id)

        masterNodeData.mintings = await this.fetchMasternodeMintings(masterNodeData.owner.address, masterNodeData.operator.address)

        if (index === -1) {
          this.allKnownMasterNodes.push(masterNodeData)
        } else {
          this.allKnownMasterNodes[index] = masterNodeData
        }

        return masterNodeData

      } catch (error) {
        useBasicsStore().addError(error.message, 'Unable to fetch masternode data from DeFiChain', error)
        return
      }
    },

    // ------------------------------------------------------------------------------

    /**
     *
     */
    async fetchAllKnownMasterNodes() {
      const basicsStore = useBasicsStore()
      if (process.env.DEBUG) console.log('Fetching all known masternodes from DeFiChain')

      // todo: Show message in UI that this process can take a while
      basicsStore.setFetching('masternode_list')
      let masterNodeList = []
      try {
        const firstPage = await defichain.masternodes.list(
          process.env.OCEAN_MAX_PAGE_SIZE
        )
        let currentPage = null
        let nextPage = null
        do {
          currentPage = nextPage != null ? nextPage : firstPage
          masterNodeList = masterNodeList.concat(currentPage)
          nextPage = await defichain.paginate(currentPage)
        } while (nextPage.length > 0)
      } finally {
        this.allKnownMasterNodes = masterNodeList
        basicsStore.setFetchingFinished('masternode_list')
        if (process.env.DEBUG) console.log('finished fetching all known masternodes')
      }
    },

    // ------------------------------------------------------------------------------

    /**
     * Removes all unnecessary entries from the list of all known DeFiChain master
     * nodes to speed up the initial page loading process significantly.
     */
    cleanupAllKnownMasterNodes() {
      const user = useUserStore()
      this.allKnownMasterNodes = this.allKnownMasterNodes.filter(entry => user.watchedMasterNodes.some(masterNode => entry.id === masterNode.id))
    },

    // ------------------------------------------------------------------------------

    /**
     * reads all transactions from a given DeFiChain address and extracts those who
     * belong to a block minting by filtering our impossible tx values and then
     * compating the remaining blocks minters with the list of watches masternodes.
     *
     * TODO: Check only new/unkown TX ids which are not stored in the local cache
     *
     * @param {String} address
     */
    async fetchMasternodeMintings(address, operatorAddress) {
      const basicsStore = useBasicsStore()
      const blocks = []
      if (process.env.DEBUG) console.log('Fetching masternode mintings for owner address: ' + address);
      basicsStore.setFetching('mintings_' + address)

      let txList = [];

      // collect all Transactions first
      try {
        const firstPage = await defichain.address.listTransaction(
          address,
          process.env.OCEAN_MAX_PAGE_SIZE
        )
        let currentPage = null
        let nextPage = null
        do {
          currentPage = nextPage != null ? nextPage : firstPage
          txList = [...txList, ...currentPage]
          nextPage = await defichain.paginate(currentPage)
        } while (nextPage.length > 0)
      } finally {
        // wait until the details of all transactions have been fetched
        const blockTmp = []
        await Promise.all(
          txList.map(async (tx) => {
            // use locally stored block data to avoid calling Ocean

            if (this.blockKnown(tx.block.hash)) {
              const block = this.block(tx.block.hash)
              if (block.minter == operatorAddress) {
                blocks.push(block)
              }
              return
            }


            /**
             * Remove TX which are definetly no mintings.
             *
             * There's no way to directly filter for that.
             * So, we have to guess. A minting is from type 'vout', transacted value
             * must be less than 20,000 DFI and more than the current block reward.
             *
             * Filtering for this should do the trick to drastically reduce the number
             * of transactions to take a look at the right minter's address.
             */
            if (tx.type != "vout" || tx.value >= 20_000 || tx.value < this.currentStakingReward) {
              return
            }

            const block = await defichain.blocks.get(tx.block.hash)

            console.log("pushing Block", block.id)
            //this.allKnownBlocks.push(block)
            blockTmp.push(block)
            console.log("pushed Block", block.id)

            if (block.minter == operatorAddress) {
              blocks.push(block)
            }

          })
        );
        this.allKnownBlocks = [...this.allKnownBlocks, ...blockTmp]

        basicsStore.setFetchingFinished('mintings_' + address)
        if (process.env.DEBUG) console.log('finished fetching ' + address)

        return blocks
      }
    }
  },
})
