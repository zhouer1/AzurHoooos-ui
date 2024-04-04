import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'',
    access:[],
  },
  getters: {
  },
  mutations: {
    setToken(state,token){
      state.token=token;
    },
    getToken(state){
      return state.token;
    },
    clearToken(state){
      state.token='';
    },
    setAccess(state,access){
      state.access=access;
    },
    getAccess(state){

    },
    clearAccess(state){
      state.access=[];
    }
  },
  actions: {
  },
  modules: {
  }
})
