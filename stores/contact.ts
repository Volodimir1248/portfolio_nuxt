import { defineStore } from 'pinia'

export const useContactSettingsStore = defineStore('contactSettings', {
  state: () => ({
    handlerUrl: ''
  }),
  actions: {
    setHandlerUrl(url: string) {
      this.handlerUrl = url
    }
  }
})
