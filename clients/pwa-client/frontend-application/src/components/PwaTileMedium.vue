<template>
  <router-link :to="`/pwa/${pwa.id}`">
    <div class="pwa-tile box columns is-gapless is-mobile p-2">
      <div class="column is-one-quarter">
        <figure class="pwa-icon image is-square">
          <img :src="pwaIcon" />
        </figure>
      </div>
      <div class="column ml-2">
        <div class="is-flex flex-column pwa-info">
          <div class="is-size-7 nowrap">{{ pwa.name }}</div>
          <div class="is-size-7 nowrap has-text-grey-light">{{ pwa.creatorUsername }}</div>
          <div class="is-size-7 nowrap has-text-grey-light capitalize">{{ pwa.category }}</div>
          <div class="is-size-7 nowrap">
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
  min-width: 300px;
}
.pwa-icon {
  width: 100%;
}
.pwa-info {
  width: 200px;
  height: 100%;
  justify-content: space-between;
}
.nowrap {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.capitalize {
  text-transform: capitalize;
}
</style>
