<template>
  <b-container class="d-flex justify-content-center">
    <b-form @submit.prevent="onSubmit" class="auth-form">
      <h2 class="text-center">
        Registration
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
        Register
      </b-button>
      <nuxt-link :to="{ name: 'login' }" class="btn btn-link btn-block">
        Go to authorization
      </nuxt-link>
    </b-form>
  </b-container>
</template>

<script>
export default {
  name: 'Register',
  auth: false,
  middleware: ['login'],
  layout: 'empty',
  data: () => ({
    form: {
      name: '',
      phone: '',
      email: '',
      password: ''
    }
  }),
  methods: {
    async onSubmit () {
      try {
        await this.$axios.$post('/register', this.form)
        await this.$auth.loginWith('local', {
          data: {
            email: this.form.email,
            password: this.form.password
          }
        })
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e.response)
      }
    }
  }
}
</script>

<style scoped>

</style>
