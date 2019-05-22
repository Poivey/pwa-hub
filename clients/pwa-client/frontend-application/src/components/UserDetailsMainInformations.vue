<template>
  <div class="is-flex v-center-content">
    <div class="mb-3">
      <img class="profile-picture" :src="userPicture" />
    </div>
    <h3 class="title">{{ user.username }}</h3>
    <h5 class="subtitle has-text-grey-light">Joined on {{ userAccountCreationDate }}</h5>
  </div>
</template>

<script>
import { formatDateDDMMYYYY } from '../util/dateFormatter.js'
import { pictureBucketUrl, defaultUserPictureUrl } from '../util/imageStorage.js'

export default {
  computed: {
    user: function() {
      return this.$store.getters.getCurrentUser
    },
    userAccountCreationDate: function() {
      return formatDateDDMMYYYY(this.user.accountCreationDate)
    },
    userPicture: function() {
      return this.user.profilePictureUrl
        ? `${pictureBucketUrl}${this.user.profilePictureUrl}`
        : `${defaultUserPictureUrl}${this.user.id}`
    },
  },
}
</script>

<style scoped>
.profile-picture {
  object-fit: cover;
  object-position: 50% 50%;
  width: 200px;
  height: 200px;
}
</style>
