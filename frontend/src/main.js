import Vue from 'vue'
import App from './views/App'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import i18n from './locales/i18n'
import router from './routes'
import store from './store'
import './assets/scss/main.scss'

class Main {
  static baseConfig = () => {
    Vue.use(Antd)
    Vue.config.productionTip = false
  }

  static renderApp = () => {
    new Vue({
      i18n,
      router,
      store,
      render: h => h(App),
    }).$mount('#app')
  }

  static run () {
    Main.baseConfig()
    Main.renderApp()
  }
}

Main.run()
