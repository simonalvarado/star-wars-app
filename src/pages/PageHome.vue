<template>
  <q-page class="flex flex-center justify-center items-center star-wars-page">
    <div class="button-container column">
      <q-btn @click="goToPeople" label="People" class="q-mb-md star-wars-btn" />
      <q-btn @click="goToPlanets" label="Planets" class="q-mb-md star-wars-btn" />
      <q-btn @click="goToStarships" label="Starships" class="star-wars-btn" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageIndex',
  methods: {
    goToPeople () {
      this.$router.push('/people')
    },
    goToPlanets () {
      this.$router.push('/planets')
    },
    goToStarships () {
      this.$router.push('/starships')
    }
  }
})
</script>
<style lang="sass">
.star-wars-page
  background-color: #272727
  color: #f4f4f4
.star-wars-btn
  background-color: #ffe81f
  color: #272727
  font-weight: bold
  text-transform: uppercase
  @media (min-width: 768px)
    font-size: 20px
    padding: 10px 30px
</style>
