<template>
  <b-container>
    <div class="container-header">
      <h1>Groups</h1>
      <nuxt-link :to="{ name: 'create-group' }" class="btn btn-secondary">
        Create
      </nuxt-link>
    </div>
    <div class="group-list">
      <nuxt-link
        v-for="group of groups"
        :key="group.id"
        :to="{ name: 'group', params: { id: group.id } }"
        class="alert-link"
      >
        <b-alert show variant="secondary">
          {{ group.name }}
        </b-alert>
      </nuxt-link>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'Groups',
  async asyncData ({ $axios }) {
    let groups = []
    try {
      groups = await $axios.$get('/groups')
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
    return { groups }
  }
}
</script>

<style scoped lang="scss">
  .group-list {
    a {
      text-decoration: none;
    }
  }
</style>
