import tableRender from '../render.vue'
export default {
  functional: true,
  components: {
    tableRender
  },
  render(h, context) {
    const { props } = context
    return (
      props.columns.map((item, index) => (
        <el-table-column
          label={item.label}
          prop={item.prop}
          width={item.width}
          minWidth={item.minWidth}
          column-key={item.columnKey}
          align={props.align || 'center'}
          sortable={item.sortable}
          show-overflow-tooltip={item.showOverflowTooltip}
          fixed={item.fixed}
          formatter={item.formatter}
          class={item.className}
          render-header={item.renderHeader}
          sort-method={item.sortMethod}
          sort-by={item.sortBy}
          sort-orders={item.sortOrders}
          resizable={item.resizable}
          header-align={item.headerAlign}
          label-class-name={item.labelClassName}
          filters={item.filters}
          filter-placement={item.filterPlacement}
          filter-multiple={item.filterMultiple}
          filter-method={item.filterMethod}
          filtered-value={item.filteredValue}
          scopedSlots={{
            default: (scope) => {
              const { $index, row } = scope;
              return (
                <div>
                  {/* 页面slot */}
                  {item.slot && (<slot name={item.prop} data={row} />)}
                  {/* render */}
                  {item.render && (
                    <table-render render={item.render} row={row} index={$index} />
                  )}
                  {/*  图片 */}
                  {item.image && (
                    <el-image
                      style={item.style || { width: "60px", height: "60px" }}
                      src={row[item.prop]}
                      fit={item.fit || "fill"}
                      preview-src-list={[row[item.prop]]}
                    />
                  )}
                  {/* 操作栏 */}
                  {item.btns && (
                    item.btns.map((btn) => {
                      {btn.render ? (
                        <table-render render={btn.render} row={row} index={$index} />
                      ) : (
                        <el-button
                          v-if={btn.show === undefined ? true : btn.show}
                          type={btn.type}
                          icon={btn.icon}
                          size={btn.size ? item.size : "small"}
                          disabled={btn.isDisabled
                            ? btn.isDisabled(row, $index)
                            : false
                          }
                          onclick={() => btn.onClick(row,$index)}
                        >
                          {btn.name}
                        </el-button>
                      )}
                    })
                  )}
                  {/* 正常显示数据 */}
                  {!item.slot && !item.render && !item.image && !item.btns && (
                    row[item.prop]
                  )}
                </div>
              )
            }
          }}
        >
          {item.children && item.children.length > 0 && (
            <table-column columns={item.children}></table-column>
          )}
        </el-table-column>
      ))
    )
  }
}