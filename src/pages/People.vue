<template>
  <div>
    <q-input
        v-model="searchQuery"
        label="Buscar por nombre"
        @keyup="searchPeople"
        filled
        type="search"
    >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
    </q-input>
    <q-card
      class="my-card text-black"
      v-for="(person, index) in people"
      :key="index"
    >
        <q-card-section>
            <div class="text-h6 q-ma-sm-sm">{{ person.name }}</div>
            <div class="text-subtitle2 q-ma-sm-sm">Gender: {{ person.gender}}</div>
        </q-card-section>
    </q-card>

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
</template>
<script>
import axios from 'axios'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PagePeople',
  data () {
    return {
      people: [],
      allPeople: [],
      searchQuery: ''
    }
  },
  updated () {
    this.people = this.filteredPeople
  },
  mounted () {
    this.$store.dispatch('getPeople').then(() => {
      this.people = this.$store.state.people
    })
    this.getAllPeopleData()
  },
  computed: {
    disabledPrevButton () {
      return this.$store.state.previous === null
    },
    disabledNextButton () {
      return this.$store.state.f === null
    },
    filteredPeople () {
      return this.$store.state.people.filter(person => {
        return person.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      })
    }
  },
  methods: {
    async getAllPeopleData () {
      let allPeople = []
      let nextPageUrl = 'https://swapi.dev/api/people/'

      // Realiza solicitudes a la API hasta que no haya una URL de siguiente página
      while (nextPageUrl) {
        console.log(nextPageUrl)
        const response = await axios.get(nextPageUrl)
        allPeople = allPeople.concat(response.data.results)
        nextPageUrl = response.data.next
      }

      console.log(allPeople)
      this.allPeople = allPeople
    },
    async prevPage () {
      const response = await axios.get(this.$store.state.previous)
      this.$store.commit('setPeople', response.data)
    },
    async nextPage () {
      const response = await axios.get(this.$store.state.next)
      this.$store.commit('setPeople', response.data)
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
<style scoped>
  .disabled {
    cursor: not-allowed;
  }
</style>
