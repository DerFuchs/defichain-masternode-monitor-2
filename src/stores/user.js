import { defineStore } from 'pinia';
import { useDeFiChainStore } from "stores/defichain";
import { useBasicsStore } from "stores/basics";
import { iterate } from 'localforage';

export const useUserStore = defineStore('user',{
  state: () => ({
    userId: '',
    watchedMasterNodes: [],
    settings: {
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

    //defichain: useDeFiChainStore(),
  }),

  // --------------------------------------------------------------------------------

  persistedState: {
    key: 'mamon-user',
  },

  // --------------------------------------------------------------------------------

  getters: {

    /**
     * Returns true if the user is 'authenticated' - which means that he/she has
     * grabbed a sync key to store settings and watches master nodes remotely.
     *
     * @param {*} state
     * @returns Boolean
     */
    hasUserId: state => state.userId.length > 0,

    /**
     * Returns true if the user is watching at least one master node
     *
     * @returns  Boolean
     */
    watchesMasterNodes: state => state.watchedMasterNodes.length > 0,

    /**
     * Checks if provided DeFiChain address is available in the user's master node
     * list, no matter if it is an onwer address or an operator address.
     *
     * @param {String} identifier
     * @returns Boolean
     */
    watchesMasterNode: state => identifier => state.watchedMasterNodes.some(entry => entry.ownerAddress == identifier || entry.operatorAddress == identifier || entry.id == identifier),

    /**
     * Delivers only watches master nodes which are NOT resigned
     */
    watchedActiveMasterNodes: state => state.watchedMasterNodes.filter(entry => entry.state != 'RESIGNED'),

    /**
     * Returns the array index of the given master node identifier
     */
    watchedMasterNodeIndex: state => identifier => state.watchedMasterNodes.findIndex(entry => entry.ownerAddress == identifier || entry.operatorAddress == identifier || entry.id == identifier)

  },

  // --------------------------------------------------------------------------------

  actions: {
    /**
     * Adds a master node to the user's watch list.
     *
     * It doesn't matter if address is an onwer address or an operator address
     *
     * @param {String} identifier
     */
    async addWatchedMasterNode(identifier, name = '') {
      if (this.watchesMasterNode(identifier)) return

      const basicsStore = useBasicsStore()
      const defichain = useDeFiChainStore()
      const processingKey = 'add_watched_master_node_' + identifier

      basicsStore.setProcessing(processingKey)

      const masterNodeDetails = await defichain.masterNodeDetails(identifier)

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
          raw: masterNodeDetails,
        },
      })

      basicsStore.setProcessingFinished(processingKey)
    },

    // ------------------------------------------------------------------------------

    fetchWatchedMasterNodesData() {
      const defichain = useDeFiChainStore()

      this.watchedMasterNodes.forEach((entry) => {
        defichain.masterNodeDetails(entry.id).then((masterNodeDetails) => {
          this.updateWatchedMasterNodeData(masterNodeDetails)
        })
      })
    },

    // ------------------------------------------------------------------------------

    updateWatchedMasterNodeData(rawMasterNodeData) {
      const index = this.watchedMasterNodeIndex(rawMasterNodeData.id)
      console.log(index)
      if (index === -1) return

      const newData = {
        id: rawMasterNodeData.id,
        ownerAddress: rawMasterNodeData.owner.address,
        operatorAddress: rawMasterNodeData.operator.address,
        creationBlock: rawMasterNodeData.creation.height,
        resignBlock: rawMasterNodeData.resign?.height ?? 0,
        mintedBlocksCount: rawMasterNodeData.mintedBlocks,
        state: rawMasterNodeData.state,
        timelock: rawMasterNodeData.timelock,
        raw: rawMasterNodeData,
      }

      this.watchedMasterNodes[index] = {
        ...this.watchedMasterNodesEntryDefaults,
        ...this.watchedMasterNodes[index],
        ...newData,
      }
    },

    // ------------------------------------------------------------------------------

    /**
     * Removes a master node from the user's watch list.
     *
     * identifier can be ownerAddress, operatorAddress or DeFiChain master node ID
     *
     * @param {String} identifier
     * */
    removeWatchedMasterNode(identifier) {
      if (!this.watchesMasterNode(identifier)) return
      const index = this.watchedMasterNodes.findIndex(entry => entry.ownerAddress == identifier || entry.operatorAddress == identifier || entry.id == identifier)
      if (index > -1) {
        this.watchedMasterNodes.splice(index, 1);
      }
    },

    // ------------------------------------------------------------------------------

    /**
     * Sets a new name to a particular watched master node
     *
     * @param {String} identifier
     * @param {String} newName
     */
    renameMasterNode(identifier, newName) {
      if (!this.watchesMasterNode(identifier)) return
      const index = this.watchedMasterNodes.findIndex(entry => entry.ownerAddress == identifier || entry.operatorAddress == identifier || entry.id == identifier)
      if (index > -1) {
        this.watchedMasterNodes[index].name = newName;
      }
    },

    // ------------------------------------------------------------------------------

  },
})
