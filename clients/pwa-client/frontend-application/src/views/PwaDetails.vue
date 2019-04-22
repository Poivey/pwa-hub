<template>
  <section class="section pt-4">
    <div class="container">
      <div class="columns is-desktop">
        <div class="column is-4-desktop is-flex v-center-content">
          <PwaDetailsMainInformations class="mb-3" />
          <PwaDetailsButtonUrl class="mb-3" />
        </div>
        <div class="column is-flex v-center-content">
          <PwaDetailsCarouselScreenshots class="mb-3" />
          <PwaDetailsDescription class="mb-3" />
          <PwaDetailsReviews />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PwaDetailsButtonUrl from '@/components/PwaDetailsButtonUrl.vue'
import PwaDetailsCarouselScreenshots from '@/components/PwaDetailsCarouselScreenshots.vue'
import PwaDetailsDescription from '@/components/PwaDetailsDescription.vue'
import PwaDetailsMainInformations from '@/components/PwaDetailsMainInformations.vue'
import PwaDetailsReviews from '@/components/PwaDetailsReviews.vue'

export default {
  components: {
    PwaDetailsButtonUrl,
    PwaDetailsCarouselScreenshots,
    PwaDetailsDescription,
    PwaDetailsMainInformations,
    PwaDetailsReviews,
  },
  mounted: function() {
    console.log(`hello, world ! this is pwa details`)
    console.log(`set current pwa to ${this.$route.params.id}`)
  },
}
</script>

<style scoped>
</style>
