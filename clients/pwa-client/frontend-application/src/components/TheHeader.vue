<template>
  <div class="is-flex">
    <div>
      <TheHeaderButtons />
    </div>
    <div class="search-bar-wrapper ml-2">
      <TheHeaderSearchBar />
    </div>
  </div>
</template>

<script>
import TheHeaderButtons from '@/components/TheHeaderButtons.vue'
import TheHeaderSearchBar from '@/components/TheHeaderSearchBar.vue'

export default {
  components: {
    TheHeaderButtons,
    TheHeaderSearchBar,
  },
}
</script>

<style scoped>
.search-bar-wrapper {
  flex-grow: 1;
}
</style>
