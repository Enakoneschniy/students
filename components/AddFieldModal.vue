<template>
  <div>
    <div>
      <div class="modal-header">
        <h3 class="text-center">
          Add {{ field.fieldLabel }}
        </h3>
      </div>
      <div class="modal-body">
        <form>
          <perfect-scrollbar class="scroll-wrapper">
            <div class="form-group">
              <label for="label">Label</label>
              <input id="label" v-model="localField.label" type="text" class="form-control">
            </div>
            <div v-if="localField.type === 'input'" class="form-group">
              <label for="placeholder">Placeholder</label>
              <input id="placeholder" v-model="localField.placeholder" type="text" class="form-control">
            </div>
            <div v-if="localField.type === 'checkbox'" class="form-group form-check">
              <input id="check" v-model="localField.default" type="checkbox" class="form-check-input">
              <label class="form-check-label" for="check">Checked by default</label>
            </div>
            <template v-if="isMultiple">
              <h4>Variants</h4>
              <div v-for="(val, index) of localField.values" class="form-group">
                <label for="placeholder">
                  <input v-model="localField.values[index]" type="text" class="form-control">
                </label>
              </div>
              <div class="form-group">
                <label for="placeholder">
                  <input v-model="newVariant" type="text" class="form-control" placeholder="New Variant">
                </label>
              </div>
              <button @click.prevent.stop="onAddVariant" class="btn btn-success btn-block">
                Add variant
              </button>
            </template>
          </perfect-scrollbar>
        </form>
      </div>
      <div class="modal-footer">
        <button @click="onSave" class="btn btn-secondary">
          Save
        </button>
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
  },
  data: () => ({
    newVariant: '',
    localField: {}
  }),
  computed: {
    isMultiple () {
      return this.localField.type === 'select' || this.localField.type === 'radios'
    },
    hasVariants () {
      return !!this.localField.values
    }
  },
  created () {
    const tmpField = { ...this.field }
    if (tmpField.type === 'select' || tmpField.type === 'radios') {
      tmpField.values = []
    }
    this.localField = tmpField
  },
  methods: {
    onAddVariant () {
      if (this.newVariant.trim() !== '') {
        this.localField.values.push(this.newVariant)
        this.newVariant = ''
      }
    },
    onSave () {
      this.localField.model = this.localField.label.replace(/ /g, '_').toLowerCase()
      this.$eventBus.$emit('saveField', this.localField)
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
label {
  width: 100%;
}
.modal-body {
  .scroll-wrapper {
    height: 325px;
  }
}
</style>
