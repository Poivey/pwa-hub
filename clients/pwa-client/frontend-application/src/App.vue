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
    isDarkThemed: function() {
      return this.$store.getters.isDarkThemeActive
    },
  },
}
</script>

<style lang="scss">
@import './sass/utilityClasses';
@import './sass/customizedTheme';
@import './sass/darkTheme';
@import './sass/spacing';
</style>
