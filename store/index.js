export const state = () => ({
  locationSets: [],
  locations: []
})

export const getters = {
  locationSets: (state) => state.locationSets,
  locations: (state) => state.locations,
  locationSetById: (state) => (id) =>
    state.locationSets.find((set) => set.id === id)
}

export const mutations = {
  addLocationSet(state, locationSet) {
    state.locationSets.push(locationSet)
  },
  addLocation(state, location) {
    state.locations.push(location)
  },
  removeLocationSet(state, locationSetId) {
    state.locationSets = state.locationSets.filter(
      (set) => set.id !== locationSetId
    )
  },
  removeLocation(state, locationId) {
    state.locations = state.locations.filter((loc) => loc.id !== locationId)
  },
  setLocationSet(state, locationSet) {
    state.locationSets = state.locationSets.map((set) =>
      set.id === locationSet ? locationSet : set
    )
  }
}

export const actions = {
  addLocationToSet({ commit, getters }, { locationSetId, location }) {
    const locationSet = getters.locationSetById(locationSetId)
    commit('setLocationSet', {
      name: locationSet.name,
      id: locationSetId,
      locations: [...locationSet.locations, location]
    })
  },
  createLocationSet({ commit }, { name }) {
    const id =
      String(name)
        .toLowerCase()
        .trim()
        .replace(/ /g, '-') +
      '-' +
      Math.floor(Math.random() * 100000)

    commit('addLocationSet', { id, name, locations: [] })
  },
  createLocation({ commit }, location) {
    commit('addLocation', location)
  },
  async addFakeLocation({ commit }) {
    const location = await this.$axios.$get('/api/fake-location')
    commit('addLocation', location)
  },
  deleteLocationSet({ commit }, { locationSetId }) {
    commit('removeLocationSet', locationSetId)
  },
  deleteLocation({ commit }, { locationId }) {
    commit('removeLocation', locationId)
  }
}
