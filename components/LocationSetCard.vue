<template>
  <article class="notification">
    <button class="delete"></button>
    <p class="title">{{ name }}</p>
  </article>
</template>
<script>
export default {
  props: {
    name: { type: String, required: true },
    id: { type: String, required: true }
  },
  computed: {
    locations() {
      return this.$store.getters.locationsBySetId(this.id)
    }
  }
}
</script>
