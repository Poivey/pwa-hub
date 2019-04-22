<template>
  <div class="is-flex v-center-content">
    <a class="button is-warning" @click="openPwaPictureModal()">
      <b-icon icon="image-plus" />
      <span>Edit icon and screenshots</span>
    </a>
    <b-modal class="side-menu-modal" :active.sync="isPwaPictureModalOpen">
      <div class="box">
        <div class="mb-3">
          <h3 class="title is-4">
            Edit "pwaname" icon and screenshots
          </h3>

          <b-field label="New pwa icon" class="mb-2">
            <b-upload v-model="pwaPicture">
              <a class="button is-link">
                <b-icon icon="upload"></b-icon>
                <span>Click to upload</span>
              </a>
            </b-upload>
          </b-field>
          <span v-if="pwaPicture"> {{ pwaPicture.name }} </span>

          <b-field label="Add a screenshot" class="mb-2">
            <b-upload v-model="newScreenshot">
              <a class="button is-link">
                <b-icon icon="upload"></b-icon>
                <span>Click to upload</span>
              </a>
            </b-upload>
          </b-field>
          <span v-if="newScreenshot"> {{ newScreenshot.name }} </span>

          <p class="bold mb-2">Select screenshot to remove (if any)</p>
          <b-checkbox
            v-for="screenshot in screenshots"
            :key="screenshot"
            v-model="deletedScreenshots"
            :native-value="screenshot"
          >
            <img class="screenshot-square" :src="screenshot" />
          </b-checkbox>
        </div>
        <a class="button is-info" @click="closePwaPictureModal()">
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
      isPwaPictureModalOpen: false,
      pwaPicture: undefined,
      newScreenshot: undefined,
      screenshots: [
        'https://i.imgur.com/Gh5oEEt.jpg',
        'https://i.imgur.com/RIEnW6x.jpg',
        'https://i.imgur.com/fatpS46.gif',
        'https://i.imgur.com/8j0ZMG8.jpg',
        'https://i.imgur.com/UyEeI0d.jpg',
      ],
      deletedScreenshots: [],
    }
  },
  methods: {
    openPwaPictureModal: function() {
      this.isPwaPictureModalOpen = true
    },
    closePwaPictureModal: function() {
      this.isPwaPictureModalOpen = false
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