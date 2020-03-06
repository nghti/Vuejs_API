<template>
  <div>
    <h2 class="title">Bản Tính Dòng Tiền<br>Kinh Doanh</h2>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="Trệt (MB)" v-bind="formItemLayout" class="label-bold">
        <a-input-number
          :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\VND\s?|(,*)/g, '')"
          placeholder="Tiền MB dự tính"
          v-decorator="
              ['mb']
              "
          style="width: 90%"
        />
      </a-form-item>
      <a-tabs @change="callback">
        <a-tab-pane key="1">
              <span slot="tab">
                <a-icon type="copy" />
                Tổng phòng
              </span>
          <a-form-item label="Tổng số phòng" v-bind="formItemLayout" class="label-bold">
            <a-input-number
              placeholder="Không tính mb"
              v-decorator="['soPhong']"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item label="Tiền phòng trung bình" v-bind="formItemLayout" class="label-bold">
            <a-input-number
              :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :parser="value => value.replace(/\VND\s?|(,*)/g, '')"
              placeholder="Tiền dự tính"
              v-decorator="
                  ['tienTb']
                  "
              style="width: 100%"
            />
          </a-form-item>
        </a-tab-pane>
        <a-tab-pane key="2">
              <span slot="tab">
                <a-icon type="file" />
                Từng phòng
              </span>
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
        </a-tab-pane>
      </a-tabs>
      <hr class="style-hr">
      <a-form-item label="Giá thuê" v-bind="formItemLayout" class="label-bold mt-20 important">
        <a-input-number
          :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\VND\s?|(,*)/g, '')"
          :placeholder="MoneyThue | formatMoney"
          v-decorator="['gt']"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="Tiền trả trước" v-bind="formItemLayout" class="label-bold">
        <h2 v-if="formMe.gt == undefined && formMe.money">
          {{ MoneyTraTruoc01 | formatMoney }} VND /
          <a-select
            v-decorator="[
                  'traTruoc',
                  { initialValue: '1 Tháng' }
                ]"
            style="width: 100px"
          >
            <a-select-option value="1">1 Tháng</a-select-option>
            <a-select-option value="2">2 Tháng</a-select-option>
            <a-select-option value="3">3 Tháng</a-select-option>
            <a-select-option value="4">4 Tháng</a-select-option>
            <a-select-option value="5">5 Tháng</a-select-option>
            <a-select-option value="6">6 Tháng</a-select-option>
          </a-select>
        </h2>
        <h2 v-if="formMe.gt">
          {{ MoneyTraTruoc02 | formatMoney }} VND /
          <a-select
            v-decorator="[
                  'traTruoc',
                  { initialValue: '1 Tháng' }
                ]"
            style="width: 100px"
          >
            <a-select-option value="1">1 Tháng</a-select-option>
            <a-select-option value="2">2 Tháng</a-select-option>
            <a-select-option value="3">3 Tháng</a-select-option>
            <a-select-option value="4">4 Tháng</a-select-option>
            <a-select-option value="5">5 Tháng</a-select-option>
            <a-select-option value="6">6 Tháng</a-select-option>
          </a-select>
        </h2>
      </a-form-item>
      <a-form-item label="Tiền cọc với chủ" v-bind="formItemLayout" class="label-bold">
        <h2 v-if="formMe.gt == undefined && formMe.money">
          {{ MoneyCocChu01 | formatMoney }} VND /
          <a-select
            v-decorator="[
                  'cocChu',
                  { initialValue: '3 Tháng' }
                ]"
            style="width: 100px"
          >
            <a-select-option value="1">1 Tháng</a-select-option>
            <a-select-option value="2">2 Tháng</a-select-option>
            <a-select-option value="3">3 Tháng</a-select-option>
            <a-select-option value="6">6 Tháng</a-select-option>
          </a-select>
        </h2>
        <h2 v-if="formMe.gt">
          {{ MoneyCocChu02 | formatMoney }} VND /
          <a-select
            v-decorator="[
                  'cocChu',
                  { initialValue: '3 Tháng' }
                ]"
            style="width: 100px"
          >
            <a-select-option value="1">1 Tháng</a-select-option>
            <a-select-option value="2">2 Tháng</a-select-option>
            <a-select-option value="3">3 Tháng</a-select-option>
            <a-select-option value="6">6 Tháng</a-select-option>
          </a-select>
        </h2>
      </a-form-item>
      <a-form-item label="Tổng đầu tư ban đầu" v-bind="formItemLayout" class="red-h2 label-bold">
        <h2 v-if="formMe.gt == undefined && formMe.money">
          {{MoneyBanDau01 | formatMoney}} VND
        </h2>
        <h2 v-if="formMe.gt">
          {{ MoneyBanDau02 | formatMoney }} VND
        </h2>
      </a-form-item>
      <a-form-item label="Danh thu" v-bind="formItemLayout" class="blue-h2 label-bold">
        <h2 v-if="formMe.money">
          {{ MoneyDanhThu | formatMoney }} VND
        </h2>
      </a-form-item>
      <a-form-item label="Tiền cọc của khách" v-bind="formItemLayout" class="label-bold">
        <h2 v-if="formMe.money">
          {{MoneyCocKhach | formatMoney}} VND / 1 Tháng
        </h2>
      </a-form-item>
      <a-form-item label="Tổng đầu tư" v-bind="formItemLayout" class="red-h2 label-bold">
        <h2 v-if="formMe.gt == undefined && formMe.money">
          {{MoneyTong01 | formatMoney}} VND
        </h2>
        <h2 v-if="formMe.gt">
          {{ MoneyTong02 | formatMoney }} VND
        </h2>
      </a-form-item>
      <a-form-item label="Lợi nhuận rồng" v-bind="formItemLayout" class="blue-h2 label-bold">
        <h2 v-if="formMe.gt == undefined && formMe.money">
          {{MoneyLoiRong01 | formatMoney}} VND
        </h2>
        <h2 v-if="formMe.gt">
          {{MoneyLoiRong02 | formatMoney}} VND
        </h2>
      </a-form-item>
      <hr class="style-hr">
      <a-form-item label="Lợi nhuận trên tổng đầu tư ban đầu" v-bind="formItemLayout" class="label-bold mt-20">
        <h2 v-if="formMe.gt == undefined && formMe.money">
          {{MoneyLoiBanDau01 | formatMoneyNew}} %
        </h2>
        <h2 v-if="formMe.gt">
          {{MoneyLoiBanDau02 | formatMoneyNew}} %
        </h2>
      </a-form-item>
      <a-form-item label="Lợi nhuận trên tổng đầu tư" v-bind="formItemLayout" class="label-bold">
        <h2 v-if="formMe.gt == undefined && formMe.money">
          {{MoneyTyRong01 | formatMoneyNew}} %
        </h2>
        <h2 v-if="formMe.gt">
          {{MoneyTyRong02 | formatMoney}} %
        </h2>
      </a-form-item>
      <a-form-item label="Thời gian hoàn vốn" v-bind="formItemLayout" class="label-bold">
        <h2 v-if="formMe.gt == undefined && formMe.money">
          {{MoneyHoa01 | formatMoneyNew}} Tháng
        </h2>
        <h2 v-if="formMe.gt">
          {{MoneyHoa02 | formatMoneyNew}} Tháng
        </h2>
      </a-form-item>
      <a-form-item v-bind="formItemLayoutWithOutLabel">
        <div class="flex-between">
          <a-button onClick="window.location.reload();">
            Tính Lại
          </a-button>
          <a-button type="primary" html-type="submit">
            Tính Tiền
          </a-button>
        </div>
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
    computed: {
      ...mapState('dashboard', { formMe: 'formMe' }),
      MoneyDanhThu () {
        const MoneyRoom = (this.formMe.money.reduce(function (a, b) { return a + b }, 0) + (this.formMe.soPhong * this.formMe.tienTb))
        return MoneyRoom + this.formMe.mb
      },
      MoneyThue () {
        return this.formMe.money ? this.MoneyDanhThu * 0.7 : ''
      },
      MoneyTraTruoc01 () {
        return this.MoneyThue * this.formMe.traTruoc
      },
      MoneyTraTruoc02 () {
        return this.formMe.gt * this.formMe.traTruoc
      },
      MoneyCocChu01 () {
        return this.MoneyThue * this.formMe.cocChu
      },
      MoneyCocChu02 () {
        return this.formMe.gt * this.formMe.cocChu
      },
      MoneyBanDau01 () {
        return (this.MoneyThue * this.formMe.cocChu) + (this.MoneyThue * this.formMe.traTruoc)
      },
      MoneyBanDau02 () {
        return (this.formMe.gt * this.formMe.cocChu) + (this.formMe.gt * this.formMe.traTruoc)
      },
      MoneyCocKhach () {
        return this.MoneyDanhThu
      },
      MoneyLoiRong01 () {
        return this.MoneyDanhThu - this.MoneyThue
      },
      MoneyLoiRong02 () {
        return this.MoneyDanhThu - this.formMe.gt
      },
      MoneyTong01 () {
        return this.MoneyBanDau01 - this.MoneyDanhThu - this.MoneyCocKhach
      },
      MoneyTong02 () {
        return this.MoneyBanDau02 - this.MoneyDanhThu - this.MoneyCocKhach
      },
      MoneyTyRong01 () {
        return (this.MoneyLoiRong01 / this.MoneyTong01) * 100
      },
      MoneyTyRong02 () {
        return (this.MoneyLoiRong02 / this.MoneyTong02) * 100
      },
      MoneyHoa01 () {
        return this.MoneyTong01 / this.MoneyLoiRong01
      },
      MoneyHoa02 () {
        return this.MoneyTong02 / this.MoneyLoiRong02
      },
      MoneyLoiBanDau01 () {
        return (this.MoneyLoiRong01 / this.MoneyBanDau01) * 100
      },
      MoneyLoiBanDau02 () {
        return (this.MoneyLoiRong02 / this.MoneyBanDau02) * 100
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
        // console.log('data', data)
        this.fields = _.merge(this.fields, data)
        // console.log('this.fields', this.fields)
      }
    },
    filters: {
      formatMoney: (value) => {
        return Number(value).toLocaleString()
      },
      formatMoneyNew: (value) => {
        return Number(value).toFixed(2)
      },
    },
    methods: {
      ...mapActions('dashboard', ['postForm']),
      handleSubmit (e) {
        e.preventDefault()
        if (undefined === this.form.getFieldValue('cocChu')) {
          this.form.setFieldsValue({
            cocChu: '3',
          })
        }
        if (undefined === this.form.getFieldValue('traTruoc')) {
          this.form.setFieldsValue({
            traTruoc: '1',
          })
        }
        if (undefined === this.form.getFieldValue('mb')) {
          this.form.setFieldsValue({
            mb: 0,
          })
        }
        if (undefined === this.form.getFieldValue('soPhong')) {
          this.form.setFieldsValue({
            soPhong: 0,
          })
        }
        if (undefined === this.form.getFieldValue('tienTb')) {
          this.form.setFieldsValue({
            tienTb: 0,
          })
        }
        if (undefined === this.form.getFieldValue('money')) {
          this.form.setFieldsValue({
            money: [],
          })
        }
        this.form.validateFields((err, values) => {
          if (!err) {
            this.postForm(values)
          }
        })
      },
      callback (key) {
        if (key === 1) {
          this.form.setFieldsValue({
            money: [],
          })
        }
        if (key === 2) {
          this.form.setFieldsValue({
            soPhong: 0,
            tienTb: 0
          })
        }
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
