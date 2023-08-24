<template>
  <div class="ele-table">
    <el-table
      ref="eleTableRef"
      v-bind="$attrs"
      v-on="$listeners"
      :row-key="rowKey"
      :row-class-name="rowClassName"
      :row-style="rowStyle"
      :cell-class-name="cellClassName"
      :cell-style="cellStyle"
      :header-row-class-name="headerRowClassName"
      :header-row-style="headerRowStyle"
      :header-cell-class-name="headerCellClassName"
      :header-cell-style="headerCellStyle"
      :summary-method="summaryMethod"
      :load="load"
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
      <table-column :columns="columns" :align="$attrs.align" />
    </el-table>
  </div>
</template>
<script>
import TableRender from "./render.vue"
import tableColumn from "./table-column.jsx"
export default {
  name: "EleTable",
  inheritAttrs: false,
  components: {
    TableRender,
    tableColumn
  },
  props: {
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
    // 展开行render
    expandRender: {
      type: Function,
      default: () => ({})
    },
    // 列配置
    columns: {
      type: Array,
      default: () => ([])
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
    // 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。
    rowStyle: {
      type: [Function, Object],
      default: () => ""
    },
    // 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。
    rowClassName: {
      type: [Function, String],
      default: () => ""
    },
    // 单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。
    cellClassName: {
      type: [Function, String],
      default: () => ""
    },
    // 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。
    cellStyle: {
      type: [Function, Object],
      default: () => ""
    },
    // 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
    headerRowClassName: {
      type: [Function, String],
      default: () => ""
    },
    // 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。
    headerRowStyle: {
      type: [Function, Object],
      default: () => ""
    },
    // 表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className
    headerCellClassName: {
      type: [Function, String],
      default: () => ""
    },
    // 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。
    headerCellStyle: {
      type: [Function, Object],
      default: () => ""
    },
    // 合并行或列的计算方法
    summaryMethod: {
      type: Function,
      default: () => ({})
    },
    // 加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息
    load: {
      type: Function,
      default: () => ({})
    },
  },
  data() {
    return {
      radioValue: ""
    }
  },
  methods: {
    // 单选change事件
    radioChange(row, index) {
      this.$emit("handle-radio-change", row, index)
    },
    // 当用户手动勾选数据行的 Checkbox 时触发的事件
    select(selection, row) {
      this.$emit("select", selection, row)
    },
    // 当用户手动勾选全选 Checkbox 时触发的事件
    selectAll(selection) {
      this.$emit("selectAll", selection)
    },
    // 当选择项发生变化时会触发该事件
    selectionChange(selection) {
      this.$emit("selection-change", selection)
    },
    // 当单元格 hover 进入时会触发该事件
    cellMouseEnter(row, column, cell, event) {
      this.$emit("cell-mouse-enter", row, column, cell, event)
    },
    // 当单元格 hover 退出时会触发该事件
    cellMouseLeave(row, column, cell, event) {
      this.$emit("cell-mouse-leave", row, column, cell, event)
    },
    // 当某个单元格被点击时会触发该事件
    cellClick(row, column, cell, event) {
      this.$emit("cell-click", row, column, cell, event)
    },
    // 当某个单元格被双击击时会触发该事件
    cellDblclick(row, column, cell, event) {
      this.$emit("cell-dblclick", row, column, cell, event)
    },
    // 当某一行被点击时会触发该事件
    rowClick(row, column, event) {
      this.$emit("row-click", row, column, event)
    },
    // 当某一行被鼠标右键点击时会触发该事件
    rowContextmenu(row, column, event) {
      this.$emit("row-contextmenu", row, column, event)
    },
    // 当某一行被双击时会触发该事件
    rowDblclick(row, column, event) {
      this.$emit("row-dblclick", row, column, event)
    },
    // 当某一列的表头被点击时会触发该事件
    headerClick(column, event) {
      this.$emit("header-click", column, event)
    },
    // 当某一列的表头被鼠标右键点击时触发该事件
    headerContextmenu(column, event) {
      this.$emit("header-contextmenu", column, event)
    },
    // 当表格的排序条件发生变化的时候会触发该事件
    sortChange({column, prop, order}) {
      this.$emit("sort-change", {column, prop, order})
    },
    // 当表格的筛选条件发生变化的时候会触发该事件，参数的值是一个对象，对象的 key 是 column 的 columnKey，对应的 value 为用户选择的筛选条件的数组。
    filterChange(filters) {
      this.$emit("filter-change", filters)
    },
    // 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性
    currentChange(currentRow, oldCurrentRow) {
      this.$emit("current-change", currentRow, oldCurrentRow)
    },
    // 当拖动表头改变了列的宽度的时候会触发该事件
    headerDragend(newWidth, oldWidth, column, event) {
      this.$emit("header-dragend", newWidth, oldWidth, column, event)
    },
    // 当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded
    expandChange(row, expandedRows) {
      this.$emit("expand-change", row, expandedRows)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>