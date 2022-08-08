import {
  defineStore
} from 'pinia';

import {
  useBasicsStore
} from "stores/basics";

import {
  defichain
} from "boot/defichain-whale"

export const useDeFiChainStore = defineStore('defichain',{
  state: () => ({
    masterNodes: [],
    allKnownMasterNodes: [],
  }),

  persistedState: {
    key: 'mamon-masternodes',
  },

  getters: {
    hasKnownMasterNodeList: state => state.allKnownMasterNodes.length > 0
  },

  actions: {
    async fetchAllKnownDeFiChainMasterNodes() {
      const basicsStore = useBasicsStore()
      if (process.env.DEBUG) console.log('Fetching all known master nodes from DeFiChain')
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
  },
})
