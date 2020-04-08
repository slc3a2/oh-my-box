import OhMyBox from './ohmybox'
import OhMyBoxItem from './ohmybox-item'
 
const components = [
  OhMyBox,
  OhMyBoxItem
]
 
const install = function (Vue) {
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
 
export {
  install,
  OhMyBox,
  OhMyBoxItem
}