<template>
  <div class="columns is-gapless is-mobile mb-0 image-informations-wrapper">
    <div class="column is-two-fifths">
      <figure class="image is-square">
        <img :src="pwaIcon" />
      </figure>
    </div>
    <div class="column ml-3">
      <div class="is-flex flex-column main-informations">
        <p>{{ pwa.name }}</p>
        <router-link :to="`/user/${pwa.creatorId}`">
          <p class="has-text-link">{{ pwa.creatorUsername }}</p>
        </router-link>
        <p class="has-text-grey-light">registered on {{ pwaCreatedDate }}</p>
        <PwaDetailsMainInformationsRating />
      </div>
    </div>
  </div>
</template>

<script>
import PwaDetailsMainInformationsRating from '@/components/PwaDetailsMainInformationsRating.vue'
import { formatDateDDMMYYYY } from '../util/dateFormatter.js'
import { pwaIconBucketUrl, defaultPwaIcon } from '../util/imageStorage.js'

export default {
  components: {
    PwaDetailsMainInformationsRating,
  },
  computed: {
    pwa: function() {
      return this.$store.getters.getCurrentPwa
    },
    pwaCreatedDate: function() {
      return formatDateDDMMYYYY(this.pwa.createdDate)
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
.image-informations-wrapper {
  width: 20.5rem;
}
.main-informations {
  justify-content: space-between;
  height: 100%;
}
</style>
