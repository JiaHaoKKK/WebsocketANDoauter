<template>
  <Modal v-model="modal1"
         title="选择校对时间"
         @on-ok="ok"
         @on-cancel="cancel"
         :loading="loading">
    <p slot="header"
       style="color:rgb(19, 115, 218);text-align:left">
      <Icon type="ios-information-circle"
            size=20></Icon>
      <span>选择校对时间</span>
    </p>
    <div class="content">
      <Form ref="formValidate"
            :model="formValidate"
            :rules="ruleValidate"
            :label-width="80">
        <FormItem label="时间">
          <Row>
            <Col span="11">
            <FormItem prop="date">
              <DatePicker type="date"
                          placeholder="Select date"
                          v-model="formValidate.date"></DatePicker>
            </FormItem>
            </Col>
            <Col span="2"
                 style="text-align: center">-</Col>
            <Col span="11">
            <FormItem prop="time">
              <TimePicker type="time"
                          placeholder="Select time"
                          v-model="formValidate.time"></TimePicker>
            </FormItem>
            </Col>
          </Row>
        </FormItem>
      </Form>
    </div>

  </Modal>

</template>
<style scoped>
.content {
  width: 80%;
  padding: 10px 0 0 0;
  margin-left: 5%;
  position: relative;
}
</style>

<script>
/*eslint-disable */
import { GMTToStr } from '@/api/transformDate'
export default {
  data () {
    return {
      modal1: false,
      loading: true,
      formValidate: {
        date: '',
        time: ''
      },
      ruleValidate: {
        date: [
          { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
        ],
        time: [
          { required: true, type: 'string', message: '请选择时间', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    changeLoading () {
      // 避免点击确定模态框直接关闭
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
    ok () {
      this.handleSubmit('formValidate')
    },
    cancel () {
      this.handleReset('formValidate')
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          setTimeout(() => {
            this.changeLoading()
            this.handleReset('formValidate')
            this.modal1 = false
            this.$Message.success('设定完成')
          }, 1000)
        } else {
          this.$Message.error('输入不完整')
          return this.changeLoading()
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>
