<template>
  <div class="isFullWidth">
    <h5 class="title is-5 mb-3">Reviews</h5>
    <PwaDetailsReviewsNew v-if="isUserLoggedIn" class="mb-3" />
    <TheButtonLogInRegister v-else class="mb-3" />
    <div class="columns is-multiline">
      <div v-if="!reviews.length" class="column is-6">
        <div class="box is-flex v-center-content is-size-7">
          <div>This PWA has no review yet</div>
        </div>
      </div>
      <div v-for="review in reviews" :key="review.userId" class="column is-6">
        <PwaDetailsReviewsTile :review="review" />
      </div>
    </div>
  </div>
</template>

<script>
import PwaDetailsReviewsNew from '@/components/PwaDetailsReviewsNew.vue'
import PwaDetailsReviewsTile from '@/components/PwaDetailsReviewsTile.vue'
import TheButtonLogInRegister from '@/components/TheButtonLogInRegister.vue'

export default {
  components: {
    PwaDetailsReviewsNew,
    PwaDetailsReviewsTile,
    TheButtonLogInRegister,
  },
  computed: {
    reviews: function() {
      return this.$store.getters.getPwaReview
    },
    isUserLoggedIn: function() {
      return !!this.$store.getters.getLoggedUser.id
    },
  },
}
</script>

<style scoped>
</style>
