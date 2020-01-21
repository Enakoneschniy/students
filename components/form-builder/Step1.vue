<template>
  <div class="step-content-wrapper">
    <b-form @submit.prevent="onSubmit">
      <b-form-group
        label="Group:"
        label-for="group"
      >
        <b-form-select v-model="groupId" :options="groups" />
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Step1',
  data: () => ({
    groups: [],
    groupId: ''
  }),
  watch: {
    groupId (val) {
      this.setFormData({ groupId: val })
    }
  },
  async created () {
    try {
      this.groups = (await this.$axios.$get('/groups'))
        .map(group => ({
          value: group.id,
          text: group.name
        }))
      this.groupId = this.groups[0].value
      this.setFormData({ groupId: this.groupId })
      this.$emit('can-continue', { value: true })
    } catch (e) {
      console.log(e)
    }
  },
  activated () {
    this.$emit('can-continue', { value: true })
  },
  methods: mapActions({
    setFormData: 'form-builder/setFormData'
  })
}
</script>

<style scoped lang="scss">
.step-content-wrapper {
  width: 60%;
  margin: 0 auto;
}
</style>
