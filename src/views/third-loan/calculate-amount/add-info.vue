<template>
  <div class="zz-page-body">
    <div class="zz-tab">
      <z-header>资料完善</z-header>
      <div class="zz-tab__panel">
        <div class="user-add-info-list">
          <cells>
            <cell @on-cell-item-click="goPer"
              style="padding:.35rem .3rem;">
              <img slot="hd"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAMAAAC7m5rvAAAAllBMVEUAAAC/v7+qqqrHx8evr6/ExMS5ubmxsbGsrKysrKytra2pqam8vLy9vb2lpaXExMT////s7Oz8/Pz09PTu7u729vb5+fnp6enMzMzLy8vm5ub4+Pjj4+O3t7fx8fHb29vAwMDHx8ePj4/S0tLf39+rq6ulpaWSkpK7u7vY2NjR0dGnp6eenp6ampqysrLPz8+fn5+ioqKXtObzAAAAEHRSTlMA6wT4/e/f0KyZSy/z8mz4uKbH2gAAA6FJREFUSMellody2zAMhuXEGU6TVBgkbGp529np+79cKREUpbrxdfxnn7g+cYACkKku7m5vricPl4v5Yq5arWLJN14+TK5vbu8udLhCsyuHeY6QD0Q0rEHb765mA/DbJIw4j4XGybdIPV5q13lMC9NHnWvKpxhiAVBYPMX4ezffxSQnHmFoahFgkRpEmHCEMeWTdn8zygOnmAVhkxZZ1AImYdyOnvnJrrohrBiymF/3ZgGsYty1XV1kdy6MATKGnJRgoiAVuRRH/inhTe4uu9U1Q8MMmy0nOcdJ5bMwbEs9g9vsJg8yjq2UXxugdJYBtHKTXUeM64bO2c00bGP/dTbBIAIBERyIaFgTASHQyiS7hyC3KaHcQNSm2r2+vbwvBFRt91OjlfssXizZ+q2WjN3yqvXrcfWxmS/362lYGJfYjQm6zBah4InWbtRyy3UlGPaGvDxU6B8EvqVo9NgX2TwUGDosJzb7vQyPBHafxNSZ2zq9hXOdzYoJWM6Hyo5P0h4PkAcMwI5mAxOx/bvgGEOpfqBihoezoeSKLffWAA4xBLIvS8VywYR5RjFaix8PmDBs77+sa8XYDDA2ilVV9xbAiCF0cFUpZniASa6Yn0y5aICO8tMplkvCMGKbV8x7jqhbYSf8fI4YJgwUq46+FjmillIdK8UgYQUrtlvliaspUflqpxgXHbYiIhD/d77w+kG9oGkg1T5eiYhLImkbV2PsbUO96qcnStq8jbCwyFoX+TJPjhK8kpucv+gi66LfmwXF3peJMkQmcct3xcCeGmCxx55qDdBzuF8kA5yYW9bcUy3Wc7x2p+bOuQgYTJdKxctVBG65g4AVMMCoVgwOECjFlOMDKFbTbz+camcRilwxvS84rX79cPQztYrh51HM+DMtZPmGilkYOQUDiuX1iVPA44F7p2DGLghYZwP+8SJDjKdvADqbg+SCOtmyw9p94anDKwCDw7Pq8JJ7LduTga69rtaf0b3uIJyneAySe32AIPdc+r8D1bM6c23oulzvzB9S6BDnf1+HDifkUugYBCrT1OcCVd1QClQpLALQubDoHAGlsBiDMG3J0pMUthdzKhfw5LtLiUE4hnx0AgDNtnEQVZYQ5XyHf8jWasjXBAPBxgQDziQYFqwmGNmMlIrpDH+ZzihHs5A8+co4eeKUPEFKngKHIXnKvn0H++epmoWppoaP079JDL8//lsa+p9Jb0qx77sUexG0WmmhS7HvRyn2TxZ1zUyK+LY0AAAAAElFTkSuQmCC"
                alt="">
              <div slot="bd">
                <p>个人资料</p>
              </div>
              <div slot="ft">
                <span>未完成</span>
                <span class="ion ion-minus-circled"
                  style="color:#C41E1F;"></span>
              </div>
            </cell>
            <cell @on-cell-item-click="goOpa"
              style="padding:.35rem .3rem;">
              <img slot="hd"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAMAAAC7m5rvAAAAllBMVEUAAAC/v7+qqqrHx8evr6/ExMS5ubmxsbGsrKysrKytra2pqam8vLy9vb2lpaXExMT////s7Oz8/Pz09PTu7u729vb5+fnp6enMzMzLy8vm5ub4+Pjj4+O3t7fx8fHb29vAwMDHx8ePj4/S0tLf39+rq6ulpaWSkpK7u7vY2NjR0dGnp6eenp6ampqysrLPz8+fn5+ioqKXtObzAAAAEHRSTlMA6wT4/e/f0KyZSy/z8mz4uKbH2gAAA6FJREFUSMellody2zAMhuXEGU6TVBgkbGp529np+79cKREUpbrxdfxnn7g+cYACkKku7m5vricPl4v5Yq5arWLJN14+TK5vbu8udLhCsyuHeY6QD0Q0rEHb765mA/DbJIw4j4XGybdIPV5q13lMC9NHnWvKpxhiAVBYPMX4ezffxSQnHmFoahFgkRpEmHCEMeWTdn8zygOnmAVhkxZZ1AImYdyOnvnJrrohrBiymF/3ZgGsYty1XV1kdy6MATKGnJRgoiAVuRRH/inhTe4uu9U1Q8MMmy0nOcdJ5bMwbEs9g9vsJg8yjq2UXxugdJYBtHKTXUeM64bO2c00bGP/dTbBIAIBERyIaFgTASHQyiS7hyC3KaHcQNSm2r2+vbwvBFRt91OjlfssXizZ+q2WjN3yqvXrcfWxmS/362lYGJfYjQm6zBah4InWbtRyy3UlGPaGvDxU6B8EvqVo9NgX2TwUGDosJzb7vQyPBHafxNSZ2zq9hXOdzYoJWM6Hyo5P0h4PkAcMwI5mAxOx/bvgGEOpfqBihoezoeSKLffWAA4xBLIvS8VywYR5RjFaix8PmDBs77+sa8XYDDA2ilVV9xbAiCF0cFUpZniASa6Yn0y5aICO8tMplkvCMGKbV8x7jqhbYSf8fI4YJgwUq46+FjmillIdK8UgYQUrtlvliaspUflqpxgXHbYiIhD/d77w+kG9oGkg1T5eiYhLImkbV2PsbUO96qcnStq8jbCwyFoX+TJPjhK8kpucv+gi66LfmwXF3peJMkQmcct3xcCeGmCxx55qDdBzuF8kA5yYW9bcUy3Wc7x2p+bOuQgYTJdKxctVBG65g4AVMMCoVgwOECjFlOMDKFbTbz+camcRilwxvS84rX79cPQztYrh51HM+DMtZPmGilkYOQUDiuX1iVPA44F7p2DGLghYZwP+8SJDjKdvADqbg+SCOtmyw9p94anDKwCDw7Pq8JJ7LduTga69rtaf0b3uIJyneAySe32AIPdc+r8D1bM6c23oulzvzB9S6BDnf1+HDifkUugYBCrT1OcCVd1QClQpLALQubDoHAGlsBiDMG3J0pMUthdzKhfw5LtLiUE4hnx0AgDNtnEQVZYQ5XyHf8jWasjXBAPBxgQDziQYFqwmGNmMlIrpDH+ZzihHs5A8+co4eeKUPEFKngKHIXnKvn0H++epmoWppoaP079JDL8//lsa+p9Jb0qx77sUexG0WmmhS7HvRyn2TxZ1zUyK+LY0AAAAAElFTkSuQmCC"
                alt="">
              <div slot="bd">
                <p>运营商认证</p>
              </div>
              <div slot="ft">
                <span>已完成</span>
                <span class="ion ion-checkmark-circled"
                  style="color:#00BA8D;"></span>
              </div>
            </cell>
          </cells>
        </div>
        <div class="next-btn"
          @click="goLoanAssess">
          <z-button type="primary">下一步</z-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   * 个人信息完善
   */
  export default {
    data() {
      return {}
    },
    methods: {
      goOpa() {
        this.$router.push({
          name: 'addOperator'
        })
      },
      goPer() {
        this.$router.push({
          name: 'addPersonalData'
        })
      },
      goLoanAssess() {
        this.$router.push({
          name: 'loanAssess'
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .next-btn {
    margin: .6rem 0.3rem 0;
  }
</style>


