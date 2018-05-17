<template>
  <div>
    <cells>
      <cell value="文本值">
        <p slot="hd">标题文字</p>
        <div slot="bd">
          <p>内容文字</p>
          <!-- <span style="font-size:.24rem;color:#ababab;">描述内容xxxx123213</span> -->
        </div>
      </cell>
    </cells>
    <div>
      <z-form>
        <form-item label="测试label">
          <z-input></z-input>
        </form-item>
      </z-form>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>

<style lang="less" scoped>
</style>


