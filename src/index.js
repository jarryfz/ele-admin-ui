import ElAdmin from "./components/index.vue"
import EleTable from "./components/ele-table/index.vue"
const components = [
  ElAdmin,
  EleTable
],

 install = (Vue) => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default {
  install,
  EleTable
}