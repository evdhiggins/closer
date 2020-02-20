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
            <div class="navbar-end">
              <a
                v-for="tab in topTabs"
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
    <div class="hero-foot">
      <nav class="tabs is-boxed is-fullwidth">
        <div class="container">
          <ul>
            <li
              v-for="tab in bottomTabs"
              :key="`bt${tab.url}`"
              :class="$route.path === tab.url ? 'is-active' : ''"
            >
              <a @click="clickNavItem(tab.url)">{{ tab.label }}</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isMobileNavOpen: false,
      topTabs: [
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
      bottomTabs: [
        {
          url: '/closer',
          label: 'Get closer'
        },
        {
          url: '/location-sets',
          label: 'Location sets'
        },
        {
          url: '/locaitons',
          label: 'Locations'
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
