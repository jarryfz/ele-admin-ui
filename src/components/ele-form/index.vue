<template>
  <div class="ele-form">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      v-bind="$attrs"
      v-on="$listeners"
      @submit.native.prevent
    >
      <el-form-item
        v-for="(item,index) in formItems"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :label-width="item.labelWidth"
        :required="item.required"
        :rules="item.rules"
        :error="item.error"
        :show-message="item.showMessage"
        :inline-message="item.inlineMessage"
        :size="item.size"
      >
        <slot></slot>
        <slot name="label"></slot>
        <el-input
          v-if="item.type === 'inputSelect'"
          :placeholder="item.placeholder"
          v-model.trim="formData[item.prop_name]"
          :readonly="item.readonly"
          clearable
          class="input-with-select">
          <el-button type="text" icon="el-icon-circle-close" slot="suffix" v-if="formData[item.prop_name]"
            @click="item.onClose($event, formData)" class="btn-clearable" />
          <el-button slot="append" icon="el-icon-search" @click="item.onClick($event, formData)"></el-button>
          <el-input
            v-show="false"
            v-model="formData[item.prop]"
          />
        </el-input>
        <el-input
          v-if="item.type === 'input'"
          v-model.trim="formData[item.prop]"
          :disabled="item.inputDisabled"
          :placeholder="item.placeholder"
          :show-password="item.showPassword"
          :clearable="item.clearable != undefined ? item.clearable : true"
        />
        <el-select
          v-else-if="item.type === 'select'"
          v-model="formData[item.prop]"
          filterable
          :clearable="item.clearable != undefined ? item.clearable : true"
          :placeholder="item.placeholder"
          @change="item.change && item.change($event, formData)"
        >
          <el-option
            v-for="(val, i) in item.options"
            :key="i"
            :label="val.label"
            :value="val.value"
          />
        </el-select>

      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "EleForm",
  inheritAttrs: false,
  props: {
    rules: {
      type: Object,
      default: () => ({})
    },
    formItems: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    const formData = this.formItems.reduce((data, item) => {
      data[item.prop] = item.defaultSelect || "";
      if (item.prop_name) {
        data[item.prop_name] = item.defaultSelectName || "";
      }
      return data;
    }, {});
    return {
      formData
    }
  }
}
</script>
<style lang="scss" scoped>
</style>