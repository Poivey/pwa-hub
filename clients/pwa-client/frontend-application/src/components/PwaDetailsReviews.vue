<template>
  <div>
    <h5 class="title is-5 mb-3">Reviews</h5>
    <PwaDetailsReviewsNew class="mb-3" />
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
import PwaDetailsReviewsNew from '@/components/PwaDetailsReviewsNew.vue'
import PwaDetailsReviewsTile from '@/components/PwaDetailsReviewsTile.vue'

export default {
  components: {
    PwaDetailsReviewsNew,
    PwaDetailsReviewsTile,
  },
}
</script>

<style scoped>
</style>
