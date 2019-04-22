<template>
  <router-link to="/pwa/cc">
    <div class="pwa-tile box is-flex flex-column p-2">
      <figure class="image is-square">
        <img src="https://bulma.io/images/placeholders/480x480.png" />
      </figure>
      <div class="pwa-name is-size-7">Name of the pwaName of the pwaName of the pwa</div>
      <div class="pwa-rating is-flex is-size-7">
        <span>
          4.7
          <b-icon class="has-text-yellow" icon="star" size="is-small" />
        </span>
        <span>
          110
          <b-icon icon="comment-text" size="is-small" />
        </span>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {}
</script>

<style scoped>
.pwa-tile {
  max-width: 90px;
}
.pwa-name {
  height: 2.3rem;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pwa-rating {
  justify-content: space-between;
}
</style>
