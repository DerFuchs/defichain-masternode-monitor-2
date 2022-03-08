import { defineStore } from 'pinia'
import { defichain } from "boot/defichain-whale"

export const useBasicsStore = defineStore('basics', {
  state: () => ({
    version: '100',
    fetchingDataList: [],
  }),
  getters: {
    version: state => state.version,
    fetching: state => state.fetchingDataList.length > 0,
  },
  actions: {

    setFetching(key) {
      this.fetchingDataList.push(key)
    },

    setFetchingFinished(key) {
      var index = this.fetchingDataList.indexOf(key)
      if (index > -1) {
        this.fetchingDataList.splice(index, 1)
      }
    },

    fetchAllMintings() {
      if (process.env.DEBUG) console.log('Fetching all mintings')
      this.fetchMasternodeMintings("8Ht3oDDj2uHeoae3mKALM6kVmsuJaj3SSm")
      this.fetchMasternodeMintings("8N5iyTHbJNQc1nTfF74khJ9rndj6kG9FzN")
      this.fetchMasternodeMintings("8YsdyhGMoJfjfujfQox1D2S8d4JTzGQivj")
    },

    async fetchMasternodeMintings(address) {
      if (process.env.DEBUG) console.log('Fetching ' + address)
      this.setFetching('fetchMintings_' + address)
      try {
        const firstPage = await defichain.address.listTransaction(
          address,
          process.env.OCEAN_MAX_PAGE_SIZE
        )
        let currentPage = null
        let nextPage = null
        do {
          currentPage = nextPage != null ? nextPage : firstPage
          nextPage = await defichain.paginate(currentPage)
        } while (nextPage.length > 0)
      } finally {
        this.setFetchingFinished('fetchMintings_' + address)
        if (process.env.DEBUG) console.log('finished fetching ' + address)
      }
    }
  },
})
