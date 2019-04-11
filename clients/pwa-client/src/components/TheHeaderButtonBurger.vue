<template>
  <div>
    <a class="button button-burger-menu is-primary is-inverted is-outlined" @click="openSideMenu()">
      <b-icon icon="menu" />
    </a>
    <b-modal
      class="side-menu-modal"
      :active.sync="isSideMenuActive"
      :canCancel="['escape', 'outside']"
    >
      <TheHeaderButtonBurgerMenu />
    </b-modal>
  </div>
</template>

<script>
import TheHeaderButtonBurgerMenu from '@/components/TheHeaderButtonBurgerMenu.vue'

export default {
  components: {
    TheHeaderButtonBurgerMenu,
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
