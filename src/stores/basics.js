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
    messages: [
      {
        message: 'This is a Test',
        raw: null,
        read: false,
      }
    ],
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
      this.processing.push(key)
    },

    setProcessingFinished(key) {
      var index = this.processing.indexOf(key)
      if (index > -1) {
        this.processing.splice(index, 1)
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
      })
    },

    setMessageRead(id) {
      this.messages.find(entry => entry.id == id).read = true
    },

  },
})
