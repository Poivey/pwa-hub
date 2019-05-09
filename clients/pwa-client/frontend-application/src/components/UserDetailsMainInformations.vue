<template>
  <div class="is-flex v-center-content">
    <div class="mb-3">
      <figure class="image profile-picture">
        <img src="https://bulma.io/images/placeholders/480x480.png" />
      </figure>
    </div>
    <h3 class="title">{{ user.username }}</h3>
    <h5 class="subtitle has-text-grey-light">Joined on {{ userAccountCreationDate }}</h5>
  </div>
</template>

<script>
import { formatDateDDMMYYYY } from '../util/dateFormatter.js'

export default {
  computed: {
    user: function() {
      return this.$store.getters.getCurrentUser
    },
    userAccountCreationDate: function() {
      return formatDateDDMMYYYY(this.user.accountCreationDate)
    },
  },
}
</script>

<style scoped>
.profile-picture {
  width: 256px;
}
</style>
