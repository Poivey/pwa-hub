<template>
  <div class="is-flex main-informations-wrapper">
    <div class="mb-3">
      <figure class="image profile-picture">
        <img src="https://bulma.io/images/placeholders/480x480.png" />
      </figure>
    </div>
    <div>
      <div>
        <h3 class="title">Alphabet .inc</h3>
        <h5 class="subtitle has-text-grey-light">Joined on 29/05/2019</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.main-informations-wrapper {
  flex-direction: column;
  align-items: center;
}
.profile-picture {
  width: 256px;
}
</style>
