import Vue from 'vue'
import VueI18n from 'vue-i18n'

import jaLocale from './ja'

Vue.use(VueI18n)

const messages = {
  ja: {
    ...jaLocale
  }
}

const DEFAULT_LOCALE = 'ja'

/**
 * Define I18n instance.
 *
 * @type {VueI18n}
 */
const i18n = new VueI18n({
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages,
  silentTranslationWarn: true
})

window.trans = (key, params = false) => {
  return i18n.t(key, params)
}

export default i18n
