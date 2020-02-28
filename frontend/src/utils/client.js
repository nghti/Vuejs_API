import Request from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Helpers from './helpers'
import store from '../store'

NProgress.configure({ showSpinner: false })

const calculatePercentage = (loaded, total) => (Math.floor(loaded * 1.0) / total)

const client = () => {
  Request.defaults.baseURL = Helpers.getBaseApiUrl()
  const token = Helpers.getToken()

  const headersDefault = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }

  const defaultOptions = token ? {
    headers: {
      Authorization: `Bearer ${token}`,
      ...headersDefault
    }
  } : {
    headers: {
      ...headersDefault
    }
  }

  Request.defaults.onDownloadProgress = (e) => {
    const percentage = calculatePercentage(e.loaded, e.total)

    NProgress.set(percentage)
  }

  // Add a Request
  Request.interceptors.request.use(
    (config) => {
      NProgress.start()
      store.dispatch('app/setLoading', true)

      return config
    },
    error => Promise.reject(error)
  )

  // Add a response.
  Request.interceptors.response.use(
    (response) => {
      NProgress.done()
      store.dispatch('app/setLoading', false)

      return response
    },
    (error) => {
      NProgress.done()
      store.dispatch('app/setLoading', false)

      return Promise.reject(error)
    }
  )

  return {
    get: (url, options = {}) => Request.get(url, {
      ...defaultOptions, ...options
    }),
    post: (url, data, options = {}) => Request.post(url, data, {
      ...defaultOptions, ...options
    }),
    put: (url, data, options = {}) => Request.put(url, data, {
      ...defaultOptions, ...options
    }),
    patch: (url, data, options = {}) => Request.patch(url, data, {
      ...defaultOptions, ...options
    }),
    delete: (url, options = {}) => Request.delete(url, {
      ...defaultOptions, ...options
    })
  }
}

export default client
