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
                    <b>Homeworld:</b> {{ homeworld.name ? homeworld.name : 'Unknown' }}
                </q-card-section>

                <q-separator inset />

                <q-card-section class="q-py-sm" v-for="(film, index) in films" :key="index">
                    <b>Film {{ index + 1 }}:</b> {{ film.title }}
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                    <b>Species:</b> {{ species.name ? species.name : 'Unknown' }}
                </q-card-section>

                <q-separator inset />

                <q-card-section class="q-py-sm" v-for="(vehicle, index) in vehicles" :key="index">
                    <b>Vehicle {{ index + 1 }}:</b> {{ vehicle.name }}
                </q-card-section>

                <q-separator inset />

                <q-card-section class="q-py-sm" v-for="(starship, index) in starships" :key="index">
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
      loading: true,
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
    this.loading = false
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
    }
  },

  methods: {
    async fetchPeopleDetailHomeworld () {
      const response = await axios.get(this.homeworldURL)
      this.homeworld = response.data
    },
    async fetchPeopleDetailFilms () {
      for (let i = 0; i < this.peopleDetail.films.length; i++) {
        const response = await axios.get(this.filmsURL[i])
        this.films.push(response.data)
      }
    },
    async fetchPeopleDetailSpecies () {
      for (let i = 0; i < this.peopleDetail.species.length; i++) {
        const response = await axios.get(this.speciesURL[i])
        this.species = response.data
      }
    },
    async fetchPeopleDetailVehicles () {
      for (let i = 0; i < this.peopleDetail.vehicles.length; i++) {
        const response = await axios.get(this.vehiclesURL[i])
        this.vehicles.push(response.data)
      }
    },
    async fetchPeopleDetailStarships () {
      for (let i = 0; i < this.peopleDetail.starships.length; i++) {
        const response = await axios.get(this.starshipsURL[i])
        this.starships.push(response.data)
      }
    },
    async fetchPeopleDetail (id) {
      await this.$store.dispatch('getPeopleDetail', id)
    }
  }
}
</script>
