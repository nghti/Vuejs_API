import toastr from 'toastr'

const options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  preventDuplicates: true,
  onclick: null,
  hideDuration: 0,
  showDuration: 300,
  timeOut: 5000,
  extendedTimeOut: 1000,
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
  tapToDismiss: false,
}

let success = (msg) => {
  toastr.clear()
  toastr.options = options
  return toastr['success'](msg, '成功')
}

let error = (msg) => {
  toastr.clear()
  toastr.options = options
  return toastr['error'](msg, 'エラー')
}

let warning = (msg) => {
  toastr.clear()
  toastr.options = options
  return toastr['warning'](msg, '警告')
}

export { success, error, warning }
