<template>
  <div class="head-l">
    <div class="h-icon">
      <slot name="icon1"></slot>
    </div>
    <div class="title">
      <slot name="txt"></slot>
    </div>
    <div class="h-icon">
      <slot name="icon2"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {}
  },
  components: {},
  created() {}
}
</script>
<style scoped lang="less">
.head-l {
  height: 50px;
  display: flex;
  font-size: 20px;
  // text-align: center;
  .h-icon {
    text-align: center;
    line-height: 50px;
    height: 50px;
    width: 50px;
  }
  .title {
    text-align: center;
    line-height: 50px;
    flex: 1;
  }
}
</style>
