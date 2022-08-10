import {
  defineStore
} from 'pinia'

import { useQuasar } from 'quasar'

export const useBasicsStore = defineStore('basics',
{
  state: () => ({
    version: '200',
    fetchingDataList: [],
    processing: [],
  }),

  persistedState: {
    key: 'mamon-basics',
  },

  getters: {
    fetching: state => state.fetchingDataList.length > 0,
    fetchingMintingsCount: state => {
      return state.fetchingDataList.filter(entry => entry.startsWith('mintings_'))
    },
    isFetching: state => key => state.fetchingDataList.some(entry => entry.startsWith(key)),

    isProcessing: state => (key) => {
      if (key == null) return state.processing.length > 0
      else return state.processing.some(entry => entry.startsWith(key))
    },

    darkMode: () => useQuasar().dark.isActive
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

    setProcessing(key) {
      this.processing.push(key)
    },

    setProcessingFinished(key) {
      var index = this.processing.indexOf(key)
      if (index > -1) {
        this.processing.splice(index, 1)
      }
    },

  },
})
