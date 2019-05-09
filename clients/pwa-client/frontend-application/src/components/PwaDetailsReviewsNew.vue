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
        <a class="button is-success ml-2" :disabled="isDisabled" @click="sendNewReview()">
          <b-icon icon="comment-text" size="is-small" />
          <span>Send your review</span>
        </a>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: function() {
    return {
      isReviewModalActive: false,
      newReviewContent: '',
      newReviewRating: 5,
      maxRate: 5,
      minRate: 1,
    }
  },
  computed: {
    loggedUserReview: function() {
      return this.$store.getters.getLoggedUserReview
    },
    currentPwaId: function() {
      return this.$store.getters.getCurrentPwa.id
    },
    loggedUserId: function() {
      return this.$store.getters.getLoggedUser.id
    },
    hasUserAlreadyReviewed: function() {
      console.log(this.loggedUserReview)
      return !!(this.loggedUserReview.content || this.loggedUserReview.rate)
    },
    isDisabled: function() {
      return (
        !this.newReviewContent ||
        this.newReviewRating < this.minRate ||
        this.newReviewRating > this.maxRate
      )
    },
  },
  methods: {
    openReviewModal: function() {
      this.newReviewContent = this.loggedUserReview.content || ''
      this.newReviewRating = this.loggedUserReview.rate || 5
      this.isReviewModalActive = true
    },
    closeReviewModal: function() {
      this.isReviewModalActive = false
    },
    sendNewReview: function() {
      if (!this.isDisabled && this.currentPwaId && this.loggedUserId) {
        const url = `${process.env.VUE_APP_BACKEND_URL}/pwa/${this.currentPwaId}/reviews`
        const body = {
          userId: this.loggedUserId,
          content: this.newReviewContent,
          rate: this.newReviewRating,
        }
        if (this.hasUserAlreadyReviewed) {
          axios
            .put(url, body)
            .then(this.onNewReviewSuccess)
            .catch(this.onNewReviewFailure)
        } else {
          axios
            .post(url, body)
            .then(this.onNewReviewSuccess)
            .catch(this.onNewReviewFailure)
        }
      }
    },
    onNewReviewSuccess: function() {
      this.$store.dispatch('updateLoggedUserPwaReview', {
        content: this.newReviewContent,
        rate: this.newReviewRating,
      })
      this.$toast.open({
        message: 'Your review has been updated',
        position: 'is-bottom',
        type: 'is-success',
      })
      this.closeReviewModal()
    },
    onNewReviewFailure: function(error) {
      console.log(error)
      this.$toast.open({
        duration: 5000,
        message:
          'Your review could not be updated, please restart your application or try again later',
        position: 'is-bottom',
        type: 'is-danger',
      })
    },
  },
}
</script>

<style scoped>
</style>
