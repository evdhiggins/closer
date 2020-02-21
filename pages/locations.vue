<template>
  <section class="container">
    <h1 class="title">Locations</h1>
    <div class="columns is-multiline">
      <location-media
        v-for="location in locations"
        :key="`loc${location.id}`"
        class="column is-12"
        :location="location"
      />
      <div class="column is-12">
        <b-button
          outlined
          rounded
          inverted
          expanded
          type="is-primary"
          size="is-medium"
          icon-left="plus"
          @click="createLocation"
          >Add location</b-button
        >
      </div>
    </div>
  </section>
</template>

<script>
import LocationMedia from '~/components/LocationMedia'

export default {
  name: 'LocationsPage',
  components: {
    LocationMedia
  },
  computed: {
    locations() {
      return this.$store.getters.locations
    }
  },
  methods: {
    createLocation() {
      this.$store.dispatch('addFakeLocation')
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
