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
      const creationDate = new Date(this.review.creationDate)
      const day = ('0' + creationDate.getDate()).slice(-2)
      const month = ('0' + (Number(creationDate.getMonth()) + 1)).slice(-2)
      const year = creationDate.getFullYear()
      return `${day}/${month}/${year}`
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
