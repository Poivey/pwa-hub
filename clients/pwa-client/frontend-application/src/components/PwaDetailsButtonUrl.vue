<template>
  <div>
    <a class="button is-link is-rounded" :href="pwaUrl" target="_blank">
      <b-icon icon="open-in-new" />
      <span class="ml-1">{{ pwaUrl }}</span>
    </a>
  </div>
</template>

<script>
export default {
  computed: {
    pwaUrl: function() {
      return this.$store.getters.getCurrentPwa.url
    },
  },
}
</script>

<style scoped>
</style>
