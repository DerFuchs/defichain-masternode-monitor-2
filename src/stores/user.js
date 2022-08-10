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
     * @param {String} deFiChainAddress
     * @returns Boolean
     */
    watchesMasterNode: state => deFiChainAddress => state.masterNodes.some(entry => entry.ownerAddress == deFiChainAddress || entry.operatorAddress == deFiChainAddress),

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
     * @param {String} deFiChainAddress
     */
    async addWatchedMasterNode(deFiChainAddress, name = '') {
      const basicsStore = useBasicsStore()
      const processingKey = 'add_watched_master_node_' + deFiChainAddress

      // TODO: Don't add a new entry to the masterNodes list when it is already in there

      basicsStore.setProcessing(processingKey)

      const masterNodeDetails = await useDeFiChainStore().masterNodeDetails(deFiChainAddress)

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

    /**
     * Removes a master node from the user's watch list.
     *
     * It doesn't matter if address is an onwer address or an operator address
     *
     * @param {String} deFiChainAddress
     * */
    removeMasterNode(deFiChainAddress) {
      // TODO: Remove magic
    }
  },
})
