<template>
  <router-link :to="`/user/${loggedUser.id}`" tag="div" class="cursor-pointer">
    <div class="is-flex v-center-content">
      <img class="profile-picture" :src="userPicture" />
      <p class="mt-2">{{ loggedUser.username }}</p>
      <p class="mt-2 has-text-grey-light">{{ loggedUser.email }}</p>
    </div>
  </router-link>
</template>

<script>
import { pictureBucketUrl, defaultUserPictureUrl } from '../util/imageStorage.js'

export default {
  computed: {
    loggedUser: function() {
      return this.$store.getters.getLoggedUser
    },
    userPicture: function() {
      return this.loggedUser.profilePictureUrl
        ? `${pictureBucketUrl}${this.loggedUser.profilePictureUrl}`
        : `${defaultUserPictureUrl}${this.loggedUser.id}`
    },
  },
}
</script>

<style scoped>
.profile-picture {
  object-fit: cover;
  object-position: 50% 50%;
  width: 128px;
  height: 128px;
}
</style>