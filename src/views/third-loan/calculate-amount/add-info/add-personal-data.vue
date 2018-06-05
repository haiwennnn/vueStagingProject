<template>
  <div class="zz-page-body">
    <div class="zz-tab">
      <z-header>个人信息完善</z-header>
      <div class="zz-tab__panel">
        <div class="user-personal-data">
          <form-title>基本信息</form-title>
          <z-form ref="personalForm"
            :rules="ruleValidate"
            v-model="personalForm">
            <popup-picker v-model="personalForm.currentValue"
              label="选择班级"
              placeholder="请选择班级"
              @on-confirm="confirmPicker"
              :data="data"></popup-picker>
            <popup-picker v-model="personalForm.address"
              label="选择居住地"
              :columns="3"
              placeholder="请选择长期居住地"
              @on-confirm="confirmPicker"
              :data="chinaRegion"></popup-picker>
            <form-input label="输入年龄"
              prop="age"
              v-model="personalForm.age">
            </form-input>
            <form-input label="常用邮箱"
              prop="email"
              v-model="personalForm.email">
            </form-input>
            <form-input label="电话号码"
              prop="phone"
              v-model="personalForm.phone">
            </form-input>
            <form-input label="真实姓名"
              prop="name"
              v-model="personalForm.name">
            </form-input>
          </z-form>
          <!-- <form-title>基本信息</form-title> -->
          <!-- style="padding:.1rem .1rem .1rem .3rem" -->
          <!-- <z-form>
            <form-item label="学历情况">
              <z-input :placeholder="'请输入学历'"></z-input>
            </form-item>
            <form-item label="学历情况">
              <z-input :placeholder="'请输入学历'"></z-input>
            </form-item>
          </z-form> -->
        </div>
        <div class="next-btn">
          <z-button type="primary"
            @click="handleSubmit">下一步</z-button>
        </div>
      </div>
    </div>
    <!-- <picker></picker> -->
  </div>
</template>
<script>
  /**
   * 个人信息完善
   *   |-增加个人资料
   */
  import Reg from '@/lib/reg'
  import ChinaRegion from '@/data/chinaRegion.json'
  export default {
    data() {
      return {
        popupPickerStatus: false,
        pickerStatus: true,
        data: [{
          name: '2009届5班',
          value: '1'
        }, {
          name: '2010届4班',
          value: '2'
        }, {
          name: '2010届5班',
          value: '3'
        }, {
          name: '2010届6班',
          value: '4'
        }, {
          name: '2011届4班',
          value: '5'
        }],
        chinaRegion: ChinaRegion,
        currentValue: [],
        personalForm: {
          currentValue: [],
          address: [],
          age: '',
          email: '',
          phone: '',
          name: ''
        },
        ruleValidate: {
          age: [
            { type: 'string', message: '请输入正确的年龄', pattern: Reg.numberReg }
            // { type: 'number', message: '请输入正确的年龄', trigger: 'change' }
            // { type: 'string', len: 0, message: '请输入正确的年龄', trigger: 'change' }
          ],
          email: [
            { type: 'email', message: '请输入正确的邮箱', trigger: 'change' }
          ],
          phone: [
            { type: 'string', message: '请输入正确的手机号', pattern: Reg.phoneReg }
          ],
          name: [
            { type: 'string', message: '请输入2-10位中文', pattern: Reg.nameReg }
          ]
        }
      }
    },
    methods: {
      handleSubmit() {
        let personalForm = this.$refs.personalForm
        personalForm.validate((d) => {
          if (d) {
            this.$zzz.toast.text('准备调用接口咯！！')
          } else {
            this.$zzz.toast.text('请修改错误的信息')
          }
        })
        // console.log(personalForm)
      },
      confirmPicker(data) {
        console.log(data)
      },
      getUserInfo() {
        this.$http.post(this.$api.walletQueryPersonalData).then((res) => {

        })
      }
    },
    created() {
      // this.getUserInfo()
    }
  }
</script>
<style lang="less" scoped>
  .next-btn {
    margin: 0.2rem 0.3rem;
  }
</style>


