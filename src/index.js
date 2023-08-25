import EleTable from "./components/ele-table/index.vue"
import EleForm from "./components/ele-form/index.vue"
import EleSelectTree from "./components/ele-select-tree/index.vue"
const components = [
  EleTable,
  EleForm,
  EleSelectTree
],

 install = (Vue) => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default {
  install,
  EleTable,
  EleForm,
  EleSelectTree
}