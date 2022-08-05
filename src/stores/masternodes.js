import {
  defineStore
} from 'pinia';

import {
  useBasicsStore
} from "stores/basics";

import {
  defichain
} from "boot/defichain-whale"

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useMasterNodesStore = defineStore('masternodes',{
  state: () => ({
    masterNodes: [],
    allKnownDeFiChainMasterNodes: [],
  }),
  persistedState: {
    key: 'mamon-masternodes',
  },
  getters: {
    hasMasterNodeList: state => state.allKnownDeFiChainMasterNodes.length > 0
  },
  actions: {
    async fetchAllKnownDeFiChainMasterNodes() {
      const basicsStore = useBasicsStore()
      if (process.env.DEBUG) console.log('Fetching all known master nodes')
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
        this.allKnownDeFiChainMasterNodes = masterNodeList
        basicsStore.setFetchingFinished('masternode_list')
        if (process.env.DEBUG) console.log('finished fetching all known master nodes')
      }
    },
  },
})
