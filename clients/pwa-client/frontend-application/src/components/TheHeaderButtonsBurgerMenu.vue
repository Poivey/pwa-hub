<template>
  <div class="box side-menu-wrapper">
    <div class="is-flex v-center-content">
      <div class="is-full-width mb-2">
        <img src="../assets/logo_rect.svg" alt="Balloon" />
      </div>
      <div class="is-flex v-center-content" v-if="isUserLoggedIn">
        <TheHeaderButtonsBurgerMenuUserInformations />
        <TheButtonLogOut class="mt-3" />
      </div>
      <TheButtonLogInRegister v-else />
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
import TheButtonLogOut from '@/components/TheButtonLogOut.vue'
import TheHeaderButtonsBurgerMenuUserInformations from '@/components/TheHeaderButtonsBurgerMenuUserInformations.vue'
import ThePwaInformationsHelpButton from '@/components/ThePwaInformationsHelpButton.vue'

export default {
  components: {
    TheButtonLogInRegister,
    TheButtonLogOut,
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
    isUserLoggedIn: function() {
      const loggeduser = this.$store.getters.getLoggedUser
      return !!(loggeduser && loggeduser.id)
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
