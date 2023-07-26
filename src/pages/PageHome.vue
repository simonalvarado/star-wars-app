<template>
  <q-page class="flex flex-center">
    <div class="button-container">
      <q-btn @click="goToPeople" label="People" color="primary" class="q-mb-md" />
      <q-btn @click="goToPlanets" label="Planets" color="primary" class="q-mb-md" />
      <q-btn @click="goToShips" label="Ships" color="primary" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
// import store from '../store'

export default defineComponent({
  name: 'PageIndex',
  methods: {
    goToPeople () {
      this.$router.push('/people')
    },
    goToPlanets () {
      this.$router.push('/planets')
    },
    goToShips () {
      this.$router.push('/starships')
    }
  }
})
</script>
<style>
/* Add any custom styles here */
.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
