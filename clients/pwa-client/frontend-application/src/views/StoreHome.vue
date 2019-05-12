<template>
  <section class="section pt-4">
    <div class="container is-flex v-center-content">
      <div class="logo mb-2">
        <img src="../assets/logo_rect.svg" alt="Balloon" />
      </div>
      <div class="results is-flex is-full-width" id="pwa-container">
        <PwaTileMedium v-for="pwa in pwaTiles" :key="pwa.id" :pwa="pwa" class="mb-2 mx-1" />
        <PwaCarousel
          v-for="(pwaList, index) in pwaCarousels"
          :key="index"
          :pwaList="pwaList"
          class="mb-2 mx-1"
        />
      </div>
    </div>
  </section>
</template>

<script>
import PwaTileMedium from '@/components/PwaTileMedium'
import PwaCarousel from '@/components/PwaCarousel'

// StoreHome component is temporary
// No "home" with featured pwa has been built, this one mocks it
// The current solution manage the displaying of carousels is unclean
export default {
  components: {
    PwaTileMedium,
    PwaCarousel,
  },
  data() {
    return {
      pwaContainerWidth: 0,
    }
  },
  computed: {
    homePwaList: function() {
      return this.$store.getters.getHomePwaList
    },
    isOneColumn: function() {
      return this.pwaContainerWidth < 616
    },
    pwaTiles: function() {
      if (!this.isOneColumn) {
        return this.homePwaList
      }
      return [...this.homePwaList].splice(0, 2)
    },
    pwaCarousels: function() {
      if (!this.isOneColumn) {
        return []
      }
      const carousels = []
      const pwaList = [...this.homePwaList]
      pwaList.splice(0, 2)
      while (pwaList.length) {
        carousels.push(pwaList.splice(0, 6))
      }
      return carousels
    },
  },
  methods: {
    setPwaContainerWidth() {
      this.pwaContainerWidth = document.getElementById('pwa-container').clientWidth
    },
  },
  mounted() {
    this.$store.dispatch('loadHomePwaList')
    window.addEventListener('resize', this.setPwaContainerWidth)
    this.setPwaContainerWidth()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setPwaContainerWidth)
  },
}
</script>

<style scoped>
.logo {
  width: 300px;
}
.results {
  justify-content: space-evenly;
  flex-wrap: wrap;
}
</style>
