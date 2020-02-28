<template>
  <a-form class="form-search" layout="inline" :form="form" @submit="handleSubmit">
    <a-form-item>
      <a-input-search placeholder="Tìm sản phẩm mong muốn ..." style="width: 250px" @search="onSearch" />
    </a-form-item>
    <a-form-item>
      <a-select defaultValue="Tất cả" style="width: 120px" @change="handleChange">
        <a-select-option value="jack">Jack</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
        <a-select-option value="Yiminghe">yiminghe</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item>
      <a-select defaultValue="Tất cả" style="width: 120px" @change="handleChange">
        <a-select-option value="jack">Jack</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
        <a-select-option value="Yiminghe">yiminghe</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item>
      <a-select defaultValue="Tất cả" style="width: 120px" @change="handleChange">
        <a-select-option value="jack">Jack</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
        <a-select-option value="Yiminghe">yiminghe</a-select-option>
      </a-select>
    </a-form-item>
  </a-form>
</template>

<script>
  export default {
    name: 'LayoutHeader',
    data () {
      return {
        form: this.$form.createForm(this, { name: 'horizontal_login' }),
      }
    },
    methods: {
      onSearch (value) {
        console.log(value)
      },
      handleChange (value) {
        console.log(`selected ${value}`)
      },
      handleSubmit (e) {
        console.log(('log'))
      },
    }
  }
</script>
