<template>
  <div>
    <a class="button is-link is-size-7" @click="openReviewModal()">
      <b-icon icon="comment-text" size="is-small" />
      <span>{{ hasUserAlreadyReviewed ? 'Update your review' : 'Add a new review' }}</span>
    </a>
    <b-modal :active.sync="isReviewModalActive">
      <div class="box is-size-7">
        <h3 class="title is-4">
          {{ hasUserAlreadyReviewed ? 'Update your review' : 'Add a new review' }}
        </h3>
        <b-field label="Rating" class="mb-2">
          <b-select size="is-small" v-model="newReviewRating" placeholder="Rate">
            <option v-for="rate in maxRate" :value="rate" :key="rate">
              {{ rate }}
            </option>
          </b-select>
        </b-field>
        <b-icon
          v-for="star in newReviewRating"
          :key="star"
          class="has-text-yellow is-size-6"
          icon="star"
          size="is-small"
        />
        <b-field label="Message" class="mt-1">
          <b-input
            v-model="newReviewContent"
            placeholder="Write your review here"
            maxlength="500"
            type="textarea"
          ></b-input>
        </b-field>

        <a class="button is-info" @click="closeReviewModal()">
          <b-icon icon="close" />
          <span>Back</span>
        </a>
        <a class="button is-success ml-2">
          <b-icon icon="comment-text" size="is-small" />
          <span>Send your review</span>
        </a>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      isReviewModalActive: false,
      newReviewContent: '',
      newReviewRating: 5,
      maxRate: 5, // TODO map current review from store to an object in data we will use as a v-model
    }
  },
  computed: {
    hasUserAlreadyReviewed: function() {
      return !!this.$store.getters.getLoggedUserReview.userId
    },
  },
  methods: {
    openReviewModal: function() {
      this.isReviewModalActive = true
    },
    closeReviewModal: function() {
      this.isReviewModalActive = false
    },
  },
}
</script>

<style scoped>
</style>
