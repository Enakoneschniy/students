<template>
  <div class="step-content-wrapper">
    <h2>
      Welcome!
    </h2>
    <ul>
      <li v-for="field in formData">
        {{ field }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Step3',
  computed: mapGetters({
    formData: 'form-builder/getFormData'
  }),
  created () {
    this.$emit('can-continue', { value: true })
  }
}
</script>

<style scoped lang="scss">
.step-content-wrapper {
  width: 60%;
  margin: 0 auto;
}
</style>
