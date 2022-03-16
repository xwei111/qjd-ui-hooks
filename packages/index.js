import Theme from './theme'
import Icon from './icon'

const version = require('../package.json').version

const components = {
  Theme,
  Icon,
}

const install = function (Vue) {
  if (install.installed) return
  Object.keys(components).forEach(key => {
    Vue.component(components[key].name, components[key])
  })
  // Vue.prototype.$message = Message
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const API = {
  version,
  install,
  ...components
}

// export default API
module.exports = API