export const state = () => ({
  locationSets: []
})

export const getters = {
  locationSets: (state) => state.locationSets,
  locationSetById: (state) => (id) =>
    state.locationSets.find((set) => set.id === id)
}

export const mutations = {
  addLocationSet(state, locationSet) {
    state.locationSets.push(locationSet)
  },
  removeLocationSet(state, locationSetId) {
    state.locationSets = state.locationSets.filter(
      (set) => set.id !== locationSetId
    )
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
  deleteLocationSet({ commit }, { locationSetId }) {
    commit('removeLocationSet', locationSetId)
  }
}
