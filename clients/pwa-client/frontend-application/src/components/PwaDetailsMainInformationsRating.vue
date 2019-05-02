<template>
  <div class="is-flex">
    <p>
      {{ pwaRate }}
      <b-icon class="has-text-yellow" icon="star" size="is-small" />
    </p>
    <p class="ml-3">
      {{ pwaReviewCount }}
      <b-icon icon="comment-text" size="is-small" />
    </p>
  </div>
</template>

<script>
export default {
  computed: {
    pwaRate: function() {
      const pwa = this.$store.getters.getCurrentPwa
      return (pwa.rate && pwa.rate.toFixed(1)) || '-'
    },
    pwaReviewCount: function() {
      return this.$store.getters.getCurrentPwa.reviewCount || 0
    },
  },
}
</script>

<style scoped>
</style>
