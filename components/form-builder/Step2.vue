<template>
  <div class="step-content-wrapper">
    <vue-form-generator :schema="schema" :model="model" :options="formOptions" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Step2',
  data: () => ({
    timeout: null,
    model: {},
    schema: {
      fields: []
    },
    formOptions: {
      validateAfterLoad: true,
      validateAfterChanged: true,
      validateAsync: true
    }
  }),
  watch: {
    model: {
      handler () {
        this.debounceSetFormData()
      },
      deep: true
    }
  },
  activated () {
    this.$emit('can-continue', { value: true })
  },
  async created () {
    try {
      this.schema.fields = (await this.$axios.$get('/forms/1')).fields
    } catch (e) {
      console.log(e)
    }
    this.$emit('can-continue', { value: true })
  },
  methods: {
    ...mapActions({
      setFormData: 'form-builder/setFormData'
    }),
    debounceSetFormData () {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.setFormData(this.model)
      }, 2000)
    }
  }
}
</script>

<style scoped lang="scss">
.step-content-wrapper {
  width: 60%;
  margin: 0 auto;
}
</style>
