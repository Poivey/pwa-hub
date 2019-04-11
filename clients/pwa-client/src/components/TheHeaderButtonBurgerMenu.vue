<template>
  <div class="box side-menu-wrapper">
    <div class="is-flex side-menu">
      <h1 class="title is-1">{{ '\{\{ logo \}\}' }}</h1>
      <figure class="image is-128x128">
        <img src="https://bulma.io/images/placeholders/480x480.png" />
      </figure>
      <p class="mt-2">Username</p>
      <p class="mt-2 has-text-grey-light">user.name@gmail.com</p>
      <hr class="divider-small" />
      <b-switch v-model="isDarkThemed" class="mt-2">
        Dark mode <b-icon icon="weather-night" size="is-small" />
      </b-switch>
    </div>
  </div>
</template>

<script>
export default {
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
.side-menu {
  flex-direction: column;
  align-items: center;
}
.divider-small {
  width: 10rem;
  margin-left: auto;
  margin-right: auto;
}
</style>
