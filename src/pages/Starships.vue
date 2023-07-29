<template dark>
  <div dark class="category-container">
    <div v-if="loading" class="loading-container">
      <q-spinner-dots size="60px" color="white" />
    </div>
    <div v-else>
      <q-input
        v-model="searchQuery"
        label="Buscar por nombre"
        @keyup="searchStarships"
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
        v-for="(starship, index) in starships"
        :key="index"
        dark
      >
        <router-link :to="{ name: 'StarshipsDetail', params: { id: transform(starship.url) } }">
          <q-card-section>
            <div class="text-h6 q-ma-sm-sm">{{ starship.name }}</div>
            <div class="text-subtitle2 q-ma-sm-sm decoration-none">Starship Class: {{ starship.starship_class }}</div>
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
  name: 'PageStarships',
  data () {
    return {
      starships: [],
      searchQuery: '',
      loading: true,
      transform
    }
  },
  updated () {
    this.starships = this.filteredStarships
  },
  mounted () {
    this.$store.dispatch('getStarships').then(() => {
      this.loading = false
      this.starships = this.$store.state.starships
    })
  },
  computed: {
    disabledPrevButton () {
      return this.$store.state.previousStarships === null
    },
    disabledNextButton () {
      return this.$store.state.nextStarships === null
    },
    filteredStarships () {
      return this.$store.state.starships.filter((starship) => {
        return starship.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      })
    }
  },
  methods: {
    async prevPage () {
      const response = await axios.get(this.$store.state.previousStarships)
      this.$store.commit('setStarships', response.data)
    },
    async nextPage () {
      const response = await axios.get(this.$store.state.nextStarships)
      this.$store.commit('setStarships', response.data)
    },
    searchStarships () {
      if (this.searchQuery === '') {
        this.starships = this.$store.state.starships
      } else {
        this.starships = this.filteredStarships
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
