<template>
  <div id="app" :class="{ 'dark-theme': isDarkThemed }">
    <the-main />
  </div>
</template>

<script>
import TheMain from './views/TheMain.vue'
export default {
  components: {
    TheMain,
  },
  computed: {
    isDarkThemed() {
      return this.$store.getters.isDarkThemeActive
    },
  },
}
// TODO use store
// ie. https://github.com/vuejs/vuex/tree/dev/examples/shopping-cart/store (+ usage of /api)
</script>

<style lang="scss">
@import './sass/customizedTheme';
@import './sass/darkTheme';
@import './sass/spacing';
</style>
