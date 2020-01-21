<template>
  <b-container class="pt-5 d-flex justify-content-center">
    <client-only>
      <horizontal-stepper
        :steps="steps"
        @completed-step="completeStep"
        @active-step="isStepActive"
        @stepper-finished="finish"
      />
    </client-only>
    <!--<b-form @submit.prevent="onSubmit" class="auth-form create-form">
      <h2 class="text-center">
        Add new student
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
        Create
      </b-button>
    </b-form>-->
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'
import Step1 from '../components/form-builder/Step1'
import Step2 from '../components/form-builder/Step2'
import Step3 from '../components/form-builder/Step3'

export default {
  name: 'Register',
  layout: 'empty',
  data: () => ({
    steps: [
      {
        icon: 'build',
        name: 'first',
        title: 'Init',
        subtitle: '',
        component: Step1,
        completed: false
      },
      {
        icon: 'description',
        name: 'second',
        title: 'Data',
        subtitle: '',
        component: Step2,
        completed: false
      },
      {
        icon: 'done_all',
        name: 'second',
        title: 'Done',
        subtitle: '',
        component: Step3,
        completed: false
      }
    ]
  }),
  computed: {
    options () {
      return this.groups.map(group => ({
        value: group.id,
        text: group.name
      }))
    }
  },
  async asyncData ({ $axios, params }) {
    let groups = []
    let groupId = null
    try {
      groups = await $axios.$get('/groups')
      if (params.groupId) {
        groupId = params.groupId
      } else if (groups.length > 0) {
        groupId = groups[0].id
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
    return { groups, form: { groupId } }
  },
  created () {
    setTimeout(() => {
      const st1 = { ...this.steps[0] }
      st1.completed = true
      this.steps.splice(0, 1, st1)
    }, 5000)
  },
  methods: {
    ...mapActions({
      saveFormData: 'form-builder/saveFormData'
    }),
    completeStep (payload) {
      this.steps.forEach((step) => {
        if (step.name === payload.name) {
          step.completed = true
        }
      })
    },
    // Executed when @active-step event is triggered
    isStepActive (payload) {
      this.steps.forEach((step) => {
        if (step.name === payload.name) {
          if (step.completed === true) {
            step.completed = false
          }
        }
      })
    },
    finish (payload) {
      this.saveFormData()
    },
    async onSubmit () {
      try {
        await this.$axios.$post('/students', this.form)
        this.$router.replace({ name: 'students' })
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
