<template>
  <div class="card userProfile">
    <div class="card-content">
      <div class="columns is-mobile is-multiline">

        <div class="column">
          <figure class="image is-64x64">
            <img
              class="is-rounded" 
              :src="avatarUrl"
            >
          </figure>
        </div>

        <div class="column">
          <p>{{ nickname }}</p>
          <span>{{ gradeGivenCount }}</span>
          <b-icon
            icon="star-outline"
            size="is-small"
          />
          <span> {{ commentCount }}</span>
          <b-icon
            icon="comment-text-multiple-outline"
            size="is-small"
          />
        </div>

        <div class="column is-full">
          <p class="has-text-centered">{{ email }}</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserProfileOverview",

  props: {
    avatarUrl: {
      type: String,
      required: true
    },
    nickname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    commentCount: {
      type: Number,
      required: true
    },
    gradeGivenCount: {
      type: Number,
      required: true
    }
  }
};
</script>

<style>
.userProfile {
  width: 250px;
}
</style>
