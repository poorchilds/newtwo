<template>
  <div class="login">
    <headl>
      <template v-slot:txt>title</template>
      <template v-slot:icon2>laal</template>
      <template v-slot:icon1>
        <span @click="toggle('/register')" class="iconfont iconjiantou2"></span>
      </template>
    </headl>
    <logol></logol>
    <van-form class="form-l" @submit="hsend">
      <van-field
        class="inp"
        v-model="username"
        placeholder="用户名"
        :rules="relusUsername"
      />
      <van-field
        class="inp"
        v-model="password"
        type="password"
        placeholder="密码"
        :rules="relusPassword"
      />
      <div style="margin-top: 50px;">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
    <togglel>
      <div class="toggle">
        未注册,去
        <span @click="toggle('/register')">注册</span>
      </div>
    </togglel>
  </div>
</template>

<script>
import headl from '../components/login/head-l.vue'
import logol from '../components/login/logo-l.vue'
import togglel from '../components/login/toggle-l.vue'
export default {
  props: {},
  data() {
    return {
      username: '',
      password: '',
      relusUsername: [
        { required: true, message: '请填写密码', trigger: 'onChange' },
        {
          pattern: /^\d{5,11}$/,
          message: '用户名必须是5-9位数字',
          trigger: 'onChange'
        }
      ],
      relusPassword: [
        { required: true, message: '请填写密码', trigger: 'onChange' },
        {
          pattern: /^\w{3,9}$/,
          message: '密码必须是3-9位',
          trigger: 'onChange'
        }
      ]
    }
  },
  methods: {
    toggle(value) {
      this.$router.push(value)
    },
    async hsend() {
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        localStorage.setItem('token', res.data.data.token)
        localStorage.setItem('userid', res.data.data.user.id)
        this.$router.push('/user')
      } else {
        this.$toast.fail(message)
      }
    }
  },
  components: {
    headl,
    logol,
    togglel
  },
  created() {
    const res = this.$route.params
    this.username = res.username
    this.password = res.password
  }
}
</script>

<style scoped lang="less">
.login {
  background-color: #f2f2f2;
  width: 100%;
  .form-l {
    margin: 0 auto;
    width: 330px;
  }
  .inp {
    background: #f2f2f2;
    font-size: 20px;
    border-bottom: 1px solid #000;
  }
  .toggle {
    margin-top: 20px;
    text-align: right;
    font-size: 16px;
    line-height: 30px;
    padding-right: 20px;
    span {
      margin-left: 15px;
      background-color: hotpink;
    }
  }
}
</style>
