<template>
  <div class="columns is-gapless is-mobile mb-0 image-informations-wrapper">
    <div class="column is-two-fifths">
      <figure class="image is-square">
        <img src="https://bulma.io/images/placeholders/480x480.png" />
      </figure>
    </div>
    <div class="column ml-3">
      <div class="is-flex flex-column main-informations">
        <p>Twitter</p>
        <router-link to="/user/cc">
          <p class="has-text-link">creator name.inc</p>
        </router-link>
        <p class="has-text-grey-light">registered on 10/06/2019</p>
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
  justify-content: space-between;
  height: 100%;
}
</style>
