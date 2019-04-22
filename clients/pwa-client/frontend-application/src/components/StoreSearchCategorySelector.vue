<template>
  <div class="is-flex">
    <div>Category :</div>
    <b-field class="ml-2">
      <b-select v-model="category" size="is-small" icon="filter">
        <option value="all">all categories</option>
        <option value="productivity">productivity</option>
        <option value="games">games</option>
        <option value="social">social</option>
      </b-select>
    </b-field>
  </div>
</template>

<script>
// icon : filter
export default {
  data() {
    return {
      category: 'all', //TODO will be computed, usage of vuex store to know current category
    }
  },
}
</script>

<style scoped>
</style>
