import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tableData:[]
  },
  mutations: {
    setData(state,payload){
      console.log(state,payload)
      state.tableData=payload
    }
  },
  getters:{
    getData(state){
      return state.tableData
    },
  },
  actions: {
    getData(context,num){
      console.log(num)
      axios.get(`https://randomuser.me/api?results=${num}`)
        .then(function (response) {
          context.commit('setData',response.data.results)
        })
    }
  }
})
