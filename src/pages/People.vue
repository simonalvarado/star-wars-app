<template>
  <div>
    <q-input
        v-model="searchQuery"
        label="Buscar por nombre"
        @keyup="searchPeople"
        filled
        type="search"
    >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
    </q-input>
    <q-card
      class="my-card text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
      v-for="(person, index) in people"
      :key="index"
    >
        <q-card-section>
            <div class="text-h6">{{ person.name }}</div>
            <div class="text-subtitle2">Gender: {{ person.gender}}</div>
        </q-card-section>
    </q-card>

    <q-btn
      @onclick="prevPage"
      :disabled="disabledPrevButton"
      :class="disabledPrevButton ? 'disabled' : ''"
    >
      Prev
    </q-btn>
    <q-btn
      @onclick="nextPage"
    >
      Next
    </q-btn>

  </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PagePeople',
  data () {
    return {
      people: [],
      searchQuery: ''
    }
  },
  mounted () {
    this.$store.dispatch('getPeople').then(() => {
      this.people = this.$store.state.people
    })
  },
  computed: {
    disabledPrevButton () {
      console.log('state', this.$store.state)
      return this.$store.state.previous === null
    }
  },
  methods: {
    searchPeople () {
      if (this.searchQuery === '') {
        this.people = this.$store.state.people
      } else {
        const filteredPeople = this.$store.state.people.filter(person => {
          return person.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        })
        this.people = filteredPeople
        this.currentPage = 1
      }
    },
    prevPage () {},
    nextPage () {
      this.$store.dispatch('getPeople')
    }
  }
})
</script>
<style scoped>
  .disabled {
    cursor: not-allowed;
  }
</style>
