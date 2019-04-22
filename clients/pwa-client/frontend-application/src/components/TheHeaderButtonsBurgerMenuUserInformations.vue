<template>
  <router-link to="/user/cc" tag="div" class="cursor-pointer">
    <div class="is-flex vertical-center">
      <figure class="image is-128x128">
        <img src="https://bulma.io/images/placeholders/480x480.png" />
      </figure>
      <p class="mt-2">Username</p>
      <p class="mt-2 has-text-grey-light">user.name@gmail.com</p>
    </div>
  </router-link>
</template>

<script>
export default {}
</script>

<style scoped>
.vertical-center {
  flex-direction: column;
  align-items: center;
}
</style>