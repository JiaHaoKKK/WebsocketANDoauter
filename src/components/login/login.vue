<template>
  <div class="homepage-hero-module">
    <div class="video-container">
      <div :style="fixStyle"
           class="filter"></div>
      <video :style="fixStyle"
             autoplay
             loop
             class="fillWidth"
             v-on:canplay="canplay">
        <source src="./src/MP4/Lonely-Blue.mp4"
                type="video/mp4" />
        浏览器不支持 video 标签，建议升级浏览器。
        <source src="./src/WEBM/Lonely-Blue.webm"
                type="video/webm" />
        浏览器不支持 video 标签，建议升级浏览器。
      </video>
      <div class="poster hidden"
           v-if="!vedioCanPlay">
        <img :style="fixStyle"
             src="./src/Snapshots/Lonely-Blue.jpg"
             alt="">
      </div>
    </div>
    <div class='login'
         v-if='!resetpwdflag'>
      <div class="header-main">
        <h2>用户登陆</h2>
        <div class="header-bottom">
          <div class="header-right w3agile">
            <div class="header-left-bottom agileinfo">
              <form>
                <div class="icon1">
                  <input type="text"
                         placeholder="用户名"
                         required=""
                         ref="name"
                         :value="userName" />
                </div>
                <div class="icon1">
                  <input type="password"
                         placeholder="密码"
                         required=""
                         ref="pwd"
                         :value="password" />
                </div>
                <div class="login-check">
                  <label class="checkbox"><input type="checkbox"
                           name="checkbox"
                           checked=""
                           ref="rember"
                           @click="remember"><i> </i> 记住账号密码</label>
                </div>
                <div class="bottom">
                  <span @click="loging">登陆</span>
                </div>
                <!-- <p><a href="#"
                     @click="changestate">忘记密码?</a></p> -->
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <resetpwd v-if="resetpwdflag"
              @resetpassword="subreset"></resetpwd>
  </div>

</template>
<style scoped>
/* @import "./src/login.css"; */
@import "../../common/login-style/login.css";
.login {
  position: absolute;
  top: 10%;
  left: 0;
  right: 0;
  bottom: 0;
}
.homepage-hero-module,
.video-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.video-container .poster img,
.video-container video {
  z-index: 0;
  position: absolute;
}

.video-container .filter {
  z-index: 1;
  position: absolute;
  background: rgba(82, 93, 95, 0.22);
}
</style>
<script>
/*eslint-disable*/
import { get, post, patch } from '@/api/axios.js'
import * as oatu from '@/api/permission.js'
import * as cookie from '@/api/getcookie'
import { mapMutations, mapGetters } from 'vuex'
// import { Toast } from 'vant'
export default {
  name: 'login',
  data () {
    return {
      vedioCanPlay: false,
      fixStyle: '',
      name: '',
      pwd: '',
      rememberPassword: false,
      resetpwdflag: false
    }
  },
  created: function () {
    // 刷新或者重新登录时，从cookie判断token是否存在
    if (cookie.gettoken()) {
      this._setuser(cookie.getcookie().username)
      this._setToken(cookie.gettoken())
      this._setpassword(cookie.getcookie().password)
      this.$router.push({
        name: 'Home'
      })
    }
  },
  methods: {
    canplay () {
      this.vedioCanPlay = true
    },
    loging () { // 点击登陆进行用户验证
      let obj = this._getFormat()
      if (!obj) return
      else {
        this.name = obj.username
        this.pwd = obj.password

        /*************/
        // token不存在时重发请求
        post('/user/login', obj)
          .then(data => {
            //   console.log(data)
            if (data.code !== '0') {
              if (data.code === '1002') {
                this.$Message.warning({
                  content: '账号在别处登陆',
                  duration: 1
                })
                return
              }
              if (data.code === '1001') {
                this.$Message.error({
                  content: '失败！账户不存在',
                  duration: 1
                })
              }
              return
            }
            this.$Message.success({
              content: '登陆成功',
              duration: 1
            })
            let dataObj = data
            let that = this
            this.rememberPassword = this.$refs.rember.checked
            setTimeout(() => {
              this._setToken(dataObj.token)
              this._setuser(dataObj.username)
              this._setuserRole(dataObj.role)
            }, 500)
            cookie.setcookie(data)
            if (this.rememberPassword) {
              // 登录成功后在cookie中存储记住密码选项
              // 如果用户没有勾选存储密码则跳过
              cookie.remember()
            }
            else {
              cookie.removeremember()
            }
            // 成功后回调
            const redirect = this.$route.query.redirect
            if (redirect) {
              // 存在回跳地址就回跳
              this.$router.push(redirect)
            } else {
              // 否则就跳到默认的首页
              this.$router.push({
                name: 'Home'
              })
            }


          })
          .catch(() =>
            this.$Message.error({
              content: '登录失败',
              duration: 1
            })
          )

      }
    },
    _getFormat () {
      // 设置用户
      let userName = this.$refs.name.value
      let pwd = this.$refs.pwd.value
      // 下面这行会引起两次弹窗
      //   oatu.InputValidation(userName, pwd)
      return oatu.InputValidation(userName, pwd)
    },
    ...mapMutations({
      _setuser: 'SET_USER',
      _setToken: 'SET_TOKEN',
      _setpassword: 'SET_PWD',
      _setuserRole: 'SET_ROLE'    }),
    remember () {
      this.rememberPassword = this.$refs.rember.checked
    },
    changestate () {
      this.resetpwdflag = true
    },
    subreset (obj) {
      //   if (this.token || cookie.gettoken()) {
      //     this._setToken('')
      //     cookie.removetoken()
      //   }
      // token不存在时重发请求
      patch('/users/changePassword', obj)
        .then(data => {
          //   console.log(data)
          if (data.code !== 1) {
            this.$Message.error({
              content: '密码修改失败！请重试',
              duration: 1
            })
            return
          }
          this.$Message.success({
            content: '修改成功',
            duration: 1
          })
          // 当用户重置密码后，我们可以清除原来记住的用户名密码，清空输入框
          // 我们也可以不清空，这里作为预留处理
          //   if (cookie.getremember()) {
          //     cookie.removecookie()
          //   }
          // 修改密码界面隐藏
          this.resetpwdflag = false
        })
        .catch(() => {
          this.$Message.error({
            content: '请求出错，请稍后重试',
            duration: 1
          })

          this.resetpwdflag = false
        }
        )


    }
  },
  mounted: function () {
    // 用户上次登录如果记住了密码，则直接填充
    let that = this
    setTimeout(() => {
      if (cookie.getremember()) {
        that.$refs.name.value = cookie.getcookie().username
        that.$refs.pwd.value = cookie.getcookie().password
      }
    }, 500);

    window.onresize = () => {
      const windowWidth = document.body.clientWidth
      const windowHeight = document.body.clientHeight
      const windowAspectRatio = windowHeight / windowWidth
      let videoWidth
      let videoHeight
      if (windowAspectRatio < 0.5625) {
        videoWidth = windowWidth
        videoHeight = videoWidth * 0.5625
        this.fixStyle = {
          height: windowWidth * 0.5625 + 'px',
          width: windowWidth + 'px',
          'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
          'margin-left': 'initial'
        }
      } else {
        videoHeight = windowHeight
        videoWidth = videoHeight / 0.5625
        this.fixStyle = {
          height: windowHeight + 'px',
          width: windowHeight / 0.5625 + 'px',
          'margin-left': (windowWidth - videoWidth) / 2 + 'px',
          'margin-bottom': 'initial'
        }
      }
    }
    window.onresize()
  },
  computed: {
    ...mapGetters(['token', 'userName', 'password']) // 获取当前token值
  },
  watch: {
    // 监听token值的变化，刷新登录页
    token () {
    }
  },
  components: {
    resetpwd
  }
}
</script>
