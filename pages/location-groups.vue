<template>
  <section class="container">
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
    <div class="columns is-centered location-set-container">
      <div
        class="column is-full-mobile is-three-quarters-tablet is-two-thirds-desktop"
      >
        <location-set-card
          v-for="set in locationSets"
          :id="set.id"
          :key="`ls${set.id}`"
          :name="set.name"
        />
      </div>
    </div>
    <!-- <pre>{{ locationSets }}</pre> -->
  </section>
</template>

<script>
import LocationSetCard from '~/components/LocationSetCard'

export default {
  name: 'LocationSetsPage',
  components: {
    LocationSetCard
  },
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
<style scoped>
.location-set-container {
  margin-top: 2rem;
}
</style>
