<template>
    <div>
        <div v-if="loading" class="loading-container">
            <q-spinner-dots size="60px" color="black" />
        </div>
        <div v-else>
            <q-card flat bordered class="my-card text-center q-mb-md">
                <q-card-section>
                    <div class="text-h4"> {{ planetsDetail.name }} </div>
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                    <b>Rotation period:</b> {{ planetsDetail.rotation_period }}
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                    <b>Orbital period:</b> {{ planetsDetail.orbital_period }}
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                    <b>Diameter:</b> {{ planetsDetail.diameter }}
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                    <b>Climate:</b> {{ planetsDetail.climate }}
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                    <b>Gravity:</b> {{ planetsDetail.gravity }}
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                    <b>Terrain:</b> {{ planetsDetail.terrain }}
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                    <b>Surface water:</b> {{ planetsDetail.surface_water }}
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                    <b>Population:</b> {{ planetsDetail.population }}
                </q-card-section>

                <q-separator inset />

                <q-card-section class="q-py-sm" v-for="(resident, index) in residents" :key="index">
                    <router-link :to="{ name: 'PeopleDetail', params: { id: transform(resident.url) } }">
                        <b>Resident {{ index + 1 }}:</b> {{ resident.name }}
                    </router-link>
                </q-card-section>

                <q-separator inset />

                <q-card-section class="q-py-sm" v-for="(film, index) in films" :key="index">
                    <b>Film {{ index + 1 }}:</b> {{ film.title }}
                </q-card-section>

            </q-card>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import transform from '../utils/transform.js'

export default {
  name: 'PlanetsDetail',
  data () {
    return {
      loading: true,
      residents: [],
      films: [],
      transform
    }
  },

  async mounted () {
    const id = this.$route.params.id
    await this.fetchPlanetsDetail(id)
    await this.fetchPlanetsDetailResidents()
    await this.fetchPlanetsDetailFilms()
    this.loading = false
  },

  computed: {
    planetsDetail () {
      return this.$store.state?.planetsDetail
    },
    residentsURL () {
      return this.planetsDetail.residents.length ? this.planetsDetail.residents : null
    },
    filmsURL () {
      return this.planetsDetail.films.length ? this.planetsDetail.films : null
    }
  },

  methods: {
    async fetchPlanetsDetailResidents () {
      for (let i = 0; i < this.planetsDetail.residents.length; i++) {
        const response = await axios.get(this.residentsURL[i])
        this.residents.push(response.data)
      }
    },
    async fetchPlanetsDetailFilms () {
      for (let i = 0; i < this.planetsDetail.films.length; i++) {
        const response = await axios.get(this.filmsURL[i])
        this.films.push(response.data)
      }
    },
    async fetchPlanetsDetail (id) {
      await this.$store.dispatch('getPlanetsDetail', id)
    }
  }
}
</script>
<style lang="sass" scoped>
a:-webkit-any-link
  text-decoration: none
  color: #000000
</style>
