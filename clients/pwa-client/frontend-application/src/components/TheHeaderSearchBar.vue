<template>
  <b-field>
    <b-input @input="onSearchInput" placeholder="Search any PWA" type="search" icon="magnify">
    </b-input>
  </b-field>
</template>

<script>
import { debounce } from 'debounce'

export default {
  methods: {
    onSearchInput: debounce(function(input) {
      this.$store.dispatch('setSearchInput', input)
      if (input) {
        this.$router.push('/search')
      }
    }, 500),
  },
}
</script>

<style scoped>
</style>
