import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = 'https://swapi.dev/api/'

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {},

    state: {
      people: [],
      planets: [],
      starships: [],
      peopleDetail: {},
      planetsDetail: {},
      starshipsDetail: {},
      previousPeople: '',
      nextPeople: '',
      previousPlanets: '',
      nextPlanets: '',
      previousStarships: '',
      nextStarships: ''
    },

    mutations: {
      setPeople (state, payload) {
        state.people = payload.results
        state.previousPeople = payload.previous
        state.nextPeople = payload.next
      },
      setPlanets (state, payload) {
        state.planets = payload.results
        state.previousPlanets = payload.previous
        state.nextPlanets = payload.next
      },
      setStarships (state, payload) {
        state.starships = payload.results
        state.previousStarships = payload.previous
        state.nextStarships = payload.next
      },
      setPeopleDetail (state, payload) {
        state.peopleDetail = payload
      },
      setPlanetsDetail (state, payload) {
        state.planetsDetail = payload
      },
      setStarshipsDetail (state, payload) {
        state.starshipsDetail = payload
      }
    },

    actions: {
      async getOriginalPeople ({ commit }) {
        const response = await axios.get('/people')
        commit('setPeople', response.data.results)
      },
      async getPeople ({ commit }) {
        const response = await axios.get('/people')
        commit('setPeople', response.data)
      },
      async getOriginalPlanets ({ commit }) {
        const response = await axios.get('/planets')
        commit('setPlanets', response.data.results)
      },
      async getPlanets ({ commit }) {
        const response = await axios.get('/planets')
        commit('setPlanets', response.data)
      },
      async getOriginalStarships ({ commit }) {
        const response = await axios.get('/starships')
        commit('setStarships', response.data.results)
      },
      async getStarships ({ commit }) {
        const response = await axios.get('/starships')
        commit('setStarships', response.data)
      },
      async getPeopleDetail ({ commit }, id) {
        const response = await axios.get(`/people/${id}`)
        commit('setPeopleDetail', response.data)
      },
      async getPlanetsDetail ({ commit }, id) {
        const response = await axios.get(`/planets/${id}`)
        commit('setPlanetsDetail', response.data)
      },
      async getStarshipsDetail ({ commit }, id) {
        const response = await axios.get(`/starships/${id}`)
        commit('setStarshipsDetail', response.data)
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
