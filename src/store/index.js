import { createStore } from 'vuex'
import getters from './getters'
import homework from './modules/homework'

export default createStore({
  getters,
  modules: {
    homework
  }
})
