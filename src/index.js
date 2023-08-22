import ElAdmin from "./components/index.vue"

const components = [
  ElAdmin
],

 install = (Vue) => {
  components.forEach(component => {
    component.name && Vue.component(component.name, component)
  })
}

export default {
  install
}