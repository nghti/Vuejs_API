<template>
  <div>
    <h2>DTKD</h2>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item
        v-for="(k, index) in form.getFieldValue('keys')"
        :key="k"
        v-bind="formItemLayout"
        :label="`Node[${index}]`"
        :required="false"
      >
        <a-input-number
          :formatter="value => `${value}VND`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\VND\s?|(,*)/g, '')"
          @change="handleFormChange"
          v-decorator="[
          `money[${k}]`,
          {
            validateTrigger: ['change', 'blur'],
          },
        ]"
          placeholder="passenger name"
          style="width: 60%; margin-right: 8px"
        />
        <a-icon
          v-if="form.getFieldValue('keys').length > 1"
          class="dynamic-delete-button"
          type="minus-circle-o"
          :disabled="form.getFieldValue('keys').length === 1"
          @click="() => remove(k)"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayoutWithOutLabel">
        <a-button type="dashed" style="width: 60%" @click="add">
          <a-icon type="plus" /> Add field
        </a-button>
      </a-form-item>
      <a-form-item label="Note-DT" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <h2 v-if="formMe.money">
          {{ formMe.money.reduce(function(a, b) { return a + b; }, 0) | formatMoney }}VND
        </h2>
      </a-form-item>
      <a-form-item label="Note-T" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
        />
      </a-form-item>
      <a-form-item label="Note-C" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
        />
      </a-form-item>
      <a-form-item label="Note-DV" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
        />
      </a-form-item>
      <a-form-item label="Note-TLG" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
        />
      </a-form-item>
      <a-form-item label="Note-TL %" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
        />
      </a-form-item>
      <a-form-item label="Note-QL %" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayoutWithOutLabel">
        <a-button type="primary" html-type="submit">
          Submit
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import _ from 'lodash'
  let id = 0
  export default {
    data: () => ({
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 },
        },
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 12, offset: 5 },
        },
      },
      fields: {},
    }),
    beforeCreate () {
      this.form = this.$form.createForm(this, { name: 'dynamic_form_item' })
      this.form.getFieldDecorator('keys', { initialValue: [], preserve: true })
    },
    // mounted () {
    //   this.getUsers()
    // },
    computed: {
      ...mapState('dashboard', { formMe: 'formMe' }),
    },
    // watch: {
    //   username () {
    //     this.form.updateFields({
    //       username: this.$form.createFormField({
    //         ...this.username,
    //         value: this.username.value,
    //       }),
    //     })
    //   },
    // },
    watch: {
      formMe (data) {
        console.log('data', data)
        this.fields = _.merge(this.fields, data)
      }
    },
    filters: {
      formatMoney: (value) => {
        console.log('value', value)
        return Number((value).toFixed(1)).toLocaleString()
      }
    },
    methods: {
      ...mapActions('dashboard', ['postForm']),
      handleSubmit (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            this.postForm(values)
          }
        })
      },
      handleFormChange (changedFields) {
        // console.log('changedFields', changedFields)
        // this.fields = { ...this.fields, ...changedFields }
        // console.log('this.fields', this.fields)
      },
      remove (k) {
        const { form } = this
        // can use data-binding to get
        const keys = form.getFieldValue('keys')
        // We need at least one passenger
        if (keys.length === 1) {
          return
        }

        // can use data-binding to set
        form.setFieldsValue({
          keys: keys.filter(key => key !== k),
        })
      },

      add () {
        const { form } = this
        console.log('form', form)
        // can use data-binding to get
        const keys = form.getFieldValue('keys')
        const nextKeys = keys.concat(id++)
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
          keys: nextKeys,
        })
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>
