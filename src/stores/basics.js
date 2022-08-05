import {
  defineStore
} from 'pinia'

import {
  defichain
} from "boot/defichain-whale"

export const useBasicsStore = defineStore('basics',
{
  state: () => ({
    version: '200',
    fetchingDataList: [],
  }),
  persistedState: {
    key: 'mamon-basics',
  },
  getters: {
    fetching: state => state.fetchingDataList.length > 0,
    fetchingMintings: state => {
      return state.fetchingDataList.filter(entry => entry.startsWith('mintings_'))
    },
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
      if (process.env.DEBUG) console.log('Fetching all mintings for entered master nodes')
      //this.fetchMasternodeMintings("8Ht3oDDj2uHeoae3mKALM6kVmsuJaj3SSm")
      //this.fetchMasternodeMintings("8N5iyTHbJNQc1nTfF74khJ9rndj6kG9FzN")
      this.fetchMasternodeMintings("8YsdyhGMoJfjfujfQox1D2S8d4JTzGQivj")
    },

    /**
     * Fetch all TX
     * are there new TX?
     * if yes:  - iterate over all TX
     *          - when coinbase = true ==> save TX to not load it again
     * return all saved tx
     * @param {*} address
     */
    async fetchMasternodeMintings(address) {
      if (process.env.DEBUG) console.log('Fetching master node mintings for owner address: ' + address);
      this.setFetching('mintings_' + address)
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
        this.setFetchingFinished('mintings_' + address)
        if (process.env.DEBUG) console.log('finished fetching ' + address)
      }
    }
  },
})
