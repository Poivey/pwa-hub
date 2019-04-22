<template>
  <router-link to="/pwa/cc">
    <div class="pwa-tile box columns is-gapless is-mobile p-2">
      <div class="column is-one-quarter">
        <figure class="pwa-icon image is-square">
          <img src="https://bulma.io/images/placeholders/480x480.png" />
        </figure>
      </div>
      <div class="column ml-2">
        <div class="pwa-info">
          <div class="is-size-7 nowrap">Name of the pwaName of the pwaName of the pwa</div>
          <div class="is-size-7 nowrap has-text-grey-light">creator name.inc</div>
          <div class="is-size-7 nowrap has-text-grey-light">category</div>
          <div class="is-size-7 nowrap">
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
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    // id: {
    //   type: String,
    //   required: true,
    // },
    // name: {
    //   type: String,
    //   required: true,
    // },
    // iconUrl: {
    //   type: String,
    //   required: true,
    // },
    // creatorUsername: {
    //   type: String,
    //   required: false,
    // },
    // rate: {
    //   type: Number,
    //   required: true,
    // },
    // reviewCount: {
    //   type: Number,
    //   required: true,
    // },
    // category: {
    //   type: String,
    //   required: false,
    // },
  },
}
</script>

<style scoped>
.pwa-tile {
  min-width: 300px;
}
.pwa-icon {
  width: 100%;
}
.pwa-info {
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.nowrap {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
