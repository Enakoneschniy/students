<template>
  <div class="container">
    <ul>
      <li v-for="user of users" :key="user.id">
        <p>
          <strong>Name</strong>: {{ user.name }}
        </p>
        <p>
          <strong>Email</strong>: {{ user.email }}
        </p>
        <p>
          <strong>Phone</strong>: {{ user.phone }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  async asyncData ({ $axios }) {
    let users = []
    try {
      users = await $axios.$get('/users')
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
    return { users }
  }
}
</script>
