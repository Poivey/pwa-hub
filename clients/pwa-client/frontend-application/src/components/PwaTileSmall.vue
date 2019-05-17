<template>
  <router-link :to="`/pwa/${pwa.id}`">
    <div class="pwa-tile box is-flex flex-column p-2">
      <figure class="image is-square">
        <img :src="pwaIcon" />
      </figure>
      <div class="pwa-name is-size-7 mt-1">{{ pwa.name }}</div>
      <div class="pwa-rating is-flex is-size-7">
        <span>
          {{ pwaRate }}
          <b-icon class="has-text-yellow" icon="star" size="is-small" />
        </span>
        <span>
          {{ pwaReviewCount }}
          <b-icon icon="comment-text" size="is-small" />
        </span>
      </div>
    </div>
  </router-link>
</template>

<script>
import { pwaIconBucketUrl, defaultPwaIcon } from '../util/imageStorage.js'

export default {
  props: {
    pwa: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  computed: {
    pwaRate: function() {
      return (this.pwa.rate && this.pwa.rate.toFixed(1)) || '-'
    },
    pwaReviewCount: function() {
      return this.pwa.reviewCount || 0
    },
    pwaIcon: function() {
      return this.pwa.iconUrl
        ? `${pwaIconBucketUrl}${this.pwa.iconUrl}`
        : require('@/assets/' + defaultPwaIcon)
    },
  },
}
</script>

<style scoped>
.pwa-tile {
  width: 90px;
}
.pwa-name {
  height: 2.3rem;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pwa-rating {
  justify-content: space-between;
}
</style>
