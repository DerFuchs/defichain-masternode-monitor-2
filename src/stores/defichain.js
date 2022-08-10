import { defineStore } from 'pinia';
import { useBasicsStore } from "stores/basics";
import { useUserStore } from "stores/user";
import { defichain } from "boot/defichain-whale"

export const useDeFiChainStore = defineStore('defichain',{
  state: () => ({
    allKnownMasterNodes: [],
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
  },

  actions: {

    /**
     *
     */
    async fetchRewardDistribution() {
      this.rewardDistribution = await defichain.stats.getRewardDistribution()
    },

    // ------------------------------------------------------------------------------

    /**
     *
     * @param {*} state
     * @returns
     */
    async masterNodeDetails(address) {
      const basicsStore = useBasicsStore()
      const fetchingKey = 'masternode_details_' + address
      basicsStore.setFetching(fetchingKey)

      const searchMasterNode = () => entry =>
        entry.operator.address == address
        || entry.owner.address == address
        || entry.id == address

      if (!this.hasKnownMasterNodeList || !this.allKnownMasterNodes.some(searchMasterNode())) {
        // Fetch all Master Nodes when no MN is available
        await this.fetchAllKnownMasterNodes()
      }

      const masterNode = this.allKnownMasterNodes.find(searchMasterNode())

      basicsStore.setFetchingFinished(fetchingKey)

      // Update this master node's data and return it
      return await this.fetchMasterNodeData(masterNode.id)
    },

    // ------------------------------------------------------------------------------

    /**
     *
     */
    async fetchMasterNodeData(id) {
      const index = this.allKnownMasterNodes.findIndex(entry => entry.id == id)
      const masterNodeData = await defichain.masternodes.get(id)

      if (index === -1) {
        this.allKnownMasterNodes.push(masterNodeData)
      } else {
        this.allKnownMasterNodes[index] = masterNodeData
      }

      return masterNodeData
    },

    // ------------------------------------------------------------------------------

    /**
     *
     */
    async fetchAllKnownMasterNodes() {
      const basicsStore = useBasicsStore()
      if (process.env.DEBUG) console.log('Fetching all known master nodes from DeFiChain')

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
        if (process.env.DEBUG) console.log('finished fetching all known master nodes')
      }
    },

    // ------------------------------------------------------------------------------

    /**
     * Removes all unnecessary entries from the list of all known DeFiChain master
     * nodes to speed up the initial page loading process significantly.
     */
    cleanupAllKnownMasterNodes() {
      const user = useUserStore()
      this.allKnownMasterNodes = this.allKnownMasterNodes.filter(entry => user.masterNodes.some(masterNode => entry.id === masterNode.id))
    },

    // ------------------------------------------------------------------------------

    /**
     * reads all transactions from a given DeFiChain address and extracts those who
     * belong to a block minting by filtering our impossible tx values and then
     * compating the remaining blocks minters with the list of watches master nodes.
     *
     * TODO: Check only new/unkown TX ids which are not stored in the local cache
     *
     * @param {String} address
     */
    async fetchMasternodeMintings(address) {
      const basicsStore = useBasicsStore()
      if (process.env.DEBUG) console.log('Fetching master node mintings for owner address: ' + address);
      basicsStore.setFetching('mintings_' + address)
      try {
        const firstPage = await defichain.address.listTransaction(
          address,
          process.env.OCEAN_MAX_PAGE_SIZE
        )
        let currentPage = null
        let nextPage = null
        do {
          currentPage = nextPage != null ? nextPage : firstPage
          currentPage.forEach((tx) => {
            /**
             * There's no way to directly filter for all mintings.
             * So, we have to guess. A minting is from type 'vout', transacted value
             * must be less than 20,000 DFI and more than the current block reward.
             *
             * Filtering for this should do the trick.
             */
            if (tx.type != "vout" || tx.value >= 20_000 || tx.value <= 30) {
              return
            }
            console.log(tx)
            defichain.blocks.get(tx.block.hash).then((result) => {
              console.log(result)
            })
          })

          nextPage = await defichain.paginate(currentPage)
        } while (nextPage.length > 0)
      } finally {
        basicsStore.setFetchingFinished('mintings_' + address)
        if (process.env.DEBUG) console.log('finished fetching ' + address)
      }
    }
  },
})
