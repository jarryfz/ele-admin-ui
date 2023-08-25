<template>
  <div class="ele-tree">
    <el-select
      ref="eleSelectTreeRef"
      style="width: 100%;"
      :value="value"
    >
      <el-option :label="optionData.label" :value="optionData.value" >
        <el-tree
          ref="eleTreeRef"
          :data="$attrs.data"
          :show-checkbox="$attrs.showCheckbox"
          :node-key="$attrs.nodeKey || 'id'"
          :default-expanded-keys="$attrs.defaultExpandedKeys"
          :default-checked-keys="$attrs.defaultCheckedKeys"
          :props="defaultProps"
          v-bind="$attrs.props"
          @node-click="handleNodeClick"
        >
        </el-tree>
      </el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  name: "EleSelectTree",
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    defaultProps: {
      type: Object,
      default: () => ({
        children: "children",
        label: "label"
      })
    },
  },
  data() {
    return {
      optionData: {
        label: "",
        value: ""
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      if (this.multiple) {
        return
      }
      console.log(data)
      this.$emit("input", data[this.$attrs.nodeKey || "id"])
      this.$refs.eleSelectTreeRef.visible = false
    },
  }
}
</script>
<style lang="scss" scoped>
::v-deep.el-select-dropdown__item{
  height: 200px;
  overflow-y: auto;
  background: #fff;
}
</style>