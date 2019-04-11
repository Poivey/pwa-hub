<template>
  <div>
    <h5 class="title is-5 mb-3">Reviews</h5>
    <div class="columns is-multiline">
      <div class="column is-6">
        <PwaDetailsReviewsTile />
      </div>
      <div class="column is-6">
        <PwaDetailsReviewsTile />
      </div>
      <div class="column is-6">
        <PwaDetailsReviewsTile />
      </div>
      <div class="column is-6">
        <PwaDetailsReviewsTile />
      </div>
      <div class="column is-6">
        <PwaDetailsReviewsTile />
      </div>
      <div class="column is-6">
        <PwaDetailsReviewsTile />
      </div>
    </div>
  </div>
</template>

<script>
import PwaDetailsReviewsTile from '@/components/PwaDetailsReviewsTile.vue'
export default {
  components: {
    PwaDetailsReviewsTile,
  },
}
</script>

<style scoped>
</style>
