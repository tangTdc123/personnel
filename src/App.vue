<template>
<div>
<router-view>
  
</router-view>
<el-button @click="drawer = true" type="primary" style="margin-left:45%;position:fixed;bottom:10px">
  获取帮助
</el-button>

<el-drawer
  size="15%"
  title="联系邮箱"
  :visible.sync="drawer"
  :direction="direction">
  <span>&nbsp;&nbsp;158xxxxxxxx@163.com</span>
</el-drawer>
</div>
</template>

<script>
  export default {
    data() {
      return {
        drawer: false,
        direction: 'btt',
      };
    },
    methods: {
      
    }
  };
</script>


<style>

 
</style>
