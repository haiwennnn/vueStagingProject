<template>
  <div class="zz-page-body">
    <div class="zz-tab">
      <z-header>个人信息完善</z-header>
      <div class="zz-tab__panel">
        <div class="user-personal-data">
          <form-title>基本信息</form-title>
          <z-form>
            <form-item label="学历情况"
              style="padding:.1rem .1rem .1rem .3rem">
              <z-input :placeholder="'请输入学历'"></z-input>
            </form-item>
            <form-item label="学历情况"
              style="padding:.1rem .1rem .1rem .3rem">
              <z-input :placeholder="'请输入学历'"></z-input>
            </form-item>
          </z-form>
          <form-title>基本信息</form-title>
          <z-form>
            <form-item label="学历情况"
              style="padding:.1rem .1rem .1rem .3rem">
              <z-input :placeholder="'请输入学历'"></z-input>
            </form-item>
            <form-item label="学历情况"
              style="padding:.1rem .1rem .1rem .3rem">
              <z-input :placeholder="'请输入学历'"></z-input>
            </form-item>
          </z-form>
        </div>
        <div class="next-btn">
          <z-button type="primary">下一步</z-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   * 个人信息完善
   *   |-增加个人资料
   */
  export default {
    data() {
      return {}
    }
  }
</script>
<style lang="less" scoped>
.next-btn{
  margin: .2rem .3rem;
}
</style>


