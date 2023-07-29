<template dark>
  <div dark class="category-container">
    <div v-if="loading" class="loading-container">
      <q-spinner-dots size="60px" color="white" />
    </div>
    <div v-else>
      <q-input
        v-model="searchQuery"
        label="Buscar por nombre"
        @keyup="searchPlanets"
        filled
        type="search"
        dark
        class="search-input full-width"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-card
        class="my-card text-black full-width"
        v-for="(planet, index) in planets"
        :key="index"
        dark
      >
        <router-link :to="{ name: 'PlanetsDetail', params: { id: transform(planet.url) } }">
          <q-card-section>
            <div class="text-h6 q-ma-sm-sm">{{ planet.name }}</div>
            <div class="text-subtitle2 q-ma-sm-sm decoration-none">Population: {{ planet.population }}</div>
          </q-card-section>
        </router-link>
      </q-card>

      <div class="buttons-container">
        <q-btn
          @click="prevPage"
          :disabled="disabledPrevButton"
          :class="disabledPrevButton ? 'disabled' : ''"
        >
          Prev
        </q-btn>
        <q-btn
          @click="nextPage"
          :disabled="disabledNextButton"
          :class="disabledNextButton ? 'disabled' : ''"
        >
          Next
        </q-btn>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { defineComponent } from 'vue'
import transform from '../utils/transform.js'

export default defineComponent({
  name: 'PagePlanets',
  data () {
    return {
      planets: [],
      searchQuery: '',
      loading: true,
      transform
    }
  },
  updated () {
    this.planets = this.filteredPlanets
  },
  mounted () {
    this.$store.dispatch('getPlanets').then(() => {
      this.loading = false
      this.planets = this.$store.state.planets
    })
  },
  computed: {
    disabledPrevButton () {
      return this.$store.state.previousPlanets === null
    },
    disabledNextButton () {
      return this.$store.state.nextPlanets === null
    },
    filteredPlanets () {
      return this.$store.state.planets.filter((planet) => {
        return planet.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      })
    }
  },
  methods: {
    async prevPage () {
      this.loading = true
      const response = await axios.get(this.$store.state.previousPlanets)
      this.$store.commit('setPlanets', response.data)
      this.loading = false
    },
    async nextPage () {
      this.loading = true
      const response = await axios.get(this.$store.state.nextPlanets)
      this.$store.commit('setPlanets', response.data)
      this.loading = false
    },
    searchPlanets () {
      if (this.searchQuery === '') {
        this.planets = this.$store.state.planets
      } else {
        this.planets = this.filteredPlanets
      }
    }
  }
})
</script>

<style lang="sass" scoped>
a:-webkit-any-link
  text-decoration: none
  color: #f4f4f4
</style>
