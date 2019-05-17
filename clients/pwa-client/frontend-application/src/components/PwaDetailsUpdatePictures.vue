<template>
  <div class="is-flex v-center-content">
    <a class="button is-warning" @click="openPwaPictureModal()">
      <b-icon icon="image-plus" />
      <span>Edit icon and screenshots</span>
    </a>
    <b-modal :active.sync="isPwaPictureModalOpen">
      <div class="box">
        <div class="mb-3">
          <h3 class="title is-4">Edit {{ pwa.name }} icon and screenshots</h3>

          <b-field label="New pwa icon" class="mb-2">
            <b-upload @input="uploadIcon" :disabled="isUploadingIcon" accept="image/*">
              <a class="button is-link" :disabled="isUploadingIcon">
                <b-icon icon="upload"></b-icon>
                <span>Click to upload</span>
              </a>
            </b-upload>
          </b-field>

          <b-field label="Add a screenshot" class="mb-2">
            <b-upload @input="uploadScreenshot" :disabled="isUploadingScreenshot" accept="image/*">
              <a class="button is-link" :disabled="isUploadingScreenshot">
                <b-icon icon="upload"></b-icon>
                <span>Click to upload</span>
              </a>
            </b-upload>
          </b-field>

          <p class="bold mb-2">Select screenshot to remove (if any)</p>
          <div>
            <b-checkbox
              v-for="(screenshot, index) in screenshots"
              :key="screenshot"
              v-model="selectedScreenshots"
              :native-value="index"
            >
              <img class="screenshot-square" :src="screenshot" />
            </b-checkbox>
          </div>
          <a
            class="button is-danger mt-2"
            :disabled="isDeletingScreenshots"
            @click="deleteScreenshots()"
          >
            <b-icon icon="delete" />
            <span>Delete selected screenshot(s)</span>
          </a>
        </div>
        <a class="button is-info" @click="closePwaPictureModal()">
          <b-icon icon="arrow-left" />
          <span>Close</span>
        </a>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import { uploadPwaIcon, uploadPwaScreenshot, screenshotBucketUrl } from '../util/imageStorage.js'

export default {
  data: function() {
    return {
      isPwaPictureModalOpen: false,
      isUploadingIcon: false,
      isUploadingScreenshot: false,
      isDeletingScreenshots: false,
      selectedScreenshots: [],
    }
  },
  computed: {
    screenshots: function() {
      return (this.$store.getters.getCurrentPwa.screenshots || []).map(
        key => `${screenshotBucketUrl}${key}`
      )
    },
    pwa: function() {
      return this.$store.getters.getCurrentPwa
    },
    loggedUserDevToken: function() {
      return this.$store.getters.getLoggedUserDevToken
    },
  },
  methods: {
    openPwaPictureModal: function() {
      this.isPwaPictureModalOpen = true
    },
    closePwaPictureModal: function() {
      this.isPwaPictureModalOpen = false
    },
    deleteScreenshots: function() {
      if (
        this.selectedScreenshots &&
        this.selectedScreenshots.length &&
        !this.isDeletingScreenshots
      ) {
        this.$toast.open({
          message: `🕗 Deleting screenshots...`,
          position: 'is-bottom',
          type: 'is-link',
        })
        this.isDeletingScreenshots = true
        axios
          .delete(`${process.env.VUE_APP_BACKEND_URL}/pwa/${this.pwa.id}/screenshots`, {
            headers: { devtoken: this.loggedUserDevToken },
            params: { screenshotsIndexes: this.selectedScreenshots.join(',') },
          })
          .then(() => {
            this.$store.dispatch('deleteCurrentPwaScreenshots', [...this.selectedScreenshots])
            this.$toast.open({
              message: `Selected screenshots deleted`,
              position: 'is-bottom',
              type: 'is-success',
            })
          })
          .catch(error => {
            console.log(error)
            this.$toast.open({
              message: `An error occurred, please try again later`,
              position: 'is-bottom',
              type: 'is-danger',
            })
          })
          .finally(() => {
            this.selectedScreenshots = []
            this.isDeletingScreenshots = false
          })
      }
    },
    uploadIcon: function(file) {
      if (file.size > 2 * 1024 * 1024) {
        this.$toast.open({
          message: `Please select file < 2 Mo`,
          position: 'is-bottom',
          type: 'is-warning',
        })
        return
      }
      this.$toast.open({
        message: `🕗 Updating ${file.name}...`,
        position: 'is-bottom',
        type: 'is-link',
      })
      this.isUploadingIcon = true
      uploadPwaIcon(file, this.pwa.id, this.loggedUserDevToken)
        .then(response => {
          this.$store.dispatch('updateCurrentPwaIcon', response.Key)
          this.$toast.open({
            message: `${this.pwa.name} icon has been updated`,
            position: 'is-bottom',
            type: 'is-success',
          })
        })
        .catch(error => {
          this.$toast.open({
            message: `An error occurred, please try again later`,
            position: 'is-bottom',
            type: 'is-danger',
          })
        })
        .finally(() => (this.isUploadingIcon = false))
    },
    uploadScreenshot: function(file) {
      if (this.screenshots.length >= 10) {
        this.$toast.open({
          message: `A PWA can have 10 screenshots maximum`,
          position: 'is-bottom',
          type: 'is-warning',
        })
        return
      }
      if (file.size > 2 * 1024 * 1024) {
        this.$toast.open({
          message: `Please select file < 2 Mo`,
          position: 'is-bottom',
          type: 'is-warning',
        })
        return
      }
      this.$toast.open({
        message: `🕗 Updating ${file.name}...`,
        position: 'is-bottom',
        type: 'is-link',
      })
      this.isUploadingScreenshot = true
      uploadPwaScreenshot(file, this.pwa.id, this.loggedUserDevToken)
        .then(response => {
          this.$store.dispatch('addCurrentScreenshot', response.Key)
          this.$toast.open({
            message: `Screenshot ${this.pwa.name} has been updated`,
            position: 'is-bottom',
            type: 'is-success',
          })
        })
        .catch(error => {
          this.$toast.open({
            message: `An error occurred, please try again later`,
            position: 'is-bottom',
            type: 'is-danger',
          })
        })
        .finally(() => (this.isUploadingScreenshot = false))
    },
  },
}
</script>

<style scoped>
.bold {
  font-weight: 600;
}
.screenshot-square {
  object-fit: cover;
  width: 128px;
  height: 128px;
}
</style>