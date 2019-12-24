<template>
  <b-container class="d-flex justify-content-center">
    <b-form @submit.prevent="onSubmit" class="auth-form">
      <h2 class="text-center">
        Login
      </h2>
      <hr>
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
      <b-form-group
        label="Password:"
        label-for="password"
      >
        <b-form-input
          id="password"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>
      <b-button class="btn-block" type="submit" variant="primary">
        Login
      </b-button>
      <nuxt-link :to="{ name: 'register' }" class="btn btn-link btn-block">
        Go to registration
      </nuxt-link>
    </b-form>
  </b-container>
</template>

<script>
export default {
  name: 'Login',
  layout: 'empty',
  data: () => ({
    form: {
      email: '',
      password: ''
    }
  }),
  methods: {
    async onSubmit () {
      await this.$auth.loginWith('local', { data: this.form })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
