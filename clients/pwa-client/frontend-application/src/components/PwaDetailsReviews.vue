<template>
  <div class="is-full-width">
    <h5 class="title is-5 mb-3">Reviews</h5>
    <div class="is-flex v-center-content">
      <PwaDetailsReviewsNew v-if="isUserLoggedIn" class="mb-3" />
      <TheButtonLogInRegister v-else class="mb-3" />
      <div class="columns is-multiline">
        <div v-if="!reviews.length" class="column">
          <div class="box is-flex v-center-content is-size-7">
            <div>This PWA has no review yet</div>
          </div>
        </div>
        <div v-for="review in reviews" :key="review.userId" class="column is-half review">
          <PwaDetailsReviewsTile :review="review" />
        </div>
      </div>
      <a v-if="hasMoreReview" class="button is-link is-size-7" @click="loadMoreReviews()">
        <b-icon :icon="'plus'" size="is-small" />
        <span>Load more reviews</span>
      </a>
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
      const loggeduser = this.$store.getters.getLoggedUser
      return !!(loggeduser && loggeduser.id)
    },
    hasMoreReview: function() {
      return !!this.$store.getters.getLastReviewKey
    },
  },
  methods: {
    loadMoreReviews() {
      this.$store.dispatch('loadMorePwaReviews')
    },
  },
}
</script>

<style scoped>
.review {
  min-width: 252px;
}
</style>
