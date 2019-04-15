<template>
  <div>
    <Modal v-model="modal1"
           title="修改用户密码"
           @on-ok="ok"
           @on-cancel="cancel"
           :loading="loading">
      <p slot="header"
         style="color:#f60;font-size:16px;">
        <Icon type="ios-information-circle"></Icon>
        <span>修改用户密码</span>
      </p>
      <div class="form-wrapper">
        <Form ref="formCustom"
              :model="formCustom"
              :rules="ruleCustom"
              :label-width="80">
          <FormItem label="新密码"
                    prop="passwd">
            <i-Input type="password"
                     v-model="formCustom.passwd"></i-Input>
          </FormItem>
          <FormItem label="确认密码"
                    prop="passwdCheck">
            <i-Input type="password"
                     v-model="formCustom.passwdCheck"></i-Input>
          </FormItem>
        </Form>
      </div>

    </Modal>

  </div>

</template>
<style scoped>
.form-wrapper {
  width: 80%;
  margin: 0 auto;
  margin-top: 40px;
  padding: 16px;
  font-size: 12px;
  line-height: 1.5;
}
</style>

<script>
/*eslint-disable*/
import { get, post, patch } from '@/api/axios.js'
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        // 密码校验规范根据需要加在下面
        if (this.formCustom.passwdCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField('passwdCheck')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formCustom.passwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      modal1: false,
      loading: true,
      formCustom: {
        passwd: '',
        passwdCheck: '',
      },
      ruleCustom: {
        passwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        passwdCheck: [
          { validator: validatePassCheck, trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    // modal1: false,
    currentuserId: '',
    currentuserPwd: ''
  },
  methods: {
    isshow (flag) {
      this.modal1 = flag
    },
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
    ok () {
      this.handleSubmit('formCustom')
    },
    cancel () {
      // 无论确认还是取消都将在页面关闭前清空表单数据
      this.handleReset('formCustom')
      this.$Message.info('已取消修改')
      //   this.$emit('cancel', false)
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let obj = { 'password': this.formCustom.passwd }
          patch('/users/' + this.currentuserId + '/password', obj).then(() => {
            setTimeout(() => {
              this.changeLoading()
              //   this.$emit('cancel', false)
              this.modal1 = false
              // 无论确认还是取消都将在页面关闭前清空表单数据
              this.handleReset('formCustom')
              this.$Message.success('Success!')
            }, 500)
          }).catch(() => {
            this.changeLoading()
            // this.$emit('cancel', false)
            this.modal1 = false
            // 无论确认还是取消都将在页面关闭前清空表单数据
            this.handleReset('formCustom')
            this.$Message.warning('修改失败，请稍后重试')
          })

          return true
        } else {
          this.changeLoading()
          this.$Message.error('失败，输入有误')
          return false
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>
