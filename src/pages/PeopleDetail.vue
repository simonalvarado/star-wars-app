<template>
    <div>
        <div v-if="loading" class="loading-container">
            <q-spinner-dots size="60px" color="black" />
        </div>
        <div v-else>
            <q-card flat bordered class="my-card text-center q-mb-md">
                <q-card-section>
                    <div class="text-h4"> {{ peopleDetail.name }} </div>
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                    <b>Height:</b> {{ peopleDetail.height }}
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                    <b>Mass:</b> {{ peopleDetail.mass }}
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                    <b>Hair color:</b> {{ peopleDetail.hair_color }}
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                    <b>Skin color:</b> {{ peopleDetail.skin_color }}
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                    <b>Eye color:</b> {{ peopleDetail.eye_color }}
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                    <b>Birth year:</b> {{ peopleDetail.birth_year }}
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                    <b>Gender:</b> {{ peopleDetail.gender }}
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                    <b>Homeworld:</b> {{ homeworldText }}
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                    <b>Species:</b> {{ speciesText }}
                </q-card-section>

                <q-separator inset />

                <q-card-section v-if="isLoadingFilms">
                    Loading...
                </q-card-section>
                <q-card-section v-else class="q-py-sm" v-for="(film, index) in films" :key="index">
                    <b>Film {{ index + 1 }}:</b> {{ film.title }}
                </q-card-section>

                <q-separator inset />

                <q-card-section v-if="isLoadingVehicles">
                    Loading...
                </q-card-section>
                <q-card-section v-else class="q-py-sm" v-for="(vehicle, index) in vehicles" :key="index">
                    <b>Vehicle {{ index + 1 }}:</b> {{ vehicle.name }}
                </q-card-section>

                <q-separator inset />

                <q-card-section v-if="isLoadingStarships">
                    Loading...
                </q-card-section>
                <q-card-section v-else class="q-py-sm" v-for="(starship, index) in starships" :key="index">
                    <b>Starship {{ index + 1 }}:</b> {{ starship.name }}
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'PeopleDetail',
  data () {
    return {
      loading: false,
      isLoadingHomeworld: false,
      isLoadingFilms: false,
      isLoadingSpecies: false,
      isLoadingVehicles: false,
      isLoadingStarships: false,
      homeworld: null,
      films: [],
      species: [],
      vehicles: [],
      starships: []
    }
  },

  async mounted () {
    const id = this.$route.params.id
    await this.fetchPeopleDetail(id)
    await this.fetchPeopleDetailHomeworld()
    await this.fetchPeopleDetailFilms()
    await this.fetchPeopleDetailSpecies()
    await this.fetchPeopleDetailVehicles()
    await this.fetchPeopleDetailStarships()
  },

  computed: {
    peopleDetail () {
      return this.$store.state?.peopleDetail
    },
    homeworldURL () {
      return this.peopleDetail.homeworld.length ? this.peopleDetail.homeworld : null
    },
    filmsURL () {
      return this.peopleDetail.films.length ? this.peopleDetail.films : null
    },
    speciesURL () {
      return this.peopleDetail.species.length ? this.peopleDetail.species : null
    },
    vehiclesURL () {
      return this.peopleDetail.vehicles.length ? this.peopleDetail.vehicles : null
    },
    starshipsURL () {
      return this.peopleDetail.starships.length ? this.peopleDetail.starships : null
    },
    homeworldText () {
      return this.isLoadingHomeworld ? 'Loading...' : this.homeworld?.name ? this.homeworld.name : 'Unknown'
    },
    speciesText () {
      return this.isLoadingSpecies ? 'Loading...' : this.species?.name ? this.species.name : 'Unknown'
    }
  },

  methods: {
    async fetchPeopleDetail (id) {
      this.loading = true
      await this.$store.dispatch('getPeopleDetail', id)
      this.loading = false
    },
    async fetchPeopleDetailHomeworld () {
      this.isLoadingHomeworld = true
      const response = await axios.get(this.homeworldURL)
      this.homeworld = response.data
      this.isLoadingHomeworld = false
    },
    async fetchPeopleDetailFilms () {
      for (let i = 0; i < this.peopleDetail.films.length; i++) {
        this.isLoadingFilms = true
        const response = await axios.get(this.filmsURL[i])
        this.isLoadingFilms = false
        this.films.push(response.data)
      }
    },
    async fetchPeopleDetailSpecies () {
      for (let i = 0; i < this.peopleDetail.species.length; i++) {
        this.isLoadingSpecies = true
        const response = await axios.get(this.speciesURL[i])
        this.species = response.data
        this.isLoadingSpecies = false
      }
    },
    async fetchPeopleDetailVehicles () {
      for (let i = 0; i < this.peopleDetail.vehicles.length; i++) {
        this.isLoadingVehicles = true
        const response = await axios.get(this.vehiclesURL[i])
        this.isLoadingVehicles = false
        this.vehicles.push(response.data)
      }
    },
    async fetchPeopleDetailStarships () {
      for (let i = 0; i < this.peopleDetail.starships.length; i++) {
        this.isLoadingStarships = true
        const response = await axios.get(this.starshipsURL[i])
        this.isLoadingStarships = false
        this.starships.push(response.data)
      }
    }
  }
}
</script>
