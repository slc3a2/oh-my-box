import FlyBox from './fly-box'
import FlyBoxItem from './fly-box-item'
 
const components = [
  FlyBox,
  FlyBoxItem
]
 
const install = function (Vue) {
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
 
export default{
  install,
  FlyBox,
  FlyBoxItem
}