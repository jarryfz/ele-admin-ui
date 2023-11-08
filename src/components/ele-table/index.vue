<template>
  <div class="ele-table">
    <ele-form :form-items="formItems" :is-search="true" :inline="true"></ele-form>
    <el-table
      ref="eleTableRef"
      v-on="$listeners"
      :row-key="rowKey"
      v-bind="$attrs"
    >
      <!-- 展开行 -->
      <el-table-column v-if="expand" type="expand">
        <template slot-scope="scope">
          <table-render :render="expandRender" :row="scope.row" :index="scope.$index"></table-render>
        </template>
      </el-table-column>
      <!-- 多选 -->
      <el-table-column
        v-if="multipleSelect"
        type="selection"
        width="55"
        :fixed="$attrs.multipleSelectFixed"
        :align="$attrs.align || 'center'"
        :selectable="selectable"
        :reserve-selection="reserveSelection"
      />
      <!-- 单选 -->
      <el-table-column
        v-if="radio"
        width="55"
        :fixed="$attrs.radioFixed"
        :align="$attrs.align || 'center'"
      >
        <template slot-scope="scope">
          <el-radio
            v-model="radioValue"
            :label="scope.$index"
            @change="radioChange(scope.row, scope.$index)"
          >
            <i>&nbsp;</i>
          </el-radio>
        </template>
      </el-table-column>
      <!-- 序号 -->
      <el-table-column
        v-if="index"
        :fixed="$attrs.indexFixed"
        type="index"
        width="55"
        label="序号"
        :align="$attrs.align || 'center'"
      />
      <!-- 普通列，适用于大多数情况，包含递归，用于多级表头 -->
      <table-column :columns="tableConfigOption.columns" :align="$attrs.align" />
    </el-table>
    <el-pagination
      class="ele-pagination"
      v-if="pagination"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="defaultParams.page"
      :page-sizes="[10, 20, 30, 50, 100, 200]"
      :page-size="defaultParams.limit"
      layout="prev, pager, next, jumper, total, sizes"
      :total="tableConfigOption.total"
    >
    </el-pagination>
  </div>
</template>
<script>
import TableRender from "../render.vue"
import tableColumn from "./table-column.jsx"
import EleForm from "../ele-form/index.vue"
import fixedHeader from "./fixedHeader.js"
import mixin from "./index.js"
export default {
  name: "EleTable",
  inheritAttrs: false,
  components: {
    TableRender,
    tableColumn,
    EleForm
  },
  mixins: [fixedHeader],
  // mixins: [mixin],
  props: {
    formItems: {
      type: Array,
      default: () => ([])
    },
    // 是否多选
    multipleSelect: {
      type: Boolean,
      default: false
    },
    // 是否单选
    radio: {
      type: Boolean,
      default: false
    },
    // 是否显示序号
    index: {
      type: Boolean,
      default: false
    },
    // 是否展开行
    expand: {
      type: Boolean,
      default: false
    },
    defaultParams: {
      type: Object,
      default: () => ({
        page: 1,
        limit: 10,
      })
    },
    // 展开行render
    expandRender: {
      type: Function,
      default: () => ({})
    },
    // 配置
    tableConfigOption: {
      type: Object,
      default: () => ({
        total: 0,
        columns: []
      })
    },
    // 这一行的 CheckBox 是否可以勾选
    selectable: {
      type: [Function, String],
      default: () => () => {
        return true
      }
    },
    // 数据更新之后是否保留之前选中的数据
    reserveSelection: {
      type: Boolean,
      default: false
    },
    // 行数据的key，使用 reserve-selection 功能与显示树形数据时，该属性是必填的
    rowKey: {
      type: [Function, String],
      default: (row) => row.id
    },
    // 是否分页
    pagination: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      radioValue: "",
      parent: "ele-table"
    }
  },
  methods: {
    // 单选change事件
    radioChange(row, index) {
      this.$emit("handle-radio-change", row, index)
    },
    handleSizeChange(val) {
      this.$emit("handle-size-change", val)
    },
    handleCurrentChange(val) {
      this.$emit("handle-current-change", val)
    }
  }
}
</script>
<style lang="scss" scoped>
.ele-pagination {
  margin: 20px 0;
}
</style>