<template>
  <div class="zz-page-body protocol-page">
    <div class="zz-page-body">
      <div class="zz-tab">
        <z-header :has-back="false">协议列表</z-header>
        <div class="zz-tab__panel">
          <flexbox style="height:100%;"
            :dir="'column'">
            <flexbox-item style="width:100%;overflow:hidden;overflow-y:auto;"
              :flex="'1'">
              <div class="contract-list">
                <div>
                  <div class="contract-item"
                    v-for="(item,index) in contractList"
                    :key="index">
                    <div class="contract-content"
                      @click="showContract(item)">
                      <span class="title ellipsis">{{item.fileName}}</span>
                    </div>
                  </div>
                  <!-- <div class="contract-item">
                            <div class="contract-content"></div>
                        </div> -->
                </div>
              </div>
            </flexbox-item>
            <div style="width:100%;"
              class="goto-sign-btn">
              <z-button @click="goSign">去签名</z-button>
            </div>
          </flexbox>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        redirect: '',
        contractList: [
          // {
          //   fileName: '合同11合同11合同11合同11合同',
          //   fileLocation: 'http://test-app.chinacreditech.com/gateway/html/18062114555660712/11'
          // }
        ]
      }
    },
    methods: {
      getContractList() {
        this.$http.ykdPost(
          this.$api.getContractList,
          {
            data: {
              type: ''
            }
          }
        ).then((res) => {
          if (+res.errorCode === 0) {
            this.contractList = res.data.contractList || []
          } else {
            this.$zzz.toast.text(res.message)
          }
        })
      },
      showContract(contractInfo) {
        let query = {}
        query.title = encodeURIComponent(contractInfo.fileName)
        query.url = encodeURIComponent(contractInfo.fileLocation)
        this.$router.push({
          name: 'framework',
          query: query
        })
      },
      goSign() {
        this.$router.replace({
          name: 'signature',
          query: {
            type: 'redirect',
            redirect: this.redirect
          }
        })
      }
    },
    created() {
      this.redirect = this.$route.query.redirect || ''
      this.getContractList()
    }
  }
</script>
<style lang="less" scoped>
  .contract-list {
    & > div {
      width: 6.925rem;
      margin: 0 auto;
      font-size: 0;
    }
    .contract-item {
      display: inline-block;
      width: 2.85rem;
      height: 3.69rem;
      margin: 0.3rem;
      .contract-content {
        position: relative;
        width: 100%;
        height: 100%;
        background: url("../../../assets/services/contract-bg.png") no-repeat;
        background-size: 100% auto;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        .title {
          position: absolute;
          left: 50%;
          top: 0.3rem;
          width: 2.2rem;
          margin: 0 auto;
          text-align: left;
          font-size: 0.2rem;
          transform: translateX(-50%);
        }
      }
    }
  }
</style>


