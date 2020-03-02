<template>
  <div>
    <h2 class="title">Bản Tính Dòng Tiền Kinh Doanh</h2>
    <a-tabs defaultActiveKey="1">
      <a-tab-pane tab="Cơ bản" key="1">
        <h4 style="marginBottom: 25px; fontSize: 20px">Không tốn phí sửa chữa và phí dịch vụ</h4>
        <a-form :form="form" @submit="handleSubmit">
          <a-form-item label="Trệt (MB)" v-bind="formItemLayout" class="label-bold">
            <a-input-number
              :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :parser="value => value.replace(/\VND\s?|(,*)/g, '')"
              placeholder="Tiền MB dự tính"
              v-decorator="['mb']"
              style="width: 90%"
            />
          </a-form-item>
          <a-form-item
            class="label-bold"
            v-for="(k, index) in form.getFieldValue('keys')"
            :key="k"
            v-bind="formItemLayout"
            :label="`Phòng ${index+1}`"
            :required="false"
          >
            <a-input-number
              :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :parser="value => value.replace(/\VND\s?|(,*)/g, '')"
              @change="handleFormChange"
              v-decorator="[
              `money[${k}]`,
              {
                validateTrigger: ['change', 'blur'],
              },
            ]"
              placeholder="Tiền phòng dự tính"
              style="width: 90%; margin-right: 8px"
            />
            <a-icon
              v-if="form.getFieldValue('keys').length > 1"
              class="dynamic-delete-button"
              type="minus-circle-o"
              :disabled="form.getFieldValue('keys').length === 1"
              @click="() => remove(k)"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayoutWithOutLabel" class="label-bold">
            <a-button type="dashed" style="width: 220px" @click="add">
              <a-icon type="plus" /> Thêm phòng
            </a-button>
          </a-form-item>
          <a-form-item label="Danh thu" v-bind="formItemLayout" class="label-bold">
            <h2 v-if="formMe.money">
              {{ MoneyDanhThu }} VND
            </h2>
          </a-form-item>
          <a-form-item label="Giá thuê" v-bind="formItemLayout" class="label-bold">
            <a-input-number
              :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :parser="value => value.replace(/\VND\s?|(,*)/g, '')"
              :placeholder="placeholder"
              v-decorator="['gt']"
              style="width: 90%"
            />
          </a-form-item>
          <a-form-item label="Tiền cọc với chủ" v-bind="formItemLayout" class="label-bold">
            <h2 v-if="formMe.gt">
              {{ MoneyCocChu01 }} VND / 3 Tháng
            </h2>
            <h2 v-if="formMe.gt == undefined && formMe.money">
              {{ MoneyCocChu02 }} VND / 3 Tháng
            </h2>
          </a-form-item>
          <a-form-item label="Tiền cọc của khách" v-bind="formItemLayout" class="label-bold">
            <h2 v-if="formMe.money">
              {{MoneyCocKhach}} VND / 1 Tháng
            </h2>
          </a-form-item>
          <a-form-item label="Tổng đầu tư" v-bind="formItemLayout" class="red-h2 label-bold">
            <h2 v-if="formMe.gt">
              {{ MoneyTong01 }} VND
            </h2>
            <h2 v-if="formMe.gt == undefined && formMe.money">
              {{MoneyTong02}} VND
            </h2>
          </a-form-item>
          <a-form-item label="Lợi nhuận rồng" v-bind="formItemLayout" class="blue-h2 label-bold">
            <h2 v-if="formMe.money">
              {{MoneyLoiRong}} VND
            </h2>
          </a-form-item>
          <a-form-item label="Tỷ suất lợi nhuận rồng" v-bind="formItemLayout" class="label-bold">
            <h2 v-if="formMe.money">
              {{MoneyTyRong}} %
            </h2>
          </a-form-item>
          <a-form-item label="Thời gian hoàn vốn" v-bind="formItemLayout" class="label-bold">
            <h2 v-if="formMe.money">
              {{MoneyHoa}} Tháng
            </h2>
          </a-form-item>
          <a-form-item label="Lợi nhuận trên tổng đầu tư" v-bind="formItemLayout" class="label-bold">
            <h2 v-if="formMe.money">
              {{MoneyLoi}} %
            </h2>
          </a-form-item>
          <!-- <hr>
          <a-form-item label="Note-C" v-bind="formItemLayout">
            <a-input
              v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
            />
          </a-form-item>
          <a-form-item label="Note-DV" v-bind="formItemLayout">
            <a-input
              v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
            />
          </a-form-item>
          <a-form-item label="Note-TLG" v-bind="formItemLayout">
            <a-input
              v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
            />
          </a-form-item>
          <a-form-item label="Note-TL %" v-bind="formItemLayout">
            <a-input
              v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
            />
          </a-form-item>
          <a-form-item label="Note-QL %" v-bind="formItemLayout">
            <a-input
              v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
            />
          </a-form-item> -->
          <a-form-item v-bind="formItemLayoutWithOutLabel">
            <a-button type="primary" html-type="submit">
              Tính Tiền
            </a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane tab="Trung cấp" key="2" forceRender>Content of Tab Pane 2</a-tab-pane>
      <a-tab-pane tab="Cao cấp" key="3">Content of Tab Pane 3</a-tab-pane>
    </a-tabs>
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
          sm: { span: 7 },
          lg: { span: 7 },
        },
        wrapperCol: {
          sm: { span: 17 },
          lg: { span: 10 },
        },
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          sm: { span: 17, offset: 7 },
          lg: { span: 10, offset: 7 },
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
      placeholder () {
        return this.formMe.money ? Number(((this.formMe.money.reduce(function (a, b) { return a + b }, 0) + this.formMe.mb) * 0.7).toFixed(1)).toLocaleString() : ''
      },
      MoneyDanhThu () {
        return Number((this.formMe.money.reduce(function (a, b) { return a + b }, 0) + this.formMe.mb).toFixed(1)).toLocaleString()
      },
      MoneyCocChu01 () {
        return Number((this.formMe.gt * 3).toFixed(1)).toLocaleString()
      },
      MoneyCocChu02 () {
        return Number(((this.formMe.money.reduce(function (a, b) { return a + b }, 0) + this.formMe.mb) * 0.7 * 3).toFixed(1)).toLocaleString()
      },
      MoneyCocKhach () {
        return Number((this.formMe.money.reduce(function (a, b) { return a + b }, 0) + this.formMe.mb).toFixed(1)).toLocaleString()
      },
      MoneyTong01 () {
        return Number((this.formMe.gt * 3) - (this.formMe.money.reduce(function (a, b) { return a + b }, 0) + this.formMe.mb).toFixed(1)).toLocaleString()
      },
      MoneyTong02 () {
        return Number((((this.formMe.money.reduce(function (a, b) { return a + b }, 0) + this.formMe.mb) * 0.7 * 3) - (this.formMe.money.reduce(function (a, b) { return a + b }, 0) + this.formMe.mb)).toFixed(1)).toLocaleString()
      },
      MoneyLoiRong () {
        return Number(((this.formMe.money.reduce(function (a, b) { return a + b }, 0) + this.formMe.mb) - (this.formMe.money.reduce(function (a, b) { return a + b }, 0) + this.formMe.mb) * 0.7).toFixed(1)).toLocaleString()
      },
      MoneyTyRong () {
        return Number((((this.formMe.money.reduce(function (a, b) { return a + b }, 0) + this.formMe.mb) - (this.formMe.money.reduce(function (a, b) { return a + b }, 0) + this.formMe.mb) * 0.7) / ((this.formMe.money.reduce(function (a, b) { return a + b }, 0) + this.formMe.mb) * 0.7 * 3 - (this.formMe.money.reduce(function (a, b) { return a + b }, 0) + this.formMe.mb)) * 100).toFixed(2))
      },
      MoneyHoa () {
        return Number((((this.formMe.money.reduce(function (a, b) { return a + b }, 0) + this.formMe.mb) * 0.7 * 3 - (this.formMe.money.reduce(function (a, b) { return a + b }, 0) + this.formMe.mb)) / ((this.formMe.money.reduce(function (a, b) { return a + b }, 0) + this.formMe.mb) - (this.formMe.money.reduce(function (a, b) { return a + b }, 0) + this.formMe.mb) * 0.7)).toFixed(2))
      },
      MoneyLoi () {
        return Number((((this.formMe.money.reduce(function (a, b) { return a + b }, 0)) - (this.formMe.money.reduce(function (a, b) { return a + b }, 0)) * 0.7) / ((this.formMe.money.reduce(function (a, b) { return a + b }, 0)) * 0.7 * 4) * 100).toFixed(2))
      },
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
      formatMoneyGiathue: (value) => {
        return Number((value * 0.7).toFixed(1)).toLocaleString()
      },
      formatMoneyToicoc: (value) => {
        return Number((value * 0.7 * 3).toFixed(1)).toLocaleString()
      },
      formatMoneyTong: (value) => {
        const me = value * 0.7 * 3
        const Kcoc = value
        return Number((me - Kcoc).toFixed(1)).toLocaleString()
      },
      formatMoneyThu: (value) => {
        return Number((value - value * 0.7).toFixed(1)).toLocaleString()
      },
      formatMoneyTyrong: (value) => {
        const loi = value - value * 0.7
        const tong = value * 0.7 * 3 - value
        return Number((loi / tong * 100).toFixed(2))
      },
      formatMoneyHoa: (value) => {
        const loi = value - value * 0.7
        const coc = value * 0.7 * 3 - value
        return Number((coc / loi).toFixed(2))
      },
      formatMoneyLoi: (value) => {
        const loi = value - value * 0.7
        const tong = value * 0.7 * 4
        return Number((loi / tong * 100).toFixed(2))
      },
    },
    methods: {
      ...mapActions('dashboard', ['postForm']),
      handleSubmit (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('values', values)
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
  .title {
    font-size: 30px;
    margin-bottom: 40px;
    margin-left: 10px;
  }
  /deep/ .label-bold {
    font-weight: bold;
  }
  /deep/ .red-h2 .ant-form-item-label label {
    color: #FF0000;
  }
  /deep/ .blue-h2 {
    label {
      color: #00FF00;
    }
  }
</style>
