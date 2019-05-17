<template>
  <div class="is-full-width">
    <div class="box p-1 is-flex carousel">
      <div class="is-flex is-full-width no-screenshot-message" v-if="!screenshots.length">
        <p>This pwa has no screenshots 🙃</p>
      </div>
      <img
        v-for="screenshot in screenshots"
        :key="screenshot"
        @click="openImageModal(screenshot)"
        class="carousel-item cursor-pointer"
        :src="screenshot"
      />
    </div>
    <b-modal :active.sync="isImageModalActive">
      <div class="modal-image-wrapper is-flex mx-3">
        <figure class="image">
          <img :src="sourceModalImage" />
        </figure>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { screenshotBucketUrl } from '../util/imageStorage.js'

export default {
  data: function() {
    return {
      sourceModalImage: '',
      isImageModalActive: false,
    }
  },
  computed: {
    screenshots: function() {
      return (this.$store.getters.getCurrentPwa.screenshots || []).map(
        key => `${screenshotBucketUrl}${key}`
      )
    },
  },
  methods: {
    openImageModal: function(sourceModalImage) {
      this.sourceModalImage = sourceModalImage
      this.isImageModalActive = true
    },
  },
}
</script>

<style scoped>
.carousel {
  width: 100%;
  overflow: auto;
  height: 300px;
}
.carousel-item {
  height: 100%;
}
.carousel-item + .carousel-item {
  margin-left: 0.25rem;
}
.modal-image-wrapper {
  justify-content: center;
}
.no-screenshot-message {
  align-items: center;
  justify-content: center;
}
</style>
