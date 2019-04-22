<template>
  <div class="is-flex">
    <div>
      <a
        class="button button-burger-menu is-primary is-inverted is-outlined"
        @click="openSideMenu()"
      >
        <b-icon icon="menu" />
      </a>
    </div>
    <div>
      <router-link to="/">
        <a class="button button-burger-menu is-primary is-inverted is-outlined">
          <b-icon icon="home" />
        </a>
      </router-link>
    </div>

    <b-modal
      class="side-menu-modal"
      :active.sync="isSideMenuActive"
      :canCancel="['escape', 'outside']"
    >
      <TheHeaderButtonsBurgerMenu />
    </b-modal>
  </div>
</template>

<script>
import TheHeaderButtonsBurgerMenu from '@/components/TheHeaderButtonsBurgerMenu.vue'

export default {
  components: {
    TheHeaderButtonsBurgerMenu,
  },
  data: function() {
    return {
      isSideMenuActive: false,
    }
  },
  methods: {
    openSideMenu: function() {
      this.isSideMenuActive = true
    },
  },
}
</script>

<style scoped>
.button-burger-menu {
  border-width: 0;
}
.side-menu-modal {
  justify-content: start;
  align-items: start;
}
</style>
