<template>
  <Modal v-model="modal1"
         title="系统控制指令"
         @on-ok="ok"
         @on-cancel="cancel"
         :loading="loading"
         width="800px">
    <p slot="header"
       style="color:rgb(19, 115, 218);text-align:left">
      <Icon type="ios-information-circle"
            size=20></Icon>
      <span>系统控制指令</span>
    </p>
    <Form ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="100"
          inline>
      <FormItem label="工作模式"
                prop="workPattern">
        <Select v-model="formValidate.workPattern"
                placeholder="选择模式"
                style="width:120px">
          <Option value="0">自检</Option>
          <Option value="1">频域搜索</Option>
          <Option value="2">驻留</Option>
          <Option value="3">空域搜索</Option>
          <Option value="4">中频采集</Option>
          <Option value="5">敌我1030</Option>
          <Option value="6">敌我1090</Option>
        </Select>
      </FormItem>
      <FormItem label="工作周期"
                prop="workCycle">
        <Input v-model="formValidate.workCycle"
               type="number"
               placeholder="单位：50ms"
               style="width:120px">
        </Input>
        </Select>
      </FormItem>
      <FormItem label="工作周期数"
                prop="workCycleAmount">
        <Input v-model="formValidate.workCycleAmount"
               type="number"
               placeholder="工作次数"
               style="width:120px">
        </Input>
        </Select>
      </FormItem>
      <FormItem label="起始频率"
                prop="beginFrequency">
        <Input v-model="formValidate.beginFrequency"
               type="number"
               placeholder="分辨率:1 MHz"
               style="width:120px">
        </Input>
        </Select>
      </FormItem>
      <FormItem label="终止频率"
                prop="endFrequency">
        <Input v-model="formValidate.endFrequency"
               type="number"
               placeholder="分辨率:1 MHz"
               style="width:120px">
        </Input>
        </Select>
      </FormItem>
      <FormItem label="频率步进"
                prop="steppedFrequency">
        <Input v-model="formValidate.steppedFrequency"
               type="number"
               placeholder="单位:MHz"
               style="width:120px">
        </Input>
        </Select>
      </FormItem>
      <FormItem label="带宽选择"
                prop="chooseBandwidth">
        <Select v-model="formValidate.chooseBandwidth"
                placeholder="设置带宽"
                style="width:120px">
          <Option value="0">400M</Option>
          <Option value="1">200M</Option>
          <Option value="2">40M</Option>
          <Option value="3">10M</Option>
          <Option value="4">5M</Option>
        </Select>
      </FormItem>
      <FormItem label="天线一选择"
                prop="chooseAntenna1">
        <Select v-model="formValidate.chooseAntenna1"
                placeholder="天线一"
                style="width:120px">
          <Option value="0">前</Option>
          <Option value="1">后</Option>
          <Option value="2">左</Option>
          <Option value="3">右</Option>
        </Select>
      </FormItem>
      <FormItem label="天线二选择(侦察)"
                prop="chooseAntenna2">
        <Select v-model="formValidate.chooseAntenna2"
                placeholder="天线二"
                style="width:120px">
          <Option value="0">前</Option>
          <Option value="1">后</Option>
          <Option value="2">左</Option>
          <Option value="3">右</Option>
        </Select>
      </FormItem>
      <p style="font-size: 14px;font-weight: 800;margin-left: 10px;">射频1衰减</p>
      <FormItem label="6-18GHz射频"
                prop="attenuation_0">
        <Select v-model="formValidate.attenuation_0"
                placeholder="设置衰减"
                style="width:120px">
          <Option value="0">衰</Option>
          <Option value="1">不衰(20dB)</Option>
        </Select>
      </FormItem>
      <FormItem label="2-6GHz射频1前级"
                prop="attenuation_1">
        <Select v-model="formValidate.attenuation_1"
                placeholder="设置衰减"
                style="width:120px">
          <Option value="0">衰</Option>
          <Option value="1">不衰(10dB)</Option>
        </Select>
      </FormItem>
      <FormItem label="2-6GHz射频1后级"
                prop="attenuation_2">
        <Select v-model="formValidate.attenuation_2"
                placeholder="设置衰减"
                style="width:120px">
          <Option value="0">衰</Option>
          <Option value="1">不衰(20dB)</Option>
        </Select>
      </FormItem>
      <FormItem label="0.8-2GHz射频1前级"
                prop="attenuation_3">
        <Select v-model="formValidate.attenuation_3"
                placeholder="设置衰减"
                style="width:120px">
          <Option value="0">衰</Option>
          <Option value="1">不衰(20dB)</Option>
        </Select>
      </FormItem>
      <FormItem label="0.8-2GHz射频1后级"
                prop="attenuation_4">
        <Select v-model="formValidate.attenuation_4"
                placeholder="设置衰减"
                style="width:120px">
          <Option value="0">衰</Option>
          <Option value="1">不衰(20dB)</Option>
        </Select>
      </FormItem>
      <FormItem label="0.38-0.8GHz射频1前级"
                prop="attenuation_5">
        <Select v-model="formValidate.attenuation_5"
                placeholder="设置衰减"
                style="width:120px">
          <Option value="0">衰</Option>
          <Option value="1">不衰(20dB)</Option>
        </Select>
      </FormItem>
      <FormItem label="0.8-2GHz射频1后级"
                prop="attenuation_6">
        <Select v-model="formValidate.attenuation_6"
                placeholder="设置衰减"
                style="width:120px">
          <Option value="0">衰</Option>
          <Option value="1">不衰(20dB)</Option>
        </Select>
      </FormItem>
      <p style="font-size: 14px;font-weight: 800;margin-left: 10px;">射频2衰减</p>
      <FormItem label="6-18GHz射频"
                prop="attenuationTwo_0">
        <Select v-model="formValidate.attenuationTwo_0"
                placeholder="设置衰减"
                style="width:120px">
          <Option value="0">衰</Option>
          <Option value="1">不衰(20dB)</Option>
        </Select>
      </FormItem>
      <FormItem label="2-6GHz射频1前级"
                prop="attenuationTwo_1">
        <Select v-model="formValidate.attenuationTwo_1"
                placeholder="设置衰减"
                style="width:120px">
          <Option value="0">衰</Option>
          <Option value="1">不衰(10dB)</Option>
        </Select>
      </FormItem>
      <FormItem label="2-6GHz射频1后级"
                prop="attenuationTwo_2">
        <Select v-model="formValidate.attenuationTwo_2"
                placeholder="设置衰减"
                style="width:120px">
          <Option value="0">衰</Option>
          <Option value="1">不衰(20dB)</Option>
        </Select>
      </FormItem>
      <FormItem label="0.8-2GHz射频1前级"
                prop="attenuationTwo_3">
        <Select v-model="formValidate.attenuationTwo_3"
                placeholder="设置衰减"
                style="width:120px">
          <Option value="0">衰</Option>
          <Option value="1">不衰(20dB)</Option>
        </Select>
      </FormItem>
      <FormItem label="0.8-2GHz射频1后级"
                prop="attenuationTwo_4">
        <Select v-model="formValidate.attenuationTwo_4"
                placeholder="设置衰减"
                style="width:120px">
          <Option value="0">衰</Option>
          <Option value="1">不衰(20dB)</Option>
        </Select>
      </FormItem>
      <FormItem label="0.38-0.8GHz射频1前级"
                prop="attenuationTwo_5">
        <Select v-model="formValidate.attenuationTwo_5"
                placeholder="设置衰减"
                style="width:120px">
          <Option value="0">衰</Option>
          <Option value="1">不衰(20dB)</Option>
        </Select>
      </FormItem>
      <FormItem label="0.8-2GHz射频1后级"
                prop="attenuationTwo_6">
        <Select v-model="formValidate.attenuationTwo_6"
                placeholder="设置衰减"
                style="width:120px">
          <Option value="0">衰</Option>
          <Option value="1">不衰(20dB)</Option>
        </Select>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
export default {
  data () {
    return {
      modal1: false,
      loading: true,
      formValidate: {
        workPattern: '',
        workCycle: '',
        workCycleAmount: '1',
        beginFrequency: '',
        endFrequency: '',
        steppedFrequency: '',
        chooseBandwidth: '',
        chooseAntenna1: '',
        chooseAntenna2: '',
        attenuation_0: '',
        attenuation_1: '',
        attenuation_2: '',
        attenuation_3: '',
        attenuation_4: '',
        attenuation_5: '',
        attenuation_6: '', // 下面空出一个射频1长电缆衰减控制
        balancedAttenuationRF1: '',
        attenuationTwo_0: '',
        attenuationTwo_1: '',
        attenuationTwo_2: '',
        attenuationTwo_3: '',
        attenuationTwo_4: '',
        attenuationTwo_5: '',
        attenuationTwo_6: '',
        balancedAttenuationRF2: '',
        attenuationMF1: '',
        attenuationMF2: '',
        attenuationControlWay: '',
        selfInspectionAttenuation: '',
        guidanceSwitch: '',
        guidance: '',
        faultDetect: '',
        timingCode: '',
        onceExecuteCMDTimeNeeded: ''

      },
      ruleValidate: {
        workPattern: [
          { required: true, message: '选择工作模式', trigger: 'change' }
        ],
        workCycle: [
          { required: true, message: '输入工作周期', trigger: 'blur' }
        ],
        workCycleAmount: [
          { required: true, message: '输入工作周期数', trigger: 'blur' }
        ],
        beginFrequency: [
          { required: true, message: '输入起始频率', trigger: 'blur' }
        ],
        endFrequency: [
          { required: true, message: '输入终止频率', trigger: 'blur' }
        ],
        steppedFrequency: [
          { required: true, message: '设置频率步进', trigger: 'blur' }
        ],
        chooseBandwidth: [
          { required: true, message: '选择工作模式', trigger: 'change' }
        ],
        chooseAntenna1: [
          { required: true, message: '天线一未选择', trigger: 'change' }
        ],
        chooseAntenna2: [
          { required: true, message: '天线二未选择', trigger: 'change' }
        ],
        attenuation_0: [
          { required: true, message: '设置衰减', trigger: 'change' }
        ],
        attenuation_1: [
          { required: true, message: '设置衰减', trigger: 'change' }
        ],
        attenuation_2: [
          { required: true, message: '设置衰减', trigger: 'change' }
        ],
        attenuation_3: [
          { required: true, message: '设置衰减', trigger: 'change' }
        ],
        attenuation_4: [
          { required: true, message: '设置衰减', trigger: 'change' }
        ],
        attenuation_5: [
          { required: true, message: '设置衰减', trigger: 'change' }
        ],
        attenuation_6: [
          { required: true, message: '设置衰减', trigger: 'change' }
        ],
        attenuationTwo_0: [
          { required: true, message: '设置衰减', trigger: 'change' }
        ],
        attenuationTwo_1: [
          { required: true, message: '设置衰减', trigger: 'change' }
        ],
        attenuationTwo_2: [
          { required: true, message: '设置衰减', trigger: 'change' }
        ],
        attenuationTwo_3: [
          { required: true, message: '设置衰减', trigger: 'change' }
        ],
        attenuationTwo_4: [
          { required: true, message: '设置衰减', trigger: 'change' }
        ],
        attenuationTwo_5: [
          { required: true, message: '设置衰减', trigger: 'change' }
        ],
        attenuationTwo_6: [
          { required: true, message: '设置衰减', trigger: 'change' }
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
      console.log(this.formValidate)
      console.log(this.formValidate.threshold)
      console.log(typeof this.formValidate.threshold)
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
  },
  components: {
  }
}
</script>
<style>
.ivu-modal {
  width: auto;
  margin: 0 auto;
  position: relative;
  outline: 0;
  top: 100px;
  width: 800px;
  margin-bottom: 50px;
}
</style>
