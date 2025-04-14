import { defineStore } from 'pinia'

export const useFormStore = defineStore('form', {
  state: () => ({
    name: '',
    email: '',
    role: '',
    address: '',
    preferences: '',
    devTools: '',
    submitted: false  
  }),
  
  getters: {
    isStep1Complete: (state) => state.name && state.email && state.role,
    isStep2Complete: (state) => {
      const base = state.address && state.preferences
      const isComplete = state.role === 'developer' ? base && state.devTools : base
      return isComplete
    }
    
    
    
  },
  actions: {
    saveStep1Data({ name, email, role }) {
      this.name = name
      this.email = email
      this.role = role
      this.submitted = false 
      this.saveToStorage()
    },
    
    saveStep2Data({ address, preferences, devTools = '' }) {
      this.address = address
      this.preferences = preferences
      this.devTools = devTools
      this.submitted = true 
      this.saveToStorage()
    },
    
    resetForm() {
      this.$reset()
      this.submitted = false 
      localStorage.removeItem('formData')
    },
    
    saveToStorage() {
      localStorage.setItem('formData', JSON.stringify(this.$state))
    },
    loadFromStorage() {
      const data = localStorage.getItem('formData')
      if (data) {
        this.$patch(JSON.parse(data))
      }
    },
  
  }
})
