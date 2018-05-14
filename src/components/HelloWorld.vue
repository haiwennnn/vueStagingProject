<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="text">
    <div v-if="testStatus"
      v-test:foo.a.b.c="exp">{{testBtnTest}}</div>
    <z-button @click.native="btnClick">更改test</z-button>
    <z-button @click.native="testStatus=false">删除test</z-button>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome',
        testStatus: true,
        testBtnTest: 'test',
        exp: 'test'
      }
    },
    methods: {
      btnClick() {
        this.testBtnTest = '被更改啦'
      },
      expFn() {
        console.log('111')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
    text-align: center;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
