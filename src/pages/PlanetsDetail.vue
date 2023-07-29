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
                    <b>climate:</b> {{ planetsDetail.climate }}
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

                <q-card-section class="q-py-sm" v-for="(resident, index) in planetsDetail.residentsData" :key="index">
                    <b>Resident</b> {{ index + 1 }}: {{ resident.name }}
                </q-card-section>

                <q-separator inset />

                <q-card-section class="q-py-sm" v-for="(film, index) in planetsDetail.filmsData" :key="index">
                    <b>Film {{ index + 1 }}:</b> {{ film.title }}
                </q-card-section>

                <q-separator inset />
            </q-card>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'PlanetsDetail',
  data () {
    return {
      loading: true
    }
  },

  mounted () {
    const id = this.$route.params.id
    this.fetchPlanetsDetail(id)
  },

  computed: {
    ...mapState(['planetsDetail'])
  },

  methods: {
    fetchPlanetsDetail (id) {
      this.$store.dispatch('getPlanetsDetail', id).then(() => {
        this.loading = false
      })
    }
  }
}
</script>
