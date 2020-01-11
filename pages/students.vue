<template>
  <b-container>
    <div class="container-header">
      <h1>Students</h1>
      <nuxt-link :to="{ name: 'register' }" class="btn btn-secondary">
        Create
      </nuxt-link>
    </div>
    <div class="students-list">
      <nuxt-link
        v-for="student of students"
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
  name: 'Students',
  async asyncData ({ $axios }) {
    let students = []
    let total = 0
    try {
      const response = await $axios.get('/students', {
        params: {
          _page: 1
        }
      })
      students = response.data
      total = response.headers['x-total-count']
    } catch (e) {
      console.log(e)
    }
    return { students, total }
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
