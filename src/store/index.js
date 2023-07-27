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
      planetDetail: {},
      starshipDetail: {},
      planetsPageInfo: {},
      previous: '',
      next: ''
    },

    mutations: {
      setPeople (state, payload) {
        state.people = payload.results
        state.previous = payload.previous
        state.next = payload.next
      },
      setPlanets (state, payload) {
        state.planets = payload
      },
      setStarships (state, payload) {
        state.starships = payload
      },
      setPeopleDetail (state, payload) {
        state.peopleDetail = payload
      },
      setPlanetDetail (state, payload) {
        state.planetDetail = payload
      },
      setStarshipDetail (state, payload) {
        state.starshipDetail = payload
      },
      setPlanetsPageInfo (state, payload) {
        state.planetsPageInfo = payload
      },
      addPlanets (state, payload) {
        state.planets = [...state.planets, ...payload]
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
      async getPlanets ({ commit, dispatch }, page = 1) {
        const response = await axios.get('/planets?page=' + page)
        const planets = response.data.results

        if (response.data.next) {
          await dispatch('getPlanets', page + 1)
        }

        commit('addPlanets', planets)
        const pageInfo = {
          count: response.data.count,
          next: response.data.next,
          previous: response.data.previous
        }

        if (response.data.next) {
          await dispatch('getPlanets', page + 1)
        }

        commit('setPlanets', planets)
        commit('setPlanetsPageInfo', pageInfo)
      },
      async getStarships ({ commit }) {
        const response = await axios.get('/starships')
        commit('setStarships', response.data.results)
      },
      async getPeopleDetail ({ commit }, id) {
        const response = await axios.get(`/people/${id}`)
        commit('setPeopleDetail', response.data)
      },
      async getPlanetDetail ({ commit }, id) {
        const response = await axios.get(`/planets/${id}`)
        commit('setPlanetDetail', response.data)
      },
      async getStarshipDetail ({ commit }, id) {
        const response = await axios.get(`/starships/${id}`)
        commit('setStarshipDetail', response.data)
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
