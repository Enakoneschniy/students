<template>
  <b-container class="d-flex justify-content-center">
    <b-form @submit.prevent="onSubmit" class="auth-form create-form">
      <h2 class="text-center">
        Add new group
      </h2>
      <hr>
      <b-form-group
        label="Name:"
        label-for="name"
      >
        <b-form-input
          id="name"
          v-model="form.name"
          type="text"
          required
          placeholder="Enter group name"
        ></b-form-input>
      </b-form-group>
      <b-button class="btn-block" type="submit" variant="primary">
        Create
      </b-button>
    </b-form>
  </b-container>
</template>

<script>
export default {
  name: 'CreateGroup',
  data: () => ({
    form: {
      name: ''
    }
  }),
  methods: {
    async onSubmit () {
      try {
        await this.$axios.$post('/groups', this.form)
        this.$router.replace({ name: 'groups' })
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
