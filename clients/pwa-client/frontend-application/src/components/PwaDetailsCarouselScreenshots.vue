<template>
  <div class="is-full-width">
    <div class="box p-1 is-flex carousel">
      <img
        v-for="url in screenshots"
        :key="url"
        @click="openImageModal(url)"
        class="carousel-item cursor-pointer"
        :src="url"
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
export default {
  data: function() {
    return {
      screenshots: [
        'https://i.imgur.com/Gh5oEEt.jpg',
        'https://i.imgur.com/RIEnW6x.jpg',
        'https://i.imgur.com/fatpS46.gif',
        'https://i.imgur.com/8j0ZMG8.jpg',
        'https://i.imgur.com/UyEeI0d.jpg',
      ],
      sourceModalImage: '',
      isImageModalActive: false,
    }
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
</style>
