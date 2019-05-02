<template>
  <div class="is-flex v-center-content">
    <a class="button is-warning" @click="openUpdatePwaModal()">
      <b-icon icon="pencil" />
      <span>Edit this PWA</span>
    </a>
    <b-modal :active.sync="isUpdatePwaModalOpen">
      <div class="box">
        <div class="mb-3">
          <h3 class="title is-4">
            Edit "pwaname" informations
          </h3>

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
        <a class="button is-info" @click="closeUpdateUserModal()">
          <b-icon icon="close" />
          <span>Back</span>
        </a>
        <a class="button is-success ml-2">
          <b-icon icon="pencil" />
          <span>Validate these changes</span>
        </a>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      isUpdatePwaModalOpen: false,
      category: 'productivity',
    }
  },
  methods: {
    openUpdatePwaModal: function() {
      this.isUpdatePwaModalOpen = true
    },
    closeUpdatePwaModal: function() {
      this.isUpdatePwaModalOpen = false
    },
  },
}
</script>

<style scoped>
</style>