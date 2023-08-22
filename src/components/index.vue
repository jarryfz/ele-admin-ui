<template>
  <div class="color">
    <div class="color1">
      {{ msg }}
    </div>
    {{ msg }}
  </div>
</template>
<script>
export default {
  name: "EleAdmin",
  data() {
    return {
      msg: "hello rollup"
    }
  }
}
</script>
<style lang="scss" scoped>
.color {
  background: #FFFFFF;
  .color1 {
    color: aqua;
  }
}
</style>
