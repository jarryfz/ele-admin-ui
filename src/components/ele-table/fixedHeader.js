const rafThrottle = (fn) => {
  let locked = false;
  return function (...args) {
    if (locked) return;
    locked = true;
    window.requestAnimationFrame(_ => {
      fn.apply(this, args);
      locked = false;
    });
  };
}
export default {
  props: {
    parentClass: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      parentDom: null,
    }
  },
  mounted() {
    if (this.parentClass !== "") {
      this.parentDom = document.getElementsByClassName(this.parentClass)[0];
      console.log(this.parentDom.querySelector(".el-table__header-wrapper").getBoundingClientRect());
      this.clearListener();
      window.addEventListener("scroll", this.handleScroll);
      window.addEventListener("resize", this.handleResize);
    }
  },
  // 被 keep-alive 缓存的组件激活时调用
  activated() {},
  // 被 keep-alive 缓存的组件失活时调用
  deactivated() {},
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    // 滚动事件
    handleScroll: rafThrottle(function() {
      const tableDom = this.parentDom.querySelector(".el-table").getBoundingClientRect(),
       {top} = tableDom;
      let tableHeadDom = document.getElementsByClassName("el-table__header-wrapper")[0],
       tableBodyDom = document.getElementsByClassName("el-table__body-wrapper")?.[0],
       tableFixedBodyDom = document.getElementsByClassName("el-table__fixed-body-wrapper")[0],
       tableFixedHeaderDom = document.getElementsByClassName("el-table__fixed-header-wrapper")[0],
       tableFixedRightDom = document.getElementsByClassName("el-table__fixed-right")[0]
      if (top <= 0) {
        if (tableFixedBodyDom) {
          const style = {
            dom: tableFixedHeaderDom,
            scrollLeft: tableFixedHeaderDom.scrollWidth,
            width: getComputedStyle(tableFixedRightDom).width,
            left: tableFixedRightDom.getBoundingClientRect().left + "px"
          }
          this.setFixedStyle(style)
          tableFixedBodyDom.style.top = 0
        }
        tableHeadDom.style.position = "fixed";
        tableHeadDom.style.zIndex = "2000";
        tableHeadDom.style.top = 0 + "px"
        tableHeadDom.style.width = getComputedStyle(tableBodyDom).width
        tableHeadDom.style.overflow = "hidden"
      } else {
        this.clearStyle(tableHeadDom)
        if (tableFixedBodyDom) {
          tableFixedBodyDom.style.top = tableHeadDom.getBoundingClientRect().height + "px"
          this.clearStyle(tableFixedHeaderDom)
        }
      }
    }),

    // 窗口大小改变事件
    handleResize() {
      let timer = setTimeout(() => {
        let tableHeadDom = document.getElementsByClassName("el-table__header-wrapper")?.[0],
        tableBodyDom = document.getElementsByClassName("el-table__body-wrapper")?.[0],
        tableFixedBodyDom = document.getElementsByClassName("el-table__fixed-body-wrapper")?.[0],
        tableFixedHeaderDom = document.getElementsByClassName("el-table__fixed-header-wrapper")?.[0],
        tableFixedRightDom = document.getElementsByClassName("el-table__fixed-right")?.[0]
        tableHeadDom.style.width = getComputedStyle(tableBodyDom).width;
        tableHeadDom.style.left = tableBodyDom.getBoundingClientRect().left + "px";
        tableFixedHeaderDom.style.left = tableFixedRightDom.getBoundingClientRect().left + "px";
        tableFixedHeaderDom.scrollLeft = tableFixedHeaderDom.scrollWidth;
        tableFixedHeaderDom.style.width = getComputedStyle(tableFixedRightDom).width
        const tableDom = document.getElementsByClassName("el-table__header-wrapper")
        console.log(tableDom)
        for (let i = 0; i < tableDom.length; i++) {
          tableDom[i].style.width = getComputedStyle(tableBodyDom).width
        }
        clearTimeout(timer)
      }, 300)
    },
    getDom() {
      
    },
    setFixedStyle(data) {
      let {dom, scrollLeft, width, left} = data
      dom.style.zIndex = "2000"
      dom.style.position = "fixed"
      dom.style.top = "0"
      dom.scrollLeft = scrollLeft
      dom.style.width = width
      dom.style.overflow = "hidden"
      dom.style.left = left
    },
    clearStyle(dom) {
      dom.style.position = "static"
      dom.style.top = "0"
      dom.style.zIndex = "0"
    },
    clearListener() {
      window.removeEventListener("scroll", this.handleScroll)
      window.removeEventListener("resize", this.handleResize)
    }
  }
}