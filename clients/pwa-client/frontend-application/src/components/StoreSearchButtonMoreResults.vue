<template>
  <a class="button is-link is-size-7" @click="loadMoreResults()">
    <b-icon :icon="'plus'" size="is-small" />
    <span>Load more results</span>
  </a>
</template>

<script>
export default {
  methods: {
    loadMoreResults: function() {
      this.$store.dispatch('getMoreResults')
    },
  },
}
</script>

<style scoped>
</style>
