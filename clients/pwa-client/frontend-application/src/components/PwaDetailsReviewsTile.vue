<template>
  <div class="box is-flex v-center-content is-size-7">
    <div class="is-flex review-header">
      <div>
        <router-link to="/user/cc" tag="div" class="cursor-pointer">
          <div>Username</div>
        </router-link>
        <div class="has-text-grey-light">10/06/2019</div>
      </div>
      <div>
        <b-icon
          v-for="star in rating"
          :key="star"
          class="has-text-yellow is-size-6"
          icon="star"
          size="is-small"
        />
      </div>
    </div>
    <div>
      Integer quis molestie quam, a imperdiet purus. Nulla dictum nulla ac sem condimentum aliquet.
      Mauris urna turpis, feugiat ac egestas nec, euismod a lectus. Aenean vitae orci ligula. Nunc
      non aliquam urna, et blandit diam. Nulla pulvinar orci sit amet ex viverra, vel auctor metus
      commodo. Morbi nec velit sed risus vestibulum vehicula ut eu odio. Nulla consequat dui a arcu
      pellentesque, suscipit imperdiet eros sagittis. Sed egestas, nibh efficitur placerat pulvinar,
      orci odio blandit lorem, sed sollicitudin augue nibh ut ipsum. Aliquam in turpis id dolor
      luctus suscipit.
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      rating: Math.floor(Math.random() * Math.floor(5)) + 1,
    }
  },
}
</script>

<style scoped>
.review-header {
  width: 100%;
  justify-content: space-between;
}
</style>
