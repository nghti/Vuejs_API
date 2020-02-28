<template>
  <div class="main">
    <div class="logo">
      <img src="../../assets/images/logo.png" alt="">
    </div>
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit.prevent="handleSubmit"
    >
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="メールアドレス / ニックネーム"
          v-decorator="[
                'username',
                {rules: [{ required: true, message:'メールアドレスを入力してください。' }], validateTrigger: 'change'}
              ]"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="password"
          autocomplete="false"
          placeholder="パスワード"
          v-decorator="[
                'password',
                {rules: [{ required: true, message: 'パスワードを入力してください。' }], validateTrigger: 'change'}
              ]"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
        >ログイン
        </a-button>
      </a-form-item>
    </a-form>
    <div>
      <h2 @click="handleToggle">tieu de</h2>
      <p v-show="toggle">noi dung toggle</p>
    </div>
    {{lists}}<br/>
    {{users}}
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    data () {
      return {
        form: this.$form.createForm(this),
        toggle: true,
      }
    },
    created () {
      this.getUsers()
    },
    mounted () {

    },
    computed: {
      ...mapState('dashboard', ['users']),
      lists () {
        return this.toggle
      }
    },
    methods: {
      ...mapActions('dashboard', ['getUsers']),
      ...mapActions('auth', ['login']),
      handleToggle () {
        this.toggle = !this.toggle
      },
      handleSubmit () {
        this.form.validateFields((err, values) => {
          if (!err) {
            this.login(values)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .logo {
    margin: 0 auto;
    text-align: center;

    img {
      height: 115px;
    }

    p {
      color: #95A7B7;
      font-size: 18px;
    }
  }

  .main {
    width: 100%;
    min-height: 100%;
    background: #f0f2f5 url(../../assets/images/background.svg) no-repeat 50%;
    background-size: 100%;
    padding: 110px 0 144px;
    position: relative;
  }

  .user-layout-login {
    margin: 0 auto;
    width: 350px;

    label {
      font-size: 14px;
    }

    button.login-button {
      padding: 0 15px;
      font-size: 16px;
      height: 40px;
      width: 100%;
    }
  }
</style>
