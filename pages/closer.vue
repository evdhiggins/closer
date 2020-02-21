<template>
  <section class="container">
    <h1 class="title">Closer</h1>
    <b-field expanded>
      <b-select v-model="locationGroup" inverted placeholder="Group">
        <option value="all">All</option>
      </b-select>
      <b-input v-model="origin" expanded placeholder="Origin..."></b-input>
      <p class="control">
        <b-button type="is-primary" inverted outlined @click="getCloser"
          >Get closer</b-button
        >
      </p>
    </b-field>
    <br />
    <div v-if="location">
      <h2 class="subtitle">Results</h2>
      <location-media :location="location" />
      <location-media
        v-for="(loc, i) in closestLocations"
        :key="`cl${loc.id}`"
        :location="{ ...loc, name: `${i + 1}. ${loc.name}: ${loc.distance}KM` }"
      />
    </div>
  </section>
</template>
<script>
import LocationMedia from '~/components/LocationMedia'

export default {
  name: 'CloserPage',
  components: {
    LocationMedia
  },
  data() {
    return {
      locationGroup: 'all',
      origin: '',
      location: null
    }
  },
  computed: {
    locations() {
      return this.$store.getters.locations
    },
    closestLocations() {
      if (!this.location) {
        return []
      }
      const preparedLocations = this.locations.map((loc) => {
        const newLocation = { ...loc }
        newLocation.distance = this.getDistance(loc.lat, loc.lng)
        return newLocation
      })
      return preparedLocations.sort((a, b) => a.distance - b.distance)
    }
  },
  methods: {
    async getCloser() {
      this.location = await this.$axios.$get('/api/fake-location')
      this.location.name = 'Origin'
    },
    /** Source: https://www.movable-type.co.uk/scripts/latlong.html */
    getDistance(lat, lng) {
      const R = 6371e3 // metres
      const φ1 = this.toRadians(lat)
      const φ2 = this.toRadians(this.location.lat)
      const Δφ = this.toRadians(this.location.lat) - this.toRadians(lat)
      const Δλ = this.toRadians(this.location.lng) - this.toRadians(lng)

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

      const d = R * c
      return Math.round(d / 10) / 100
    },
    toRadians(val) {
      const pi = Math.PI
      return Number(val) * (pi / 180)
    }
  }
}
</script>
