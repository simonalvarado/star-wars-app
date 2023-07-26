<template>
    <div>
        <q-card
            class="my-card"
            v-for="planet in planets"
            :key="planet.url"
        >
            <q-card-section>
                <div class="text-h6">{{ planet.name }}</div>
                <div class="text-subtitle2">Climate: {{ planet.climate }}</div>
            </q-card-section>
        </q-card>

        <div class="q-pa-lg flex flex-center">
            <q-pagination
              v-if="planetsPageInfo"
              v-model="currentPage"
              :min="1"
              :max="totalPages"
              @input="changePage"
            />
        </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Planets',
  data () {
    return {
      currentPage: 1,
      itemsPerPage: 5
    }
  },
  computed: {
    planets () {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.$store.state.planets.slice(start, end)
    },
    totalPages () {
      return Math.ceil(
        this.$store.state.planetsPageInfo.count / this.itemsPerPage
      )
    },
    planetsPageInfo () {
      return this.$store.state.planetsPageInfo
    }
  },
  created () {
    this.$store.dispatch('getPlanets')
  },
  methods: {
    changePage (page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
      }
    }
  }
})
</script>
