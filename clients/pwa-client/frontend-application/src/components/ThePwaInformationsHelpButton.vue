<template>
  <div>
    <a class="button is-link" @click="openHelpModal()">
      <b-icon icon="lifebuoy" />
      <span>Help / What's a PWA ?</span>
    </a>
    <b-modal :active.sync="isHelpModalActive">
      <div class="box">
        <b-tabs type="is-toggle" position="is-centered">
          <b-tab-item label="I'm a user" icon="account">
            <div class="mb-4">
              <h5 class="title is-5">What's a PWA ?</h5>
              <p>
                PWAs (Progressive Web Apps) are websites that are using the latest web technologies,
                and that can be added to your device and be used as you would use a native
                application. Once on your device, a PWA act as any other applications. They are
                light, do not require installation, update themselves and are the same on every
                device you own. You can also try a PWA by simply going to its website before adding
                it to your device.
              </p>
            </div>
            <div class="mb-4">
              <h5 class="title is-5">Why should I use a PWA ?</h5>
              <p class="mb-2">
                Currently, the majority of applications could instead be PWAs. This means that most
                of the time you could replace an application you use with the PWA if its creator has
                developed one.
              </p>
              <p>
                This way you would have lighter applications on your device, that doesn't require
                installations, are always up to date and would be the same on every device you own!
              </p>
            </div>
            <div>
              <h5 class="title is-5">What's this "Balloon" store ?</h5>
              <p class="mb-2">
                Balloon is designed to register existing PWAs, it is similar to classic native app
                stores such as Google Play, Apple App Store or Windows Store, but it applies this
                concept to PWAs. This way Ballon provides to you an easy way to search, discover and
                review PWAs.
              </p>
              <p>
                One of the main strenght of Balloon is that it is itself a PWA, so you can use
                Chrome of any compatible web browser to add Balloon to your smarphone or PC ! By
                being PWA, you can enjoy Ballon store on every device, no matter which is its native
                Application store of if it is powered by Android, iOS, Windows, Linux or any other
                operating system.
              </p>
            </div>
          </b-tab-item>
          <b-tab-item label="I'm a developer" icon="robot">
            <div class="mb-4">
              <h5 class="title is-5">Why is this store awesome ?</h5>
              <p>
                Balloon is PWA. This means it gives you the possibility to deploy and update
                informations about your PWAs on a single store instead of having to do that on the
                many existing proprietary stores. Balloon also provide an easy to use API that can
                be called during your deployments to update your PWA informations.
              </p>
            </div>
            <div>
              <h5 class="title is-5">How can I register my PWA ?</h5>
              <p>
                You can use our API or do it directly from here. See your profile page to register a
                new PWA!
              </p>
            </div>
          </b-tab-item>
        </b-tabs>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      isHelpModalActive: false,
    }
  },
  methods: {
    openHelpModal: function() {
      this.isHelpModalActive = true
    },
    closeHelpModal: function() {
      this.isHelpModalActive = false
    },
  },
}
</script>

<style scoped>
</style>
