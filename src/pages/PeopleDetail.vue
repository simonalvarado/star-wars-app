<template>
    <div>
        <q-card flat bordered class="my-card text-center">
            <q-card-section>
                <div class="text-h6"> {{ peopleDetail.name }} </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                Height: {{ peopleDetail.height }}
            </q-card-section>

            <q-separator inset />

            <q-card-section>
                Mass: {{ peopleDetail.mass }}
            </q-card-section>

            <q-separator inset />

            <q-card-section>
                Hair color: {{ peopleDetail.hair_color }}
            </q-card-section>

            <q-separator inset />

            <q-card-section>
                Skin color: {{ peopleDetail.skin_color }}
            </q-card-section>

            <q-separator inset />

            <q-card-section>
                Eye color: {{ peopleDetail.eye_color }}
            </q-card-section>

            <q-separator inset />

            <q-card-section>
                Birth year: {{ peopleDetail.birth_year }}
            </q-card-section>

            <q-separator inset />

            <q-card-section>
                Gender: {{ peopleDetail.gender }}
            </q-card-section>

            <q-separator inset />

            <q-card-section>
                Homeworld: {{ peopleDetail.homeworldData.name }}
            </q-card-section>

            <q-separator inset />

            <q-card-section class="q-py-sm" v-for="(film, index) in peopleDetail.filmsData" :key="index">
                Film {{ index + 1 }}: {{ film.title }}
            </q-card-section>

            <q-separator inset />

            <q-card-section>
                Species: {{ peopleDetail.speciesData.name }}
            </q-card-section>

            <q-separator inset />

            <q-card-section class="q-py-sm" v-for="(vehicle, index) in peopleDetail.vehiclesData" :key="index">
                Vehicle {{ index + 1 }}: {{ vehicle.name }}
            </q-card-section>

            <q-separator inset />

            <q-card-section class="q-py-sm" v-for="(starship, index) in peopleDetail.starshipsData" :key="index">
                Starship {{ index + 1 }}: {{ starship.name }}
            </q-card-section>
        </q-card>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'PeopleDetail',

  mounted () {
    const id = this.$route.params.id
    this.fetchPeopleDetail(id)
  },

  computed: {
    ...mapState(['peopleDetail'])
  },

  methods: {
    fetchPeopleDetail (id) {
      this.$store.dispatch('getPeopleDetail', id)
    }
  }
}
</script>
