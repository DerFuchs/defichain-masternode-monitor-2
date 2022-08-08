import {
  defineStore
} from 'pinia';

export const useUserStore = defineStore('user',{
  state: () => ({
    userId: '',
    masterNodes: [],
    settings: {
      darkMode: 'auto',
      colorfulMode: 'false',
    },

    masterNodesEntryDefaults: {
      ownerAddress: '',
      operatorAddress: '',
      name: '',
    }
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
    setMasterNode(deFiChainAddress) {

      // TODO: Magic to find out weather the address is an operator address or operator address and vice versa

      // TODO: Don't add a new entry to the masterNodes list when it is already in there

      const ownerAddress = "foobar"
      const operatorAddress = "foobar"

      this.masterNodes.push({
        ownerAddress: ownerAddress,
        operatorAddress: operatorAddress,
      })
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
