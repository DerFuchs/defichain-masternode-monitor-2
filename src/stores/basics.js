import {
  defineStore
} from 'pinia'

import { useQuasar } from 'quasar'

export const useBasicsStore = defineStore('basics',
{
  state: () => ({
    version: '200',
    fetchingDataList: [],
    processingDataList: [],
    lastRefresh: new Date(),
    messages: [],
    formatting: {
      currency: {
        usd: { style: 'currency', currency: 'USD' },
        dfi: { style: 'currency', currency: 'DFI' },
        dfiNoSymbol: { minimumFractionDigits: 2, maximumFractionDigits: 2 },
      }
    },
    dashboardCardsContentEnterAnimation: "animated jackInTheBox",
    dashboardCardsContentLeaveAnimation: "animated flipOutY",
  }),

  persistedState: {
    key: 'mamon-basics',
    excludePaths: [
      'fetchingDataList',
      'processingDataList',
      'formatting',
      'lastRefresh',
      'version',
      'dashboardCardsContentEnterAnimation',
      'dashboardCardsContentLeaveAnimation',

    ]
  },

  getters: {
    // Fetching
    fetching: state => state.fetchingDataList.length > 0,
    isFetching: state => key => state.fetchingDataList.some(entry => entry.startsWith(key)),
    fetchingMintingsCount: state => {
      return state.fetchingDataList.filter(entry => entry.startsWith('mintings_')).length
    },

    // Processing
    processing: state => state.processingDataList.length > 0,
    isProcessing: state => (key) => {
      if (key == null) return state.processingDataList.length > 0
      else return state.processingDataList.some(entry => entry.startsWith(key))
    },

    darkMode: () => useQuasar().dark.isActive,

    hasUnreadMessages: state => state.messages.some(entry => entry.read == false),

    unreadMessages: state => state.messages.filter(entry => entry.read == false),

    hasUnreadErrors: state => state.messages.some(entry => entry.read == false && entry.type == "error"),

    unreadErrors: state => state.messages.filter(entry => entry.read == false && entry.type == "error")
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
      this.processingDataList.push(key)
    },

    setProcessingFinished(key) {
      var index = this.processingDataList.indexOf(key)
      if (index > -1) {
        this.processingDataList.splice(index, 1)
      }
    },

    addError(message, headline = null, rawObject = null) {
      this.messages.push({
        // uuid
        id: ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)),
        type: 'error',
        headline: headline,
        message: message,
        raw: rawObject,
        read: false,
        time: new Date(),
      })
    },

    setMessageRead(id) {
      this.messages.find(entry => entry.id == id).read = true
    },

  },
})
