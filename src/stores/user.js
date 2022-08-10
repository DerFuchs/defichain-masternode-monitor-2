import { defineStore } from 'pinia';
import { useDeFiChainStore } from "stores/defichain";
import { useBasicsStore } from "stores/basics";

export const useUserStore = defineStore('user',{
  state: () => ({
    userId: '',
    masterNodes: [],
    settings: {
      darkMode: 'auto',
      colorfulMode: 'false',
    },

    masterNodesEntryDefaults: {
      name: '',
      id: '',
      ownerAddress: '',
      operatorAddress: '',
      creationBlock: 0,
      mintedBlocks: 0,
      state: '',
      timelock: '',
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
    watchesMasterNodes: state => state.masterNodes.length > 0,

    /**
     * Checks if provided DeFiChain address is available in the user's master node
     * list, no matter if it is an onwer address or an operator address.
     *
     * @param {String} identifier
     * @returns Boolean
     */
    watchesMasterNode: state => identifier => state.masterNodes.some(entry => entry.ownerAddress == identifier || entry.operatorAddress == identifier || entry.id == identifier),

    /**
     * Return the user's settings value
     *
     * @param {String} setting
     * @returns mixed
     */
    setting: state => setting => state.settings[setting]
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

      this.masterNodes.push({
        name: name,
        id: masterNodeDetails.id,
        ownerAddress: masterNodeDetails.owner.address,
        operatorAddress: masterNodeDetails.operator.address,
        creationBlock: masterNodeDetails.creation.height,
        resignBlock: masterNodeDetails.resign?.height ?? 0,
        mintedBlocks: [],
        state: masterNodeDetails.state,
        timelock: masterNodeDetails.timelock,
        raw: masterNodeDetails,

      })

      basicsStore.setProcessingFinished(processingKey)
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
      const index = this.masterNodes.findIndex(entry => entry.ownerAddress == identifier || entry.operatorAddress == identifier || entry.id == identifier)
      if (index > -1) {
        this.masterNodes.splice(index, 1);
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
      const index = this.masterNodes.findIndex(entry => entry.ownerAddress == identifier || entry.operatorAddress == identifier || entry.id == identifier)
      if (index > -1) {
        this.masterNodes[index].name = newName;
      }
    },

    // ------------------------------------------------------------------------------

  },
})
