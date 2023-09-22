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
        v-for="item in formItems"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :label-width="item.labelWidth"
        :required="item.required || false"
        :rules="item.rules"
        :error="item.error"
        :show-message="item.showMessage || true"
        :inline-message="item.inlineMessage || false"
        :size="item.size"
      >
        <template>
          <slot></slot>
        </template>
        <template #label>
          <slot name="label"></slot>
        </template>

        <!-- 单选框 -->
        <el-radio-group
          v-if="item.type === 'radio'"
          v-model="formData[item.prop]"
          v-bind="item.radio"
          @input="item.radio.onInput"
        >
          <template v-if="item.radio.isButton">
            <el-radio-button
            v-for="(radio, i) in item.radio.list"
              :key="i"
              v-bind="radio"
              @input="radio.onInput"
            ></el-radio-button>
          </template>
          <template v-else>
            <el-radio
              v-for="(radio, i) in item.radio.list"
              :key="i"
              v-bind="radio"
              @input="radio.onInput"
            ></el-radio>
          </template>
        </el-radio-group>

        <!-- 多选框 -->
        <el-checkbox-group
          v-else-if="item.type === 'checkbox'"
          v-model="formData[item.prop]"
          v-bind="item.checkbox"
          @change="item.checkbox.change"
        >
          <template v-if="item.checkbox.isButton">
            <el-checkbox-button
              v-for="(checkbox, i) in item.checkbox.list"
              :key="i"
              v-bind="checkbox"
            >{{checkbox.name}}</el-checkbox-button>
          </template>
          <template v-else>
            <el-checkbox
              v-for="(checkbox, i) in item.checkbox.list"
              :key="i"
              v-bind="checkbox"
            ></el-checkbox>
          </template>
        </el-checkbox-group>

        <!-- 输入框 -->
        <el-input
          v-else-if="item.type === 'input'"
          v-bind="item.input"
          v-model="formData[item.prop]"
          @focus="item.input.onFocus && item.input.onFocus"
          @blur="item.input.onBlur && item.input.onBlur"
          @select="item.input.onSelect && item.input.onSelect"
        >
          <!-- input slot 输入框头部内容 -->
          <template #prefix><slot name="inputPrefix" /></template>
          <!-- input slot 输入框尾部内容 -->
          <template #suffix><slot name="inputSuffix" /></template>
          <!-- input slot 输入框前置内容 -->
          <template #preepend><slot name="inputPrepend" /></template>
          <!-- input slot 输入框后置内容 -->
          <template #append><slot name="inputAppend" /></template>
        </el-input>

        <!-- 待输入建议 -->
        <el-autocomplete
          v-if="item.type === 'autocomplete'"
          v-model.trim="formData[item.prop]"
          v-bind="item.autocomplete"
          @select="item.autocomplete.onSelect && item.autocomplete.onSelect"
          @change="item.autocomplete.onChange && item.autocomplete.onChange"
        >
          <!-- autocomplete slot 输入框头部内容 -->
          <template #prefix><slot name="autocompletePrefix" /></template>
          <!-- autocomplete slot 输入框尾部内容 -->
          <template #suffix><slot name="autocompleteSuffix" /></template>
          <!-- autocomplete slot 输入框前置内容 -->
          <template #preepend><slot name="autocompletePrepend" /></template>
          <!-- autocomplete slot 输入框后置内容 -->
          <template #append><slot name="autocompleteAppend" /></template>
        </el-autocomplete>

        <!-- 联级选择器 -->
        <el-cascader
          style="width: 100%;"
          v-else-if="item.type === 'cascader'"
          v-model="formData[item.prop]"
          v-bind="item.cascader"
          @change="item.cascader.onChange && item.cascader.onChange"
          @expand-change="item.cascader.onExpandChange && item.cascader.onExpandChange"
          @blur="item.cascader.onBlur && item.cascader.onBlur"
          @focus="item.cascader.onFocus && item.cascader.onFocus"
          @visible-change="item.cascader.onVisibleChange && item.cascader.onVisibleChange"
          @remove-tag="item.cascader.onRemoveTag && item.cascader.onRemoveTag"
        >
          <template #default="{node, data}">
            <slot name="defaultSlotCascader" :node="node" :data="data" />
          </template>
        </el-cascader>

        <!-- 日期选择器 -->
        <el-date-picker
          style="width: 100%;"
          v-else-if="item.type === 'datePicker'"
          v-model="formData[item.prop]"
          v-bind="item.datePicker"
          @change="item.datePicker.onChange && item.datePicker.onChange"
          @blur="item.datePicker.onBlur && item.datePicker.onBlur"
          @focus="item.datePicker.onFocus && item.datePicker.onFocus"
        >
        </el-date-picker>
        <!-- 选择器 -->
        <el-select
          style="width: 100%;"
          v-else-if="item.type === 'select'"
          v-model="formData[item.prop]"
          v-bind="item.select"
          @change="item.select.onChange && item.select.onChange"
          @visible-change="item.select.onVisibleChange && item.select.onVisibleChange"
          @remove-tag="item.select.onRemoveTag && item.select.onRemoveTag"
          @clear="item.select.onClear && item.select.onClear"
          @blur="item.select.onBlur && item.select.onBlur"
          @focus="item.select.onFocus && item.select.onFocus"
        >
          <template #prefix><slot name="selectPrefix"></slot></template>
          <template #empty><slot name="selectEmpty"></slot></template>
          <el-option
            v-for="option in item.select.options"
            :key="option.label"
            :label="option.label"
            :value="option.value"
            :disabled="isDisabled(option.disabled)"
          />
        </el-select>
        <!-- 下拉树选择 -->
        <select-tree
          v-if="item.type === 'selectTree'"
          v-bind="item.selectTree"
        ></select-tree>
      </el-form-item>
      <!-- 操作按钮 -->
      <el-form-item v-if="isSubmit">
        <el-button type="default" :size="$attrs.btnSize">取消</el-button>
        <el-button type="primary" :size="$attrs.btnSize">提交</el-button>
      </el-form-item>
      <el-form-item v-if="isSearch">
        <el-button type="primary" :size="$attrs.btnSize">搜索</el-button>
        <el-button type="default" :size="$attrs.btnSize">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import selectTree from "../ele-select-tree/index.vue";
export default {
  name: "EleForm",
  inheritAttrs: false,
  components: {
    selectTree
  },
  props: {
    rules: {
      type: Object,
      default: () => ({})
    },
    formItems: {
      type: Array,
      default: () => ([])
    },
    isSubmit: Boolean,
    isSearch: Boolean,
  },
  data() {
    const formData = this.formItems.reduce((data, item) => {
      data[item.prop] = item.defaultValue || "";
      return data;
    }, {});
    return {
      formData
    }
  },
  mounted() {
    console.log(this.$attrs);
  },
  methods: {
    inputType(type) {
      return type ?? "text"
    },
    isClearable(type) {
      return type ?? true
    },
    isDisabled(type) {
      return type ?? false
    }
  }
}
</script>
<style lang="scss" scoped>
</style>