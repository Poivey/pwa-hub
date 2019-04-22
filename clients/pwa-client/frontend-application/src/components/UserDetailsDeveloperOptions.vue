<template>
  <div class="is-flex v-center-content">
    <b-switch v-model="isDeveloperModeEnabled">
      Enable developer mode <b-icon icon="wrench" size="is-small" />
    </b-switch>
    <div v-if="isDeveloperModeEnabled">
      <div class="is-flex v-center-content mt-3">
        <h3 class="title">Developer token</h3>
        <div class="box">ffaa4b9d-cb74-4b01-ab19-b3223aa31077</div>
        <div>
          <a class="button is-link">Generate a new token</a>
          <a class="button is-danger ml-2">Delete this token</a>
        </div>
      </div>
      <div class="is-flex v-center-content mt-3">
        <h3 class="title">Register a new PWA</h3>
        <div class="new-pwa-form">
          <b-field label="PWA name">
            <b-input></b-input>
          </b-field>

          <b-field label="PWA url">
            <b-input></b-input>
          </b-field>

          <b-field label="Category">
            <b-select v-model="category" icon="filter">
              <option selected value="productivity">productivity</option>
              <option value="games">games</option>
              <option value="social">social</option>
            </b-select>
          </b-field>

          <b-field label="PWA description">
            <b-input size="is-small" maxlength="5000" type="textarea"></b-input>
          </b-field>
        </div>
        <a class="button is-link">Register a PWA</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      isDeveloperModeEnabled: false,
    }
  },
}
</script>

<style scoped>
.new-pwa-form {
  width: 100%;
}
</style>
