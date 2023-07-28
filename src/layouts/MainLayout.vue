<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-btn @click="$router.go(-1)" v-if="showBackButton" flat dense icon="fas fa-arrow-left" class="absolute" size="sm" />

        <q-toolbar-title class="text-center">
          Star Wars App
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-page-container>
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
