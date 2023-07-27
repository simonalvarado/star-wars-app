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

    <q-pagination
      v-model="currentPage"
      :min="1"
      :max="totalPages"
      @input="changePage"
      class="q-mt-md"
    />
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
      searchQuery: '',
      currentPage: 1,
      perPage: 10
    }
  },
  mounted () {
    this.$store.dispatch('getPeople').then(() => {
      this.people = this.$store.state.people
      this.updatePaginatedPeople()
    })
    // this.getAllPeopleData()
    this.currentPage = this.$store.state.currentPage
    this.perPage = this.$store.state.perPage
    console.log('total pages', this.totalPages)
    this.getPeopleAlt()
  },
  computed: {
    filteredPeople () {
      return this.$store.state.people.filter(person => {
        return person.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      })
    },
    totalPages () {
      return Math.ceil(this.allPeople.length / this.perPage)
    }
  },
  methods: {
    async getAllPeopleData () {
      let nextPageUrl = 'https://swapi.dev/api/people/'

      // Realiza solicitudes a la API hasta que no haya una URL de siguiente página
      while (nextPageUrl) {
        console.log(nextPageUrl)
        const response = await axios.get(nextPageUrl)
        this.allPeople = this.allPeople.concat(response.data.results)
        nextPageUrl = response.data.next
      }

      console.log(this.allPeople)
      this.updatePaginatedPeople()
    },
    updatePaginatedPeople () {
      const startIndex = (this.currentPage - 1) * this.perPage
      const endIndex = startIndex + this.perPage
      this.paginatedPeople = this.allPeople.slice(startIndex, endIndex)
    },
    searchPeople () {
      if (this.searchQuery === '') {
        this.people = this.$store.state.people
      } else {
        this.people = this.filteredPeople
      }
    },
    changePage (page) {
      this.currentPage = page
      this.updatePaginatedPeople()
    }
  }
})
</script>
