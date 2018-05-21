<template>
  <div class="zz-page-body">
    <div class="zz-tab">
      <z-header>运营商认证</z-header>
      <div class="zz-tab__panel">
        <div class="user-operator-panel">
          <div class="user-operator-phone">
            手机号: 13076965109
          </div>
          <z-form>
            <form-item label="服务密码"
              style="padding:.1rem .3rem">
              <z-input :placeholder="'请输入服务密码'"></z-input>
            </form-item>
          </z-form>
          <p class="descript"
            style="padding-left:.3rem;">* 手机运营商认证能使你更快通过审核。</p>
        </div>
        <div class="next-btn">
          <z-button type="primary">下一步</z-button>
        </div>
      </div>
    </div>
  </div>
  <!-- 手机运营商认证能使你更快通过审核。首先，需要先验证你的手机号码。 -->
</template>
<script>
  /**
   * 个人信息完善
   *   |-增加运营商认证
   */
  export default {
    data() {
      return {}
    }
  }
</script>
<style lang="less" scoped>
  .user-operator-phone {
    padding: .3rem .3rem .1rem .3rem;
    font-size: .28rem;
    color: #999;
  }
  .next-btn {
    margin: 0.6rem 0.3rem 0;
  }
</style>

