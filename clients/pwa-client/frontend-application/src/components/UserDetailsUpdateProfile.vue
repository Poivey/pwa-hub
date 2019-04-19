<template>
  <div class="is-flex vertical-center">
    <a class="button is-link" @click="openUpdateUserModal()">
      <b-icon icon="account-edit" />
      <span>Edit your profile</span>
    </a>
    <b-modal class="side-menu-modal" :active.sync="isUpdateUserModalEnabled">
      <div class="box">
        <div class="user-update-form mb-3">
          <h3 class="title is-4">
            Update your profile
          </h3>
          <b-field label="Username">
            <b-input></b-input>
          </b-field>
          <b-field label="Email">
            <b-input type="email"></b-input>
          </b-field>
          <b-field label="New profile picture" class="mb-2">
            <b-upload v-model="profilePicture">
              <a class="button is-link">
                <b-icon icon="upload"></b-icon>
                <span>Click to upload</span>
              </a>
            </b-upload>
          </b-field>
          <span v-if="profilePicture"> {{ profilePicture.name }} </span>
        </div>
        <a class="button is-info" @click="closeUpdateUserModal()">
          <b-icon icon="close" />
          <span>Back</span>
        </a>
        <a class="button is-success ml-2">
          <b-icon icon="account-edit" />
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
      isUpdateUserModalEnabled: false,
      profilePicture: undefined,
    }
  },
  methods: {
    openUpdateUserModal: function() {
      this.isUpdateUserModalEnabled = true
    },
    closeUpdateUserModal: function() {
      this.isUpdateUserModalEnabled = false
    },
  },
}
</script>

<style scoped>
.vertical-center {
  flex-direction: column;
  align-items: center;
}
</style>