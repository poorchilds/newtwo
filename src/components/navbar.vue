<template>
  <!-- user中用到的跳转导航条 -->
  <div class="bar" @click="fnclick">
    <!-- 左侧 -->
    <div class="le">
      <slot></slot>
    </div>
    <!-- 中间 -->
    <div class="cen">
      <slot name="focus"></slot>
    </div>
    <!-- 右侧 -->
    <div class="ri">
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {}
  },
  methods: {
    fnclick() {
      this.$emit('click')
    }
  },
  components: {},
  created() {}
}
</script>

<style scoped lang='less'>
.bar {
  height: 50px;
  font-size: 14px;
  line-height: 50px;
  display: flex;
  border-bottom: 1px solid #ccc;
  .cen {
    flex: 1;
    text-align: right;
    color: #a0a0a0;
    padding-right: 10px;
  }
  .ri {
    padding-right: 15px;
    color: #a0a0a0;
  }
}
</style>
