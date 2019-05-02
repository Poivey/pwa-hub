<template>
  <div class="isFullWidth">
    <h5 class="title is-5 mb-2">Description</h5>
    <div class="is-flex v-center-content is-size-7-mobile">
      <div :class="{ smallDescription: !isFullDescription }">
        {{ pwaDescription }}
      </div>
      <a class="button is-link is-size-7 mt-2" @click="toggleDescriptionSize()">
        <b-icon :icon="isFullDescription ? 'minus' : 'plus'" size="is-small" />
        <span>{{ isFullDescription ? 'See less' : 'See more' }}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      isFullDescription: false,
    }
  },
  computed: {
    pwaDescription: function() {
      return this.$store.getters.getCurrentPwa.description
    },
  },
  methods: {
    toggleDescriptionSize: function() {
      this.isFullDescription = !this.isFullDescription
    },
  },
}
</script>

<style scoped>
.smallDescription {
  max-height: 3.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
