<template>
  <div class="editdata">
    <!-- title部分 -->
    <headtitle>
      <template v-slot:txt>编辑资料</template>
      <!-- <template v-slot:icon2></template> -->
      <template v-slot:icon1>
        <span class="iconfont iconjiantou2"></span>
      </template>
    </headtitle>
    <!-- 头像部分 -->
    <div class="img-head">
      <img :src="$axios.defaults.baseURL + userdata.head_img" />
      <van-uploader :after-read="afterRead" />
    </div>
    <!-- 编辑内容部分 -->
    <div class="edit">
      <!-- -------------  昵称组件   ------ -->
      <navbar @click="ednick">
        <template>昵称</template>
        <template v-slot:focus>{{userdata.nickname}}</template>
      </navbar>

      <!--   -------  修改昵称弹框  ------ -->
      <van-dialog v-model="nickshow" title="修改昵称" @confirm="editnick" show-cancel-button>
        <van-field v-model="nickname" />
      </van-dialog>
      <!-- 密码组件 -->
      <navbar @click="edpwd">
        <template>密码</template>
        <template v-slot:focus>******</template>
      </navbar>
      <!--   -------  修改密码弹框  ------ -->
      <van-dialog v-model="pwdshow" title="修改密码" @confirm="editpwd" show-cancel-button>
        <van-field v-model="password" />
      </van-dialog>
      <!-- 性别组件 -->
      <navbar @click="edgender">
        <template>性别</template>
        <template v-slot:focus>{{userdata.gender === 1 ? '男' : '女'}}</template>
      </navbar>
      <!--   -------  修改性别弹框  ------ -->
      <van-dialog v-model="gendershow" title="修改性别" @confirm="editgender" show-cancel-button>
        <!-- <van-radio-group v-model="gender">
          <van-radio :name="1">男</van-radio>
          <van-radio :name="0">女</van-radio>
        </van-radio-group>-->
        <!-- <van-field v-model="password" /> -->
        <van-radio-group v-model="gender">
          <van-cell-group>
            <van-cell title="男" clickable @click="gender = 1">
              <template #right-icon>
                <van-radio :name="1" />
              </template>
            </van-cell>
            <van-cell title="女" clickable @click="gender = 0">
              <template #right-icon>
                <van-radio :name="0" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-dialog>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      userdata: {},
      nickshow: false,
      nickname: '',
      pwdshow: false,
      password: '',
      gendershow: false,
      gender: ''
    }
  },
  methods: {
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file)
      const fd = new FormData()
      fd.append('file', file.file)
      // fd.file = file.file
      const res = await this.$axios.post('/upload', fd)
      // console.log(res.data.data)
      console.log(res.data)

      if (res.data.statusCode === 200) {
        this.$toast.success(res.data.message)
        this.editdata({ head_img: res.data.data.url })
        console.log(11)
      } else {
        this.$toast.fail(res.data.message)
        console.log(22)
      }
      console.log(res)
    },
    // 渲染数据
    async randerdata() {
      const id = localStorage.getItem('userid')
      const res = await this.$axios.get(`/user/${id}`)
      // console.log(res)
      this.userdata = res.data.data
    },
    // 点击昵称框
    ednick() {
      this.nickshow = true
      this.nickname = this.userdata.nickname
    },
    // 点击密码框
    edpwd() {
      this.pwdshow = true
      this.password = this.userdata.password
    },
    // 点击性别框
    edgender() {
      this.gendershow = true
      this.gender = this.userdata.gender
    },
    // 修改昵称确定
    editnick() {
      this.editdata({ nickname: this.nickname })
    },
    // 修改密码确定
    editpwd() {
      this.editdata({ password: this.password })
    },
    // 修改性别确定
    editgender() {
      this.editdata({ gender: this.gender })
    },

    // 修改数据ajax
    async editdata(data) {
      const res = await this.$axios.post(
        `/user_update/${localStorage.getItem('userid')}`,
        data
      )
      console.log(res)
      this.randerdata()
    }
  },
  components: {},
  created() {
    this.randerdata()
  }
}
</script>

<style scoped lang='less'>
.editdata {
  background-color: #f2f2f2;
  .img-head {
    position: relative;
    margin: 30px 0;
    text-align: center;
    img {
      height: 70px;
      width: 70px;
      border-radius: 50%;
    }
    .van-uploader {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      opacity: 0;
    }
  }
  .edit {
    padding-left: 20px;
  }
}
</style>
