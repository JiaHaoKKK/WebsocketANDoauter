<template>
  <div class="home">
    <div class="wrapper">
      <form-content></form-content>
    </div>
    <div class="LogOut">
      <span class="userlist"
            @click="seeInformation"
            v-show="role==2">管理用户</span>
      <span class="pwd"
            @click="changePassword">修改密码</span>
      <span class="exit"
            @click="exit">退出登陆</span>
    </div>
    <div class="avatar">
      {{userName}}
    </div>
    <table-information v-show="addclick&&role==2"
                       :userlist="userlist"
                       :loading="loading"></table-information>

    <change-password ref="changepassword"
                     :currentuserId="resetUserid"></change-password>
  </div>

</template>
<script>
/*eslint-disable*/
import { get, post } from '@/api/axios.js'
// import { Toast } from 'vant'
import { mapState, mapMutations } from 'vuex'
import * as cookie from '@/api/getcookie'
import tableInformation from 'components/tableInformation/tableInformation'
import changePassword from 'components/changePassword/changePassword'
import formContent from 'components/formContent/formContent'
export default {
  data () {
    return {
      websockData: '',
      websock: null,
      resetUserid: '',
      loading: true,// 用于table-information的表格加载状态
      addclick: false,// 默认false，测试用true
      userlist: []
    }
  },
  created () {
    if (cookie.getremember()) {
      this._setpassword(cookie.getcookie().password)
    }
    this._setuser(cookie.getcookie().username)
    this._setuserRole(cookie.getcookie().role)
    //this.initWebSocket();
  },
  mounted: function () {
  },
  methods: {
    exit () {
      let obj = { 'exituser': this.userName }
      post('/logout', obj).then((data) => {
        this.$Message.success({
          content: '退出成功',
          duration: 1
        })
        // 清除token
        this._setToken('')
        cookie.removetoken()
        this.$router.push({
          name: 'Login'
        })
      }).catch(() => {
        this.$Message.error({
          content: '请求出错',
          duration: 1
        })
      })
    },
    seeInformation () {
      // 获取所有用户信息
      if (this.addclick) {
        this.addclick = false
        // 界面收起后，恢复加载状态初始值
        this.loading = true
      }
      else {
        get('/users').then((data) => {
          this.addclick = true
          // 将数据传给列表组件
          this.userlist = data.data.content
          this.loading = false
        }).catch(() => {
          this.addclick = false
          this.$Message.error({
            content: '请求出错 , 请重试',
            duration: 1
          })
        })
      }

    },
    changePassword () {
      this.$refs.changepassword.isshow(true)
      this.resetUserid = cookie.gettoken()
    },
    ...mapMutations({
      _setuser: 'SET_USER',
      _setToken: 'SET_TOKEN',
      _setpassword: 'SET_PWD',
      _setuserRole: 'SET_ROLE'    }),
    initWebSocket () { // 初始化weosocket
      const wsuri = `ws://192.168.18.169:8059/websocket`// 这个地址由后端童鞋提供
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketonopen () { // 连接建立之后执行send方法发送数据
      let actions = { "test": "12345" };
      this.websocketsend(JSON.stringify(actions));
      console.log(111)
    },
    websocketonerror () { // 连接建立失败重连
      this.initWebSocket()
    },
    websocketonmessage (e) {
      let _this = this // 数据接收
      const redata = JSON.parse(e.data)
      console.log("接收数据  " + redata)

    },
    websocketsend (Data) { // 数据发送
      this.websock.send(Data)
    },
    websocketclose (e) { // 关闭
      console.log('断开连接', e)
    }
  },
  computed: {
    ...mapState([
      // 映射 this.count 为 store.state.count
      'userName',
      'role'
    ])
  },
  components: {
    tableInformation,
    changePassword,
    formContent
  }
}
</script>
<style scoped>
.home {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  color: black;
  /* background: url(../../assets/bg.jpg);
  background-size: 100% 100%; */
  background-image: linear-gradient(135deg, #f6d4d8, #b3c2db);
}
.wrapper {
  position: absolute;
  top: 0;
  left: 15%;
  right: 15%;
  bottom: 0;
  /* width: 100vw;
  height: 100vh; */
  overflow: hidden;
  /* background: rgba(32, 32, 35, 0.5); */
}
.LogOut {
  position: absolute;
  right: 40px;
  top: 0;
  width: 80px;
  height: 150px;
  text-align: center;
  padding: 30px 0 0 0;
}
.LogOut .exit {
  text-align: center;
  line-height: 40px;
  /* border: 1px solid; */
  display: inline-block;
  cursor: pointer;
  background: #ff000082;
  user-select: none;
  width: 60px;
  height: 40px;
  box-shadow: 2px 1px 8px 0px #444;
  border-radius: 8px;
}
.LogOut .userlist,
.LogOut .adduser,
.LogOut .pwd {
  text-align: center;
  line-height: 40px;
  /* border: 1px solid; */
  display: inline-block;
  cursor: pointer;
  background: #2d8cf078;
  user-select: none;
  width: 60px;
  height: 40px;
  box-shadow: 2px 1px 8px 0px #444;
  border-radius: 8px;
  margin-bottom: 10px;
}
.avatar {
  position: fixed;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  left: 25px;
  top: 25px;
  font-family: fantasy;
  /* background: gray; */
  text-align: center;
  line-height: 50px;
  font-size: 16px;
  box-shadow: 0px 2px 11px 1px #69635d;
  overflow: hidden;
}
</style>
