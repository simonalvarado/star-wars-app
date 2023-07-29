<template dark>
  <div dark class="category-container">
    <div v-if="loading" class="loading-container">
      <q-spinner-dots size="60px" color="white" />
    </div>
    <div v-else>
      <q-input
        v-model="searchQuery"
        label="Buscar por nombre"
        @keyup="searchPeople"
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
        v-for="(person, index) in people"
        :key="index"
        dark
      >
        <router-link :to="{ name: 'PeopleDetail', params: { id: transform(person.url) } }">
          <q-card-section>
            <div class="text-h6 q-ma-sm-sm">{{ person.name }}</div>
            <div class="text-subtitle2 q-ma-sm-sm decoration-none">Gender: {{ person.gender }}</div>
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
  name: 'PagePeople',
  data () {
    return {
      people: [],
      searchQuery: '',
      loading: true,
      transform
    }
  },
  updated () {
    this.people = this.filteredPeople
  },
  mounted () {
    this.$store.dispatch('getPeople').then(() => {
      this.loading = false
      this.people = this.$store.state.people
    })
  },
  computed: {
    disabledPrevButton () {
      return this.$store.state.previousPeople === null
    },
    disabledNextButton () {
      return this.$store.state.nextPeople === null
    },
    filteredPeople () {
      return this.$store.state.people.filter((person) => {
        return person.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      })
    }
  },
  methods: {
    async prevPage () {
      this.loading = true
      const response = await axios.get(this.$store.state.previousPeople)
      this.$store.commit('setPeople', response.data)
      this.loading = false
    },
    async nextPage () {
      this.loading = true
      const response = await axios.get(this.$store.state.nextPeople)
      this.$store.commit('setPeople', response.data)
      this.loading = false
    },
    searchPeople () {
      if (this.searchQuery === '') {
        this.people = this.$store.state.people
      } else {
        this.people = this.filteredPeople
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
