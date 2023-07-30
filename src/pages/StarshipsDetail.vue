<template>
    <div>
        <div v-if="loading" class="loading-container">
            <q-spinner-dots size="60px" color="black" />
        </div>
        <div v-else>
            <q-card flat bordered class="my-card text-center q-mb-md">
                <q-card-section>
                    <div class="text-h4"> {{ starshipsDetail.name }} </div>
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                    <b>Model:</b> {{ starshipsDetail.model }}
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                    <b>Manufacturer:</b> {{ starshipsDetail.manufacturer }}
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                    <b>Cost in credits:</b> {{ starshipsDetail.cost_in_credits }}
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                    <b>Length:</b> {{ starshipsDetail.length }}
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                    <b>Max atmosphering speed:</b> {{ starshipsDetail.max_atmosphering_speed }}
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                    <b>Passengers:</b> {{ starshipsDetail.passengers }}
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                    <b>Cargo capacity:</b> {{ starshipsDetail.cargo_capacity }}
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                    <b>Consumables:</b> {{ starshipsDetail.consumables }}
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                    <b>Hyperdrive rating:</b> {{ starshipsDetail.hyperdrive_rating }}
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                    <b>MGLT:</b> {{ starshipsDetail.MGLT }}
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                    <b>Starship class:</b> {{ starshipsDetail.starship_class }}
                </q-card-section>

                <q-separator inset />

                <q-card-section v-if="isLoadingPilots">
                    Loading...
                </q-card-section>
                <q-card-section class="q-py-sm" v-for="(pilot, index) in pilots" :key="index">
                    <b>Resident {{ index + 1 }}:</b> {{ pilot.name }}
                </q-card-section>

                <q-separator inset />

                <q-card-section v-if="isLoadingFilms">
                    Loading...
                </q-card-section>
                <q-card-section v-else class="q-py-sm" v-for="(film, index) in films" :key="index">
                    <b>Film {{ index + 1 }}:</b> {{ film.title }}
                </q-card-section>

            </q-card>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'StarshipsDetail',
  data () {
    return {
      loading: false,
      isLoadingPilots: false,
      isLoadingFilms: false,
      pilots: [],
      films: []
    }
  },

  async mounted () {
    const id = this.$route.params.id
    await this.fetchStarshipsDetail(id)
    await this.fetchStarshipsDetailResidents()
    await this.fetchStarshipsDetailFilms()
    this.loading = false
  },

  computed: {
    starshipsDetail () {
      return this.$store.state?.starshipsDetail
    },
    pilotsURL () {
      return this.starshipsDetail.pilots.length ? this.starshipsDetail.pilots : null
    },
    filmsURL () {
      return this.starshipsDetail.films.length ? this.starshipsDetail.films : null
    }
  },

  methods: {
    async fetchStarshipsDetail (id) {
      this.loading = true
      await this.$store.dispatch('getStarshipsDetail', id)
      this.loading = false
    },
    async fetchStarshipsDetailResidents () {
      for (let i = 0; i < this.starshipsDetail.pilots.length; i++) {
        this.isLoadingPilots = true
        const response = await axios.get(this.pilotsURL[i])
        this.isLoadingPilots = false
        this.pilots.push(response.data)
      }
    },
    async fetchStarshipsDetailFilms () {
      for (let i = 0; i < this.starshipsDetail.films.length; i++) {
        this.isLoadingFilms = true
        const response = await axios.get(this.filmsURL[i])
        this.isLoadingFilms = false
        this.films.push(response.data)
      }
    }
  }
}
</script>
