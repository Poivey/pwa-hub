<template>
  <div class="is-flex">
    <div>Category :</div>
    <b-field class="ml-2">
      <b-select v-model="category" size="is-small" icon="filter">
        <option value="">All categories</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </b-select>
    </b-field>
  </div>
</template>

<script>
import categories from '../util/categories.js'

export default {
  data() {
    return {
      categories: categories,
    }
  },
  computed: {
    category: {
      get() {
        return this.$store.getters.getSearchCategory
      },
      set(category) {
        this.$store.dispatch('setSearchCategory', category)
      },
    },
  },
}
</script>

<style scoped>
</style>
