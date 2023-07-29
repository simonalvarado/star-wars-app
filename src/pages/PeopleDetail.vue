<template>
    <div>
        <!-- <div v-if="loading" class="loading-container">
            <q-spinner-dots size="60px" color="black" />
        </div> -->
        <!-- <div v-else> -->
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

                <!-- <q-card-section>
                    <b>Homeworld:</b> {{ peopleDetail.homeworldData.name }}
                </q-card-section>

                <q-separator inset />

                <q-card-section class="q-py-sm" v-for="(film, index) in peopleDetail.filmsData" :key="index">
                    <b>Film {{ index + 1 }}:</b> {{ film.title }}
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                    <b>Species:</b> {{ peopleDetail.speciesData.name }}
                </q-card-section>

                <q-separator inset />

                <q-card-section class="q-py-sm" v-for="(vehicle, index) in peopleDetail.vehiclesData" :key="index">
                    <b>Vehicle</b> {{ index + 1 }}: {{ vehicle.name }}
                </q-card-section>

                <q-separator inset />

                <q-card-section class="q-py-sm" v-for="(starship, index) in peopleDetail.starshipsData" :key="index">
                    <b>Starship {{ index + 1 }}:</b> {{ starship.name }}
                </q-card-section> -->
            </q-card>
        <!-- </div> -->
    </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'PeopleDetail',
  data () {
    return {
      loading: true,
      films: {}
    }
  },

  mounted () {
    const id = this.$route.params.id
    // this.fetchPeopleDetail(id)
    this.$store.dispatch('getPeopleDetail', id)
    console.log('people detail', this.peopleDetail)
    console.log('people detail', this.fetchPeopleDetailFilms())
  },

  computed: {
    peopleDetail () {
      return this.$store.state?.peopleDetail
    }
  },

  methods: {
    async fetchPeopleDetailFilms () {
      for (let i = 0; i < this.peopleDetail.films.length; i++) {
        const response = await axios.get(this.peopleDetail.films[i])
        this.films.push(response.data)
      }
    }
    // fetchPeopleDetail (id) {
    //   this.$store.dispatch('getPeopleDetail', id)
    // }
  }
}
</script>
