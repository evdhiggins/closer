<template>
  <section class="hero is-primary is-fullheight">
    <div class="hero-head">
      <header class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <n-link id="nav-brand" class="navbar-item" to="/">Closer</n-link>
            <a
              role="button"
              class="navbar-burger"
              :class="isMobileNavOpen ? 'is-active' : ''"
              aria-label="menu"
              aria-expanded="false"
              @click="toggleDrawer"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div class="navbar-menu" :class="isMobileNavOpen ? 'is-active' : ''">
            <div class="navbar-start">
              <a
                v-for="tab in leftTabs"
                :key="`tt${tab.url}`"
                class="navbar-item"
                :class="$route.path === tab.url ? 'is-active' : ''"
                @click="clickNavItem(tab.url)"
                >{{ tab.label }}</a
              >
            </div>
            <div class="navbar-end">
              <a
                v-for="tab in rightTabs"
                :key="`tt${tab.url}`"
                class="navbar-item"
                :class="$route.path === tab.url ? 'is-active' : ''"
                @click="clickNavItem(tab.url)"
                >{{ tab.label }}</a
              >
            </div>
          </div>
        </div>
      </header>
    </div>
    <div class="hero-body">
      <div class="container has-text-centered">
        <nuxt />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isMobileNavOpen: false,
      leftTabs: [
        {
          url: '/',
          label: 'Home'
        },
        {
          url: '/about',
          label: 'About'
        },
        {
          url: '/contact',
          label: 'Contact'
        }
      ],
      rightTabs: [
        {
          url: '/closer',
          label: 'Get closer'
        },
        {
          url: '/locations',
          label: 'Locations'
        },
        {
          url: '/location-groups',
          label: 'Location groups'
        }
      ]
    }
  },
  methods: {
    toggleDrawer() {
      this.isMobileNavOpen = !this.isMobileNavOpen
    },
    clickNavItem(url) {
      this.isMobileNavOpen = false
      this.$router.push(url)
    }
  }
}
</script>
<style scoped>
#nav-brand {
  font-weight: bold;
  font-size: 1.5rem;
  color: white;
}
</style>
