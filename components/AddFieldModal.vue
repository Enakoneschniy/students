<template>
  <div>
    <div>
      <div class="modal-header">
        <h3 class="text-center">
          Add {{ field.fieldLabel }}
        </h3>
      </div>
      <div class="modal-body">
      <pre>
      {{ field }}
    </pre>
      </div>
      <div class="modal-footer">
        sfdsdf
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddFieldModal',
  props: {
    field: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">

</style>
