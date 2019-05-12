<template>
  <section class="section pt-4">
    <div class="container">
      <div class="columns is-desktop">
        <div class="column is-4-desktop is-flex v-center-content">
          <PwaDetailsMainInformations class="mb-3" />
          <PwaDetailsButtonUrl />
          <div v-if="isCreatorLoggedAndDeveloper" class="mt-3">
            <PwaDetailsUpdateInformations class="mb-3" />
            <PwaDetailsUpdatePictures />
          </div>
        </div>
        <div class="column is-flex v-center-content">
          <PwaDetailsCarouselScreenshots class="mb-3" />
          <PwaDetailsDescription class="mb-3" />
          <PwaDetailsReviews />
        </div>
      </div>
    </div>
    <b-loading :active.sync="isLoading"></b-loading>
  </section>
</template>

<script>
import PwaDetailsButtonUrl from '@/components/PwaDetailsButtonUrl.vue'
import PwaDetailsCarouselScreenshots from '@/components/PwaDetailsCarouselScreenshots.vue'
import PwaDetailsDescription from '@/components/PwaDetailsDescription.vue'
import PwaDetailsMainInformations from '@/components/PwaDetailsMainInformations.vue'
import PwaDetailsReviews from '@/components/PwaDetailsReviews.vue'
import PwaDetailsUpdateInformations from '@/components/PwaDetailsUpdateInformations.vue'
import PwaDetailsUpdatePictures from '@/components/PwaDetailsUpdatePictures.vue'

export default {
  components: {
    PwaDetailsButtonUrl,
    PwaDetailsCarouselScreenshots,
    PwaDetailsDescription,
    PwaDetailsMainInformations,
    PwaDetailsReviews,
    PwaDetailsUpdateInformations,
    PwaDetailsUpdatePictures,
  },
  computed: {
    currentPwa: function() {
      return this.$store.getters.getCurrentPwa
    },
    isCreatorLoggedAndDeveloper: function() {
      const loggedUser = this.$store.getters.getLoggedUser
      const loggedUserDevToken = this.$store.getters.getLoggedUserDevToken
      return !!(
        loggedUser &&
        loggedUserDevToken &&
        this.currentPwa &&
        loggedUser.id &&
        this.currentPwa.creatorId &&
        loggedUser.id === this.currentPwa.creatorId
      )
    },
    isLoading: function() {
      const routePwaId = this.$route.params.id
      return routePwaId !== this.currentPwa.id
    },
  },
  methods: {
    loadPwaDetails: function() {
      const pwaId = this.$route.params.id
      this.$store.dispatch('loadPwa', pwaId)
      this.$store.dispatch('loadPwaReviews', pwaId)
      this.$store.dispatch('loadLoggedUserPwaReview', { currentPwaId: pwaId })
    },
  },
  mounted: function() {
    this.loadPwaDetails()
  },
}
</script>

<style scoped>
</style>
