import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const state = {
	adminInfo: JSON.parse(sessionStorage.getItem('userinfo')),
}

const mutations = {

}

const actions = {

}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})
