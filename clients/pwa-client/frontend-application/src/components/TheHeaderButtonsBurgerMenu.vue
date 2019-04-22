<template>
  <div class="box side-menu-wrapper">
    <div class="is-flex v-center-content">
      <h1 class="title is-1">{{ '\{\{ logo \}\}' }}</h1>
      <TheButtonLogInRegister />
      <TheHeaderButtonsBurgerMenuUserInformations />
      <hr class="divider-small" />
      <b-switch v-model="isDarkThemed">
        Dark mode <b-icon icon="weather-night" size="is-small" />
      </b-switch>
      <hr class="divider-small" />
      <ThePwaInformationsHelpButton />
    </div>
  </div>
</template>

<script>
import TheButtonLogInRegister from '@/components/TheButtonLogInRegister.vue'
import TheHeaderButtonsBurgerMenuUserInformations from '@/components/TheHeaderButtonsBurgerMenuUserInformations.vue'
import ThePwaInformationsHelpButton from '@/components/ThePwaInformationsHelpButton.vue'

export default {
  components: {
    TheButtonLogInRegister,
    TheHeaderButtonsBurgerMenuUserInformations,
    ThePwaInformationsHelpButton,
  },
  computed: {
    isDarkThemed: {
      get() {
        return this.$store.getters.isDarkThemeActive
      },
      set(value) {
        this.$store.dispatch('setDarkThemeStatus', value)
      },
    },
  },
}
</script>

<style scoped>
.side-menu-wrapper {
  height: 100%;
  position: fixed;
  margin-left: -20px;
  max-width: 80%;
}
</style>
