<template>
  <div class="zz-page-body">
    <div class="zz-tab">
      <z-header>个人信息完善</z-header>
      <div class="zz-tab__panel">
        <div class="user-personal-data">
          <form-title>基本信息</form-title>
          <z-form ref="walletUser"
            :rules="ruleValidate"
            v-model="walletUser">
            <popup-picker v-model="walletUser.educationId"
              label="教育程度"
              placeholder="请选择"
              name-key="education"
              @on-confirm="confirmPicker"
              :data="DICT[formDictMap['educationId']]"></popup-picker>
            <popup-picker v-model="walletUser.marryId"
              label="婚姻状况"
              placeholder="请选择"
              name-key="marry"
              @on-confirm="confirmPicker"
              :data="DICT[formDictMap['marryId']]"></popup-picker>
            <popup-picker v-model="walletUser.hasChild"
              label="有无子女"
              placeholder="请选择"
              :data="DICT[formDictMap['hasChild']]"></popup-picker>
            <form-input label="子女数量"
              prop="childNumber"
              v-model="walletUser.childNumber"></form-input>
            <popup-picker v-model="walletUser.employeeTypeId"
              label="雇佣类型"
              placeholder="请选择"
              name-key="employeeType"
              @on-confirm="confirmPicker"
              :data="DICT[formDictMap['employeeTypeId']]"></popup-picker>
            <popup-picker v-model="walletUser.liveType"
              label="雇佣类型"
              placeholder="请选择"
              name-key="liveTypeName"
              @on-confirm="confirmPicker"
              :data="DICT[formDictMap['liveType']]"></popup-picker>
            <popup-picker v-model="walletUser.address"
              label="居住地址"
              :columns="3"
              placeholder="请选择"
              :name-key="['provinceName','cityName','areaName']"
              :value-key="['provinceId','cityId','areaId']"
              @on-confirm="confirmPicker"
              :data="DICT[formDictMap['address']]"></popup-picker>
            <form-input label="详细居住地址"
              :labelWidth="210"
              prop="addrDetail"
              v-model="walletUser.addrDetail"></form-input>
          </z-form>
          <form-title>工作信息</form-title>
          <z-form ref="walletWorkInfo"
            :rules="ruleValidate"
            v-model="walletWorkInfo">
            <form-input label="公司名称"
              prop="companyName"
              v-model="walletWorkInfo.companyName"></form-input>
            <form-input label="公司电话"
              prop="workTel"
              v-model="walletWorkInfo.workTel"></form-input>
            <popup-picker v-model="walletWorkInfo.companyAddress"
              label="公司地址"
              placeholder="请选择"
              :name-key="['companyProvinceName','companyCityName','companyAreaName']"
              :value-key="['companyProvinceId','companyCityId','companyAreaId']"
              @on-confirm="confirmPicker"
              :data="DICT[formDictMap['companyAddress']]"></popup-picker>
            <form-input label="公司详细地址"
              :labelWidth="210"
              prop="workAddr"
              v-model="walletWorkInfo.workAddr"></form-input>
            <popup-picker v-model="walletWorkInfo.companyTypeId"
              label="公司类型"
              placeholder="请选择"
              name-key="companyType"
              @on-confirm="confirmPicker"
              :data="DICT[formDictMap['companyTypeId']]"></popup-picker>
            <popup-picker v-model="walletWorkInfo.positionTypeId"
              label="职业类型"
              placeholder="请选择"
              name-key="positionType"
              @on-confirm="confirmPicker"
              :data="DICT[formDictMap['positionTypeId']]"></popup-picker>
            <form-input label="工作年限"
              prop="workYearsName"
              v-model="walletWorkInfo.workYearsName"></form-input>
          </z-form>
          <form-title>亲属联系人</form-title>
          <z-form ref="walletContactInfoList"
            :rules="ruleValidate"
            v-model="walletContactInfoList">
            <popup-picker v-model="walletContactInfoList.crelationId"
              label="关系"
              placeholder="请选择"
              @on-confirm="confirmPicker"
              :data="DICT[formDictMap['crelationId']]"></popup-picker>
            <form-input label="真实姓名"
              prop="crealname"
              v-model="walletWorkInfo.crealname"></form-input>
            <form-input label="手机号码"
              prop="cmobileno"
              v-model="walletWorkInfo.cmobileno"></form-input>
          </z-form>
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
  import DICT from '@/data/dict.json'
  DICT.REGION = ChinaRegion
  export default {
    data() {
      return {
        DICT: DICT,
        // picker组件中数据字段对应的词典信息
        formDictMap: {
          educationId: 'EDU_LEVEL',
          marryId: 'MARITAL_STS',
          hasChild: 'HAS_CHILD',
          employeeTypeId: 'APP_CUSTTYPE',
          liveType: 'LIVE_TYPE',
          address: 'REGION',
          companyAddress: 'REGION',
          companyTypeId: 'COMPANY_TYPE',
          positionTypeId: 'JOB_TYPE',
          crelationId: 'RELATION'
        },
        // 表单数据类型map,保存数据时需要遍历一次所以key值，根据此map判断是否需要转换数据类型
        formTypeMap: {
          hasChild: 'Number',
          childNumber: 'Number'
        },
        // 基本信息
        walletUser: {
          educationId: [],
          education: '',
          marryId: [],
          marry: '',
          hasChild: [],
          childNumber: '',
          employeeTypeId: [],
          employeeType: '',
          liveType: [],
          liveTypeName: '',
          address: [],
          provinceId: '',
          provinceName: '',
          cityId: '',
          cityName: '',
          areaId: '',
          areaName: '',
          addrDetail: ''
        },
        walletWorkInfo: {
          // 工作信息
          companyName: '',
          workTel: '',
          companyAddress: [],
          companyProvinceId: '',
          companyProvinceName: '',
          companyCityId: '',
          companyCityName: '',
          companyAreaId: '',
          companyAreaName: '',
          workAddr: '',
          companyTypeId: [],
          companyType: '',
          positionTypeId: [],
          positionType: '',
          workYearsName: ''
        },
        walletContactInfoList: {
          crealname: '',
          cmobileno: '',
          crelationId: []
        },
        ruleValidate: {
          age: [
            { type: 'string', message: '请输入正确的年龄', pattern: Reg.numberReg }
          ],
          email: [
            { type: 'email', message: '请输入正确的邮箱', trigger: 'change' }
          ],
          phone: [
            { type: 'string', message: '请输入正确的手机号', pattern: Reg.phoneReg }
          ],
          name: [
            { type: 'string', message: '请输入2-10位中文', pattern: Reg.nameReg }
          ],
          childNumber: [
            { type: 'string', message: '请输入正确的年龄', pattern: Reg.numberReg }
          ],
          crealname: [
            { type: 'string', message: '请输入2-10位中文', pattern: Reg.nameReg }
          ],
          cmobileno: [
            { type: 'string', message: '请输入正确的手机号', pattern: Reg.phoneReg }
          ],
          workYearsName: [
            { type: 'string', message: '请输入正确的工作年限', pattern: Reg.numberReg }
          ]
        }
      }
    },
    methods: {
      handleSubmit() {
        let walletUser = this.$refs.walletUser
        let walletUserStatus = false
        let walletWorkInfo = this.$refs.walletWorkInfo
        let walletWorkInfoStatus = false
        let walletContactInfoList = this.$refs.walletContactInfoList
        let walletContactInfoListStatus = false
        walletUser.validate((d) => {
          if (d) {
            walletUserStatus = true
          }
        })
        walletWorkInfo.validate((d) => {
          if (d) {
            walletWorkInfoStatus = true
          }
        })
        walletContactInfoList.validate((d) => {
          if (d) {
            walletContactInfoListStatus = true
          }
        })
        if (walletUserStatus && walletWorkInfoStatus && walletContactInfoListStatus) {
          // this.$zzz.toast.text('调用接口！！！！')
          this.walletSavePersonalData()
        } else {
          this.$zzz.toast.text('请修改带有错误提示的录入项')
        }
      },
      confirmPicker(data) {
        console.log(data)
        if (data && data.nameKey) {
          if (typeof data.nameKey === 'string') {
            this.setPickerToData(data.nameKey, data.name[0])
          } else {
            data.nameKey.forEach((key, index) => {
              this.setPickerToData(key, data.name[index])
            })
          }
        }
        if (data && data.valueKey) {
          if (typeof data.valueKey === 'string') {
            this.setPickerToData(data.valueKey, data.value[0])
          } else {
            data.valueKey.forEach((key, index) => {
              this.setPickerToData(key, data.value[index])
            })
          }
        }
      },
      /**
       * 设置picker返回的值 对应到用户信息中
       */
      setPickerToData(nameKey, value) {
        if (nameKey in this.walletUser) {
          this.walletUser[nameKey] = value
        }
        if (nameKey in this.walletWorkInfo) {
          this.walletWorkInfo[nameKey] = value
        }
        if (nameKey in this.walletUser) {

        }
      },
      getUserInfo() {
        // let data = {
        //   'createdBy': null,
        //   'createdDate': null,
        //   'updatedBy': null,
        //   'updatedDate': null,
        //   'walletUser': {
        //     'createdBy': null,
        //     'createdDate': null,
        //     'updatedBy': null,
        //     'updatedDate': null,
        //     'id': 1,
        //     'userId': 135,
        //     'userName': '晏海文',
        //     'mobileNo': '13076965109',
        //     'cardNo': '460300199109010337',
        //     'walletCode': 'O695534HRuuf',
        //     'walletName': '点米钱包',
        //     'loanLimit': 100000000.00,
        //     'freezeLimit': 3000.00,
        //     'educationId': '1',
        //     'education': '1',
        //     'marryId': '2',
        //     'marry': '2',
        //     'employeeTypeId': '2',
        //     'employeeType': '2',
        //     'liveType': '2',
        //     'liveTypeName': '2',
        //     'addr': '1',
        //     'provinceId': '440000',
        //     'provinceName': '1',
        //     'cityId': '440300',
        //     'cityName': '1',
        //     'areaId': '440304',
        //     'areaName': '1',
        //     'addrDetail': '1',
        //     'hasChild': 1,
        //     'childNumber': 1,
        //     'supportNumber': 1,
        //     'idFintechUmUser': null,
        //     'accessToken': null,
        //     'walletToken': null,
        //     'loanId': null
        //   },
        //   'walletWorkInfo': {
        //     'createdBy': null,
        //     'createdDate': null,
        //     'updatedBy': null,
        //     'updatedDate': null,
        //     'id': 1,
        //     'walletUserId': 1,
        //     'registedAssets': '300',
        //     'companyType': '1',
        //     'companyName': '1',
        //     'workTel': '1',
        //     'companyProvinceId': '440000',
        //     'companyProvinceName': '1',
        //     'companyCityId': '440300',
        //     'companyCityName': '1',
        //     'companyAreaId': '440305',
        //     'companyAreaName': '1',
        //     'workAddr': '1',
        //     'positionType': '1',
        //     'positionTypeId': '1',
        //     'workYearsName': '1',
        //     'companyRegisterTime': 1527238100000,
        //     'shareholdingRatio': 1.00,
        //     'companyTypeId': '1'
        //   },
        //   'walletContactInfoList': [
        //     {
        //       'createdBy': null,
        //       'createdDate': null,
        //       'updatedBy': null,
        //       'updatedDate': null,
        //       'id': 1,
        //       'walletUserId': 1,
        //       'relationId': '1',
        //       'relation': '1',
        //       'mobileno': '18818881888',
        //       'realName': '1'
        //     },
        //     {
        //       'createdBy': null,
        //       'createdDate': null,
        //       'updatedBy': null,
        //       'updatedDate': null,
        //       'id': 2,
        //       'walletUserId': 1,
        //       'relationId': '1',
        //       'relation': '1',
        //       'mobileno': '18818881888',
        //       'realName': '1'
        //     }
        //   ]
        // }
        this.$http.post(this.$api.walletQueryPersonalData).then((res) => {
          let data = res.data
          let walletUser = {}
          let walletWorkInfo = {}
          let walletUserKeys = Object.keys(this.walletUser)
          let walletWorkInfoKeys = Object.keys(this.walletWorkInfo)
          let formDictMap = this.formDictMap
          walletUserKeys.forEach((key, index) => {
            if (formDictMap[key]) {
              walletUser[key] = data.walletUser[key] ? [data.walletUser[key] + ''] : []
            } else {
              walletUser[key] = data.walletUser[key] + '' || ''
            }
          })
          // 处理居住地址
          if (!walletUser.provinceId || !walletUser.cityId || !walletUser.areaId) {
            walletUser.address = []
          } else {
            walletUser.address = [walletUser.provinceId + '', walletUser.cityId + '', walletUser.areaId + '']
          }
          walletWorkInfoKeys.forEach((key, index) => {
            if (formDictMap[key]) {
              walletWorkInfo[key] = data.walletWorkInfo[key] ? [data.walletWorkInfo[key] + ''] : []
            } else {
              walletWorkInfo[key] = data.walletWorkInfo[key] + '' || ''
            }
          })
          // 处理公司地址
          if (!walletWorkInfo.companyProvinceId || !walletWorkInfo.companyCityId || !walletWorkInfo.companyAreaId) {
            walletWorkInfo.companyAddress = []
          } else {
            walletWorkInfo.companyAddress = [walletWorkInfo.companyProvinceId + '', walletWorkInfo.companyCityId + '', walletWorkInfo.companyAreaId + '']
          }
          this.walletUser = walletUser
          this.walletWorkInfo = walletWorkInfo
        })
      },
      /**
       * 保存用户个人资料
       */
      walletSavePersonalData() {
        let walletUser = JSON.parse(JSON.stringify(this.walletUser))
        let walletUserKeys = Object.keys(walletUser)
        let walletWorkInfo = JSON.parse(JSON.stringify(this.walletWorkInfo))
        let walletWorkInfoKeys = Object.keys(walletWorkInfo)
        let formTypeMap = this.formTypeMap
        // 处理保存的数据
        // 数组项目变成字符串
        // 判断类型是否需要转换成数字

        walletUserKeys.forEach((key, index) => {
          if (Object.prototype.toString.call(walletUser[key]) === '[object Array]') {
            walletUser[key] = walletUser[key].toString()
          }
          if (formTypeMap[key] === 'Number') {
            walletUser[key] = parseInt(walletUser[key])
          }
        })

        walletWorkInfoKeys.forEach((key, index) => {
          if (Object.prototype.toString.call(walletWorkInfo[key]) === '[object Array]') {
            walletWorkInfo[key] = walletWorkInfo[key].toString()
          }
          if (formTypeMap[key] === 'Number') {
            walletWorkInfo[key] = parseInt(walletWorkInfo[key])
          }
        })

        this.$http.post(this.$api.walletSavePersonalData,
          {
            data: {
              walletUser,
              walletWorkInfo,
              'walletContactInfoList': [
                {
                  'id': 1,
                  'relationId': '1',
                  'relation': '1',
                  'mobileno': '18818881888',
                  'realName': '1'
                },
                {
                  'id': 2,
                  'relationId': '1',
                  'relation': '1',
                  'mobileno': '18818881888',
                  'realName': '1'
                }
              ]
            }
          },
          {
            toastText: '正在保存用户信息'
          }
        ).then((res) => {

        })
      }
    },
    created() {
      this.getUserInfo()
    }
  }
</script>
<style lang="less" scoped>
  .next-btn {
    margin: 0.2rem 0.3rem;
  }
</style>


