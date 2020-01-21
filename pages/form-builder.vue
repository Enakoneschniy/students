<template>
  <client-only>
    <b-container v-drag-and-drop:options="dragOptions">
      <div class="pt-4">
        <h1 class="pb-4">
          Register form builder
        </h1>
        <div class="d-flex">
          <form class="w-75 form drag-inner-list">
            <vue-form-generator :schema="schema" :model="model" :options="formOptions" />
            <button v-if="schema.fields.length > 0" @click.prevent="onSave" class="btn btn-secondary">
              Save
            </button>
            <nuxt-link :to="{ name: 'register' }" class="btn btn-primary">
              Go to registration
            </nuxt-link>
          </form>
          <div class="w-25">
            <ul class="drag-inner-list">
              <li v-for="field of baseFields" :data-uid="field.uid" class="drag-item">
                {{ field.fieldLabel }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--<div contenteditable="true" class="c-form-control">
        <span style="color: red;">Этот текст красный</span>
        <span style="color: green;">Этот текст зеленый</span>
      </div>-->
    </b-container>
  </client-only>
</template>

<script>
import AddFieldModal from '../components/AddFieldModal'
export default {
  name: 'FormBuilder',
  data: () => ({
    model: {},
    baseFields: [
      {
        uid: 1,
        fieldLabel: 'Text field',
        type: 'input',
        inputType: 'text',
        label: 'ID',
        model: 'id'
      },
      {
        uid: 2,
        fieldLabel: 'Email field',
        type: 'input',
        inputType: 'email',
        label: 'E-mail',
        model: 'email',
        placeholder: 'User\'s e-mail address'
      },
      {
        uid: 3,
        fieldLabel: 'Select',
        type: 'select',
        label: 'Skills',
        model: 'skills'
      },
      {
        uid: 4,
        fieldLabel: 'Checkbox',
        type: 'checkbox',
        label: 'Status',
        model: 'status',
        default: true
      },
      {
        uid: 5,
        fieldLabel: 'Radio',
        type: 'radios',
        label: 'Very best friend',
        model: 'friend'
      },
      {
        uid: 6,
        fieldLabel: 'Text',
        type: 'textArea',
        label: 'Biography',
        model: 'bio',
        placeholder: "User's biography"
      }
    ],
    formOptions: {
      validateAfterLoad: true,
      validateAfterChanged: true,
      validateAsync: true
    },
    dragOptions: {
      dropzoneSelector: '.drag-inner-list',
      draggableSelector: '.drag-item',
      reactivityEnabled: true,
      multipleDropzonesItemsDraggingEnabled: true,
      showDropzoneAreas: true
    }
  }),
  async asyncData ({ $axios }) {
    let fields = []
    try {
      fields = (await $axios.$get('/forms/1')).fields
    } catch (e) {
      console.log(e)
    }
    return {
      schema: { fields }
    }
  },
  created () {
    this.dragOptions.onDragend = this.onDragend
    this.$eventBus.$on('saveField', (field) => {
      console.log(field)
      this.schema.fields.push(field)
    })
  },
  methods: {
    async onSave () {
      try {
        await this.$axios.$patch(`/forms/1`, this.schema)
      } catch (e) {
        console.log(e)
      }
    },
    onDragend (event) {
      const uid = parseFloat(event.items[0].getAttribute('data-uid'))
      const field = this.baseFields.find(field => field.uid === uid)
      if (event.droptarget.classList.toString() !== event.owner.classList.toString()) {
        this.$modal.show(AddFieldModal, {
          field
        }, {
          adaptive: true,
          minHeight: 500
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.drag-inner-list {
  list-style: none;
  &.form {
    padding: 10px;
    border: 1px solid transparent;
    position: relative;
  }
  &.form.dragover {
    border: 1px solid #cacaca;
    border-radius: 4px;
    &:before {
      font-family: 'FontAwesome', normal;
      content: '\f196';
      font-size: 82px;
      color: #cacaca;
      background: rgba(202, 202, 202, .5);
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .drag-item {
    border: 1px solid #cacaca;
    padding: 5px;
    margin-bottom: 10px;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
  }
}
.c-form-control {
  display: block;
  width: 100%;
  height: auto;
  min-height: 150px;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  -webkit-transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>
