<template>
  <section class="section">
    <h1 class="title">Location sets</h1>
    <b-button
      type="is-primary"
      rounded
      outlined
      inverted
      size="is-medium"
      icon-left="plus"
      @click="createLocationSet"
    >
      New
    </b-button>
    <div class="columns">
      <div
        v-for="set in locationSets"
        :key="`ls${set.id}`"
        class="column is-4 card"
      >
        <header class="card-header">
          <div class="card-header-title">{{ set.name }}</div>
        </header>
        <div class="card-content">
          The location set's description
        </div>
        <footer class="card-footer">
          <n-link class="card-footer-item" :to="`/location-sets/${set.id}`"
            >Edit</n-link
          >
          <a
            class="card-footer-item"
            @click="deleteLocationSet(set.id, set.name)"
            >Delete</a
          >
        </footer>
      </div>
    </div>
    <!-- <pre>{{ locationSets }}</pre> -->
  </section>
</template>

<script>
export default {
  name: 'LocationSetsPage',
  computed: {
    locationSets() {
      return this.$store.getters.locationSets
    }
  },
  methods: {
    createLocationSet() {
      this.$buefy.dialog.prompt({
        message: 'Location set name?',
        inputAttrs: {
          placeholder: 'My location set'
        },
        trapFocus: true,
        onConfirm: (name) => this.$store.dispatch('createLocationSet', { name })
      })
    },
    deleteLocationSet(id, name) {
      this.$buefy.dialog.confirm({
        message: `Delete "${name}"?`,
        onConfirm: () =>
          this.$store.dispatch('deleteLocationSet', { locationSetId: id })
      })
    }
  }
}
</script>
