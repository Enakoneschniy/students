<template>
  <b-container>
    <div class="container-header">
      <h1>{{ group.name }}</h1>
      <nuxt-link :to="{ name: 'register', params: { groupId: group.id } }" class="btn btn-secondary">
        Add a student
      </nuxt-link>
    </div>
    <div class="students-list">
      <nuxt-link
        v-for="student of group.students"
        :key="student.id"
        :to="{ name: 'student', params: { id: student.id } }"
        class="alert-link"
      >
        <b-alert show variant="secondary">
          {{ student.name }}
        </b-alert>
      </nuxt-link>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'Group',
  async asyncData ({ $axios, params, error }) {
    try {
      const group = await $axios.$get(`/groups/${params.id}`, {
        params: {
          _embed: 'students'
        }
      })
      return { group }
    } catch (e) {
      return error(e)
    }
  }
}
</script>

<style scoped lang="scss">
.students-list {
  a {
    text-decoration: none;
  }
}
</style>
