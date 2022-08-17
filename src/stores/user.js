import { defineStore } from 'pinia';
import { useDeFiChainStore } from "stores/defichain";
import { useBasicsStore } from "stores/basics";

export const useUserStore = defineStore('user',{
  state: () => ({
    userId: '',
    watchedMasterNodes: [],
    settings: {
      chainNetwork: process.env.OCEAN_NETWORK,
      customOceanUrl: null,
      darkMode: 'auto',
      colorfulMode: false,
    },

    watchedMasterNodesEntryDefaults: {
      name: '',
      id: '',
      ownerAddress: '',
      operatorAddress: '',
      creationBlock: 0,
      resignBlock: 0,
      mintedBlocks: [],
      mintedBlocksCount: 0,
      state: '',
      timelock: 0,
      raw: null,
    },

  }),

  // --------------------------------------------------------------------------------

  /**
   * Handles data persistance in IndexedDB
   */
  persistedState: {
    key: 'mamon-user',
  },

  // --------------------------------------------------------------------------------

  getters: {

    /**
     * Returns true if the user is 'authenticated' - which means that he/she has
     * grabbed a sync key to store settings and watches masternodes remotely.
     *
     * @param {*} state
     * @returns Boolean
     */
    hasUserId: state => state.userId.length > 0,

    /**
     * Returns true if the user is watching at least one masternode
     *
     * @returns  Boolean
     */
    watchesMasterNodes: state => state.watchedMasterNodes.length > 0,

    /**
     * Checks if provided DeFiChain address is available in the user's masternode
     * list, no matter if it is an onwer address or an operator address or an MN id
     *
     * @param {String} identifier
     * @returns Boolean
     */
    watchesMasterNode: state => identifier => state.watchedMasterNodes.some(entry => entry.ownerAddress == identifier || entry.operatorAddress == identifier || entry.id == identifier),

    /**
     * Delivers only watches masternodes which are NOT resigned
     *
     * @returns Array of Objects
     */
    watchedActiveMasterNodes: state => state.watchedMasterNodes.filter(entry => entry.state != 'RESIGNED'),

    /**
     * Returns the array index of the given masternode identifier
     *
     * @returns  Integer
     */
    watchedMasterNodeIndex: state => identifier => state.watchedMasterNodes.findIndex(entry => entry.ownerAddress == identifier || entry.operatorAddress == identifier || entry.id == identifier),

    totalBlockProperty: state => blockKey => state.watchedMasterNodes.reduce(
      (total, masternode) =>
        masternode.mintedBlocks.reduce(
          (subTotal, minting) => parseFloat(minting[blockKey]) + subTotal,
          0
        ) + total,
      0
    ),

  },

  // --------------------------------------------------------------------------------

  actions: {
    /**
     * Adds a masternode to the user's watch list.
     *
     * It doesn't matter if address is an onwer address or an operator address
     *
     * @param {String} identifier
     */
    async addWatchedMasterNode(identifier, name = '') {
      if (this.watchesMasterNode(identifier)) return

      const basics = useBasicsStore()
      const defichain = useDeFiChainStore()
      const processingKey = 'add_watched_master_node_' + identifier

      basics.setProcessing(processingKey)

      const masterNodeDetails = await defichain.masterNodeDetails(identifier)

      if (!masterNodeDetails) {
        basics.setProcessingFinished(processingKey)
        return
      }

      this.watchedMasterNodes.push({
        ...this.watchedMasterNodesEntryDefaults,
        ...{
          name: name,
          id: masterNodeDetails.id,
          ownerAddress: masterNodeDetails.owner.address,
          operatorAddress: masterNodeDetails.operator.address,
          creationBlock: masterNodeDetails.creation.height,
          resignBlock: masterNodeDetails.resign?.height ?? 0,
          mintedBlocks: [],
          mintedBlocksCount: masterNodeDetails.mintedBlocks,
          state: masterNodeDetails.state,
          timelock: masterNodeDetails.timelock,
          //raw: masterNodeDetails,
        },
      })

      basics.setProcessingFinished(processingKey)
    },

    // ------------------------------------------------------------------------------

    /**
     * Reloads the data of all watched master nodes
     */
    async fetchWatchedMasterNodesData() {
      const defichain = useDeFiChainStore()

      await Promise.all(
        this.watchedMasterNodes.map(async (entry) => {
          await defichain.masterNodeDetails(entry.id).then((masterNodeDetails) => {
            this.updateWatchedMasterNodeData(masterNodeDetails)
          })
        })
      );
    },

    // ------------------------------------------------------------------------------

    /**
     * Receives raw master node data and transforms it into master node monitor's
     * internal data structure.
     *
     * @param {Object} rawMasterNodeData
     * @returns
     */
    updateWatchedMasterNodeData(rawMasterNodeData) {
      const index = this.watchedMasterNodeIndex(rawMasterNodeData?.id)
      if (index === -1) return

      const newData = {
        id: rawMasterNodeData.id,
        ownerAddress: rawMasterNodeData.owner.address,
        operatorAddress: rawMasterNodeData.operator.address,
        creationBlock: rawMasterNodeData.creation.height,
        resignBlock: rawMasterNodeData.resign?.height ?? 0,
        mintedBlocks: rawMasterNodeData.mintings,
        mintedBlocksCount: rawMasterNodeData.mintedBlocks,
        state: rawMasterNodeData.state,
        timelock: rawMasterNodeData.timelock,
        //raw: rawMasterNodeData,
      }

      this.watchedMasterNodes[index] = {
        ...this.watchedMasterNodesEntryDefaults,
        ...this.watchedMasterNodes[index],
        ...newData,
      }
    },

    // ------------------------------------------------------------------------------

    /**
     * Removes a masternode from the user's watch list.
     *
     * identifier can be ownerAddress, operatorAddress or DeFiChain masternode ID
     *
     * @param {String} identifier
     * */
    removeWatchedMasterNode(identifier) {
      if (!this.watchesMasterNode(identifier)) return
      const index = this.watchedMasterNodeIndex(identifier)
      if (index > -1) {
        this.watchedMasterNodes.splice(index, 1);
      }
    },

    // ------------------------------------------------------------------------------

    /**
     * Sets a new name to a particular watched masternode
     *
     * @param {String} identifier
     * @param {String} newName
     */
    renameMasterNode(identifier, newName) {
      if (!this.watchesMasterNode(identifier)) return
      const index = this.watchedMasterNodeIndex(identifier)
      if (index > -1) {
        this.watchedMasterNodes[index].name = newName;
      }
    },

    // ------------------------------------------------------------------------------

  },
})
