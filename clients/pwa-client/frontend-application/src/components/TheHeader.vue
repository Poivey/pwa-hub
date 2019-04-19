<template>
  <div class="header-wrapper">
    <div>
      <TheHeaderButtonBurger />
    </div>
    <div class="search-bar-wrapper ml-2">
      <TheHeaderSearchBar />
    </div>
  </div>
</template>

<script>
import TheHeaderSearchBar from '@/components/TheHeaderSearchBar.vue'
import TheHeaderButtonBurger from '@/components/TheHeaderButtonBurger.vue'

export default {
  components: {
    TheHeaderButtonBurger,
    TheHeaderSearchBar,
  },
}
</script>

<style scoped>
.header-wrapper {
  display: flex;
}
.search-bar-wrapper {
  flex-grow: 1;
}
</style>
