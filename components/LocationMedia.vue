<template>
  <div class="box">
    <article class="media">
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{ name }}</strong> <small>{{ lat }}</small> |
            <small>{{ lng }}</small>
            <br />
            {{ address }}
          </p>
        </div>
        <!-- <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item">
            <span class="icon is-small"><i class="fas fa-reply"></i></span>
          </a>
          <a class="level-item">
            <span class="icon is-small"><i class="fas fa-retweet"></i></span>
          </a>
          <a class="level-item">
            <span class="icon is-small"><i class="fas fa-heart"></i></span>
          </a>
        </div>
      </nav> -->
      </div>
      <div class="media-right">
        <button class="delete" @click="deleteLocation"></button>
      </div>
    </article>
  </div>
</template>
<script>
export default {
  props: {
    location: { type: Object, required: true }
  },
  computed: {
    id() {
      return this.location.id
    },
    name() {
      return this.location.name
    },
    lat() {
      return this.location.lat
    },
    lng() {
      return this.location.lng
    },
    address() {
      return this.location.address
    }
  },
  methods: {
    deleteLocation() {
      this.$buefy.dialog.confirm({
        message: `Delete "${this.name}"?`,
        onConfirm: () =>
          this.$store.dispatch('deleteLocation', { locationId: this.id })
      })
    }
  }
}
</script>
