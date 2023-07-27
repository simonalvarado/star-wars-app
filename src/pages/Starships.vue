<template>
    <div>
        <q-card
            class="my-card"
            v-for="starship in starships"
            :key="starship.url"
        >
            <q-card-section>
                <div class="text-h6">{{ starship.name }}</div>
                <div class="text-subtitle2">Model: {{ starship.model }}</div>
            </q-card-section>
        </q-card>

        <div class="q-pa-lg flex flex-center">
            <q-pagination
                v-if="starshipsPageInfo"
                v-model="currentPage"
                :min="1"
                :max="starshipsPageInfo.totalPages"
                @input="changePage"
            />
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'Starships',
  data () {
    return {
      starships: [],
      allStarships: [],
      searchQuery: '',
      starshipsPageInfo: null
    }
  },
  updated () {
    this.starships = this.filteredStarships
  },
  mounted () {
    this.$store.dispatch('getStarships').then(() => {
      this.starships = this.$store.state.starships
      this.starshipsPageInfo = this.$store.state.starshipsPageInfo
    })
    this.getAllStarshipsData()
  },
  computed: {
    disabledPrevButton () {
      return this.$store.state.previous === null
    },
    disabledNextButton () {
      return this.$store.state.f === null
    },
    filteredStarships () {
      return this.allStarships.filter((starship) => {
        return starship.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      })
    }
  },
  methods: {
    getAllStarshipsData () {
      axios.get('https://swapi.dev/api/starships/')
        .then((response) => {
          this.allStarships = response.data.results
        })
    },
    nextPage () {
      axios.get(this.$store.state.next)
        .then((response) => {
          this.$store.commit('setPeople', response.data.results)
          this.$store.commit('setNext', response.data.next)
          this.$store.commit('setPrevious', response.data.previous)
        })
    },
    prevPage () {
      axios.get(this.$store.state.previous)
        .then((response) => {
          this.$store.commit('setPeople', response.data.results)
          this.$store.commit('setNext', response.data.next)
          this.$store.commit('setPrevious', response.data.previous)
        })
    },
    changePage (pageNumber) {
    // Fetch the data for the selected page from the API
      axios.get(`https://swapi.dev/api/starships/?page=${pageNumber}`)
        .then((response) => {
        // Update the component's data with the new starships data and pagination info
          this.starships = response.data.results
          this.starshipsPageInfo = {
            currentPage: pageNumber,
            totalPages: Math.ceil(response.data.count / response.data.results.length)
          }
        })
        .catch((error) => {
          console.error('Error fetching starships data:', error)
        })
    }
  }
}
</script>
