<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">
      Students Tool
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse" />

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <li class="nav-item">
          <nuxt-link
            :to="{ name: 'groups' }"
            class="nav-link"
            exact
            exact-active-class="active"
          >
            Groups
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link
            :to="{ name: 'students' }"
            class="nav-link"
            exact
            exact-active-class="active"
          >
            Students
          </nuxt-link>
        </li>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search" />
          <b-button size="sm" class="my-2 my-sm-0" type="submit">
            Search
          </b-button>
        </b-nav-form>

        <b-nav-item-dropdown v-if="$auth.loggedIn === true" right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">
            Profile
          </b-dropdown-item>
          <b-dropdown-item @click.prevent="onSignOut">
            Sign Out
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'TheHeader',
  methods: {
    async onSignOut () {
      await this.$auth.logout()
      this.$router.replace({ name: 'login' })
    }
  }
}
</script>

<style scoped>

</style>
