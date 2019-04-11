<template>
  <div class="columns is-gapless is-mobile mb-0 image-informations-wrapper">
    <div class="column is-two-fifths">
      <figure class="image is-square">
        <img src="https://bulma.io/images/placeholders/480x480.png" />
      </figure>
    </div>
    <div class="column ml-3">
      <div class="is-flex main-informations">
        <p>Twitter</p>
        <p class="has-text-grey-light">creator name.inc</p>
        <p class="has-text-grey-light">version 1.0.3</p>
        <PwaDetailsMainInformationsRating />
      </div>
    </div>
  </div>
</template>

<script>
import PwaDetailsMainInformationsRating from '@/components/PwaDetailsMainInformationsRating.vue'
export default {
  components: {
    PwaDetailsMainInformationsRating,
  },
}
</script>

<style scoped>
.image-informations-wrapper {
  width: 20.5rem;
}
.main-informations {
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
</style>
