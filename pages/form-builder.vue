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
    </b-container>
  </client-only>
</template>

<script>
import AddFieldModal from '../components/AddFieldModal'
export default {
  name: 'FormBuilder',
  data: () => ({
    model: {
      id: 1,
      name: 'John Doe',
      password: 'J0hnD03!x4',
      skills: ['Javascript', 'VueJS'],
      email: 'john.doe@gmail.com',
      status: true
    },
    baseFields: [
      {
        uid: 1,
        fieldLabel: 'Text field',
        type: 'input',
        inputType: 'text',
        label: 'ID',
        model: 'id',
        readonly: true,
        disabled: true
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
        model: 'skills',
        values: ['Javascript', 'VueJS', 'CSS3', 'HTML5']
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
        model: 'friend',
        values: [
          'James',
          'Nadia',
          'Paul',
          'Christelle',
          'Marc',
          'Marie'
        ]
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
    schema: {
      fields: [
      ]
    },
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
  created () {
    this.dragOptions.onDragend = this.onDragend
  },
  methods: {
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
        /*
        this.schema.fields.unshift(field) */
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
</style>
