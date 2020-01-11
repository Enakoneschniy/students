<template>
  <b-container class="d-flex justify-content-center">
    <b-form @submit.prevent="onSubmit" class="auth-form create-form">
      <h2 class="text-center">
        Edit a student
      </h2>
      <hr>
      <b-form-group
        label="Group:"
        label-for="group"
      >
        <b-form-select v-model="form.groupId" :options="options"></b-form-select>
      </b-form-group>
      <b-form-group
        label="Name:"
        label-for="name"
      >
        <b-form-input
          id="name"
          v-model="form.name"
          type="text"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Phone:"
        label-for="phone"
      >
        <b-form-input
          id="phone"
          v-model="form.phone"
          type="text"
          required
          placeholder="Enter phone"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Email address:"
        label-for="email"
      >
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>
      <b-button class="btn-block" type="submit" variant="primary">
        Save
      </b-button>
    </b-form>
  </b-container>
</template>

<script>
export default {
  name: 'Student',
  computed: {
    options () {
      return this.groups.map(group => ({
        value: group.id,
        text: group.name
      }))
    }
  },
  async asyncData ({ $axios, params, error }) {
    try {
      const form = await $axios.$get(`/students/${params.id}`)
      const groups = await $axios.$get(`/groups`)
      return { form, groups }
    } catch (e) {
      return error(e)
    }
  },
  methods: {
    async onSubmit () {
      try {
        const { id, ...form } = this.form
        await this.$axios.$patch(`/students/${id}`, form)
        this.$toast.success('Student was updated', {
          // override the global option
          position: 'top'
        })
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e.response)
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
