<template>
  <div class="ele-tree">
    <el-select
      ref="eleSelectTreeRef"
      style="width: 100%;"
      :value="value"
      multiple
      :collapse-tags="$attrs.collapseTags"
      @remove-tag="handleRemoveTag"
    >
      <el-option :label="optionData.label" :value="optionData.value">
        <el-tree
          ref="eleTreeRef"
          :data="$attrs.data"
          :show-checkbox="$attrs.radio ? false : $attrs.showCheckbox"
          :node-key="$attrs.nodeKey || 'id'"
          :default-expanded-keys="$attrs.defaultExpandedKeys"
          :default-checked-keys="$attrs.defaultCheckedKeys"
          :props="defaultProps"
          v-bind="$attrs.props"
          @node-click="handleNodeClick"
          @check-change="handleCheckChange"
        >
          <span slot-scope="{ node, data }">
            <el-radio v-model="list" v-if="$attrs.radio" :label="data.id" @input="handleRadioChange(data)">{{node.label}}</el-radio>
            <span v-else>{{ node.label }}</span>
          </span>
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
    // value: {
    //   type: [String, Number],
    //   default: ""
    // },
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
      value: "",
      list: [],
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
    handleCheckChange(data, checked, childChecked) {
      console.log(data, checked, childChecked)
      const checkeNodes = this.$refs.eleTreeRef.getCheckedNodes(true),
       checkedKeys = this.$refs.eleTreeRef.getCheckedKeys(true);
      this.value = checkeNodes.map(item => item.label);
      this.list = checkeNodes;
      this.$emit("checkChange", checkeNodes, checkedKeys);
    },
    handleRadioChange(obj) {
      this.value = [obj.label]
      this.list = obj.id
    },
    handleRemoveTag(tag) {
      const obj = this.list.find(item => item.label === tag);
      this.$refs.eleTreeRef.setChecked(obj, false, true);
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep.el-select-dropdown__item{
  height: auto;
  max-height: 300px;
  background: #fff;
}
// ::v-deep.el-select {
//   .el-select__tags {
//     flex-wrap: nowrap;
//     overflow: hidden;
//   }
// }
</style>