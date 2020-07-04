<template>
  <div class="user">
    <!-- 头像框 -->
    <div class="static" @click="$router.push('/editdata')">
      <!-- 左边 -->
      <div class="le">
        <img :src="$axios.defaults.baseURL + userdata.head_img" />
      </div>
      <!-- 中间 -->
      <div class="cen">
        <div>
          <span v-if="userdata.gender === 1" class="iconfont iconxingbienan"></span>
          <span v-else class="iconfont iconxingbienv"></span>
          <span>{{ userdata.nickname }}</span>
        </div>
        <div class="time">{{ userdata.create_date | time }}</div>
      </div>
      <!-- 右边 -->
      <div class="ri">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <!-- 链接跳转区 -->
    <div class="links">
      <navbar>
        <template>我的关注</template>
        <template #focus>关注的用户</template>
      </navbar>
      <navbar>
        <template>我的跟帖</template>
        <template #focus>跟帖/回复</template>
      </navbar>
      <navbar>
        <template>我的收藏</template>
        <template #focus>文章/视频</template>
      </navbar>
      <navbar @click="$router.push('/editdata')">
        <template>设置</template>
      </navbar>
    </div>
  </div>
</template>

<script>
// import logoLVue from '../components/login/logo-l.vue'
export default {
  props: {},
  data() {
    return {
      userdata: ''
    }
  },
  components: {},
  async created() {
    const id = localStorage.getItem('userid')
    const res = await this.$axios.get(`/user/${id}`)
    const { statusCode, message } = res.data
    if (statusCode === 200) {
      this.userdata = res.data.data
      this.$toast.success(message)
    }
  }
}
</script>

<style scoped lang="less">
.user {
  background-color: #f2f2f2;
  height: 1000px;
  .static {
    display: flex;
    height: 130px;
    padding: 0 20px;
    border-bottom: 5px solid #e0e0e0;
    // justify-content: center;
    align-items: center;
    .le {
      width: 70px;
      img {
        display: block;
        height: 70px;
        width: 70px;
        background-color: pink;
        border-radius: 50%;
      }
    }
    .cen {
      flex: 1;
      padding-left: 10px;
      font-size: 14px;
      .iconxingbienan {
        color: #6eb1e1;
      }
      .iconxingbienv {
        color: #f937c1;
      }
      .time {
        color: #a0a0a0;
        margin-top: 10px;
      }
    }
  }
  .links {
    padding-left: 20px;
  }
}
</style>
