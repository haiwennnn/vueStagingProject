<template>
  <div class="zz-page-body">
    <div class="zz-tab">
      <z-header>信用钱包</z-header>
      <div class="zz-tab__panel">
        <common-layout>
          <div class="sms-code-panel"
            slot="hd">
            <p style="padding-top:.75rem;font-size: .28rem;color: #444;text-align: center;">短信验证码已发送至</p>
            <div class="phone"
              style="padding-top:.15rem;font-size: .54rem;color: #444;text-align: center;">13480196054</div>
            <div class="sms-code">
              <z-form>
                <form-item label="短信验证码"
                  :labelWidth="175"
                  style="background-color:transparent;border-bottom-color:#444;">
                  <z-input :placeholder="'请输入短信验证码'"></z-input>
                  <div slot="ft"
                    class="sms-code-btn">获取验证码</div>
                </form-item>
              </z-form>
            </div>
          </div>
          <div class="open-wallet-service"
            slot="bd">开启钱包服务</div>
        </common-layout>
      </div>
    </div>
  </div>
</template>
<script>
  import commonLayout from '../components/commonLayout'
  export default {
    components: {
      commonLayout
    },
    data() {
      return {}
    }
  }
</script>
<style lang="less" scoped>
  .sms-code {
    width: 6.9rem;
    margin: 0.6rem auto 0;
  }
  .sms-code-btn {
    width: 2rem;
    line-height: 0.6rem;
    border-left: 1px solid #444;
    font-size: 0.28rem;
    text-align: center;
  }
  .open-wallet-service {
    width: 2.6rem;
    height: 0.96rem;
    line-height: 0.96rem;
    margin: 2rem auto 0;
    color: #444;
    font-size: 0.32rem;
    text-align: center;
    background-color: #f9ca1a;
  }
</style>


