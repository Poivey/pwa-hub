<template>
  <div>
    <section class="py-3 section has-background-primary">
      <div class="container">
        <TheHeader />
      </div>
    </section>
    <div class="router-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
export default {
  components: {
    TheHeader,
  },
}
</script>

<style scoped>
</style>
