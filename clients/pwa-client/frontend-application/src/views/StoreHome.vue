<template>
  <section class="section pt-4">
    <div class="is-flex tt">
      <router-link to="/user/cc">user</router-link>
      <router-link to="/pwa/cc">pwa</router-link>
      <router-link to="/search">search</router-link>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style scoped>
.tt {
  flex-direction: column;
}
</style>
