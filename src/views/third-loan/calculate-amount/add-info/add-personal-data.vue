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

          <div v-for="(item,index) in walletContactInfoList"
            :key="index">
            <form-title v-if="index===0">主要联系人</form-title>
            <form-title v-else>补充联系人</form-title>
            <z-form :ref="`walletContactInfoList-${index}`"
              :rules="ruleValidate"
              v-model="walletContactInfoList[index]">
              <popup-picker v-model="walletContactInfoList[index].relationId"
                label="关系"
                placeholder="请选择"
                :name-key="`walletContactInfoList.${index}.relation`"
                @on-confirm="confirmPicker"
                :data="DICT[formDictMap['relationId']]"></popup-picker>
              <form-input label="真实姓名"
                prop="realName"
                v-model="walletContactInfoList[index].realName"></form-input>
              <form-input label="手机号码"
                prop="mobileno"
                v-model="walletContactInfoList[index].mobileno"></form-input>
            </z-form>
          </div>

          <!-- <z-form ref="walletContactInfoList-1"
            :rules="ruleValidate"
            v-model="walletContactInfoList[1]">
            <popup-picker v-model="walletContactInfoList[1].crelationId"
              label="关系"
              placeholder="请选择"
              @on-confirm="confirmPicker"
              :data="DICT[formDictMap['crelationId']]"></popup-picker>
            <form-input label="真实姓名"
              prop="crealname"
              v-model="walletContactInfoList[1].crealname"></form-input>
            <form-input label="手机号码"
              prop="cmobileno"
              v-model="walletContactInfoList[1].cmobileno"></form-input>
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
          relationId: 'RELATION'
        },
        // 表单数据类型map,保存数据时需要遍历一次所以key值，根据此map判断是否需要转换数据类型
        formTypeMap: {
          contactType: 'Number',
          id: 'Number',
          hasChild: 'Number',
          childNumber: 'Number'
        },
        contactTypeIndexMap: {
          '1': 0,
          '2': 1
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
        walletContactInfoList: [
          {
            id: '',
            contactType: '1',
            realName: '',
            mobileno: '',
            relationId: []
          },
          {
            id: '',
            contactType: '2',
            realName: '',
            mobileno: '',
            relationId: []
          }
        ],
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
            { type: 'string', message: '请输入正确的子女数量', pattern: Reg.numberReg }
          ],
          realName: [
            { type: 'string', message: '请输入2-10位中文', pattern: Reg.nameReg }
          ],
          mobileno: [
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
        let walletContactInfoListStatus = []
        let walletContactInfoList = this.walletContactInfoList.map((item, index) => {
          walletContactInfoListStatus[index] = false
          return this.$refs[`walletContactInfoList-${index}`]
        })
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
        walletContactInfoList.forEach((item, index) => {
          item[0].validate((d) => {
            if (d) {
              walletContactInfoListStatus[index] = true
            }
          })
        })
        if (walletUserStatus && walletWorkInfoStatus && walletContactInfoListStatus.toString().indexOf('false') < 0) {
          this.walletSavePersonalData()
        } else {
          this.$zzz.toast.text('请修改带有错误提示的录入项')
        }
      },
      confirmPicker(data) {
        console.log(data)
        if (data && data.nameKey) {
          if (typeof data.nameKey === 'string') {
            if (data.nameKey.indexOf('.') >= 0) {
              let nameKeySplit = data.nameKey.split('.')
              this.setPickerToData(nameKeySplit, data.name[0])
            } else {
              this.setPickerToData(data.nameKey, data.name[0])
            }
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
      setPickerToData(nameKey, value, target) {
        if (nameKey === null) {
          return
        }
        if (nameKey instanceof Array) {
          target = target || this
          if (nameKey.length === 1) {
            target[nameKey] = value
            this.setPickerToData(null)
            return
          } else {
            let key = nameKey.shift()
            this.setPickerToData(nameKey, value, target[key])
            return
          }
        }
        if (nameKey in this.walletUser) {
          this.walletUser[nameKey] = value
        }
        if (nameKey in this.walletWorkInfo) {
          this.walletWorkInfo[nameKey] = value
        }
      },
      getUserInfo() {
        this.$http.post(this.$api.walletQueryPersonalData).then((res) => {
          let data = res.data
          let walletUser = {}
          let walletWorkInfo = {}
          let walletContactInfoList = this.walletContactInfoList
          let walletUserKeys = Object.keys(this.walletUser || {})
          let walletWorkInfoKeys = Object.keys(this.walletWorkInfo || {})
          let formDictMap = this.formDictMap
          walletUserKeys.forEach((key, index) => {
            if (formDictMap[key]) {
              walletUser[key] = data.walletUser[key] + '' ? [data.walletUser[key] + ''] : []
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

          // 处理联系人信息
          let walletContactInfoListData = res.data.walletContactInfoList
          walletContactInfoListData.forEach((item, index) => {
            walletContactInfoList[this.contactTypeIndexMap[item.contactType + '']] = {
              contactType: item.contactType + '',
              id: item.id || '',
              realName: item.realName || '',
              mobileno: item.mobileno || '',
              relation: item.relation || '',
              relationId: item.relationId + '' ? [item.relationId + ''] : []
            }
          })
          // this.walletContactInfoList.forEach((item, index) => {
          //   if (walletContactInfoListData[index]) {
          //     walletContactInfoList[index] = {
          //       id: walletContactInfoListData[index].id || '',
          //       realName: walletContactInfoListData[index].realName || '',
          //       mobileno: walletContactInfoListData[index].mobileno || '',
          //       relation: walletContactInfoListData[index].relation || '',
          //       relationId: walletContactInfoListData[index].relationId + '' ? [walletContactInfoListData[index].relationId + ''] : []
          //     }
          //   } else {
          //     walletContactInfoList[index] = item
          //   }
          // })
          this.walletUser = walletUser
          this.walletWorkInfo = walletWorkInfo
          this.walletContactInfoList = JSON.parse(JSON.stringify(walletContactInfoList))
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
        let walletContactInfoList = JSON.parse(JSON.stringify(this.walletContactInfoList))
        let walletContactInfoListData = []
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

        walletContactInfoList.forEach((item, index) => {
          let contactItemKey = Object.keys(item)
          let status = true
          contactItemKey.forEach((key, index) => {
            // 将picker数据转成字符串保存到服务器
            if (Object.prototype.toString.call(item[key]) === '[object Array]') {
              item[key] = item[key].toString()
            }
            // 判断当前联系人数据内是否存在未填写项目，未完成填写不予保存
            if (key !== 'id' && item[key] === '') {
              status = false
            }
            // 某些字段后台接受为数字类型
            if (formTypeMap[key] === 'Number') {
              item[key] = parseInt(item[key])
            }
          })
          if (status) {
            walletContactInfoListData.push(JSON.parse(JSON.stringify(item)))
          }
        })

        console.log(walletContactInfoListData)
        // return
        this.$http.post(this.$api.walletSavePersonalData,
          {
            data: {
              walletUser,
              walletWorkInfo,
              walletContactInfoList: walletContactInfoListData
              // 'walletContactInfoList': [
              //   {
              //     'id': 1,
              //     'relationId': '1',
              //     'relation': '1',
              //     'mobileno': '18818881888',
              //     'realName': '1'
              //   },
              //   {
              //     'id': 2,
              //     'relationId': '1',
              //     'relation': '1',
              //     'mobileno': '18818881888',
              //     'realName': '1'
              //   }
              // ]
            }
          },
          {
            toastText: '正在保存用户信息'
          }
        ).then((res) => {
          if (+res.errorCode === 0) {
            this.$zzz.toast.show({
              text: '保存成功',
              type: 'done',
              position: 'center',
              isShowMask: true
            })
            setTimeout(() => {
              this.$router.back()
            }, 1500)
          } else {
            this.$zzz.toast.text(res.message)
          }
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


