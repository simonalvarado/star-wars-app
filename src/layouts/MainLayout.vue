<template dark>
  <q-layout dark view="lHh Lpr lFf">
    <q-header elevated class="star-wars-header">
      <q-toolbar>

        <q-btn @click="$router.go(-1)" v-if="showBackButton" flat dense icon="fas fa-arrow-left" class="absolute" size="sm" />

        <q-toolbar-title class="text-center">
          Star Wars App
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-page-container class="star-wars-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, watch, ref } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'MainLayout',

  components: {
  },

  setup () {
    const route = useRoute()
    const showBackButton = ref(false)
    console.log('route path', route.path)
    watch(
      () => route.path,
      (newPath) => {
        showBackButton.value = newPath !== '/'
      }
    )
    return {
      showBackButton
    }
  }
})
</script>
<style lang="sass" scoped>
.star-wars-header
  background-color: #272727
  color: #f4f4f4

.star-wars-container
  background-color: #f4f4f4
  min-height: 100vh
</style>
