<template>
  <div class="box is-flex v-center-content is-size-7">
    <div class="is-flex review-header">
      <div>
        <router-link :to="`/user/${review.userId}`" tag="div" class="cursor-pointer">
          <div>{{ review.username }}</div>
        </router-link>
        <div class="has-text-grey-light">{{ reviewDate }}</div>
      </div>
      <div class="pl-3">
        <b-icon
          v-for="star in review.rate"
          :key="star"
          class="has-text-yellow is-size-6"
          icon="star"
          size="is-small"
        />
      </div>
    </div>
    <div>{{ review.content }}</div>
  </div>
</template>

<script>
import { formatDateDDMMYYYY } from '../util/dateFormatter.js'

export default {
  props: {
    review: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  computed: {
    reviewDate: function() {
      return formatDateDDMMYYYY(this.review.creationDate)
    },
  },
}
</script>

<style scoped>
.review-header {
  width: 100%;
  justify-content: space-between;
}
</style>
