<template>
<div>
  <router-link to="/">
  <el-button type="primary" style="float:right">登录</el-button>
  </router-link>
<div style="position:fixed;left:35%;top:20%;width:400px">

      <div style="width:400px;border: solid 1px ;height:300px;border-radius:10px">

      <el-container style="margin:40px">
      
      <el-form :model="zuce" :rules="rules" ref="zuce" label-width="100px" class="demo-ruleForm">
       
      <el-form-item label="用户名" prop="name">
          <el-input v-model="zuce.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
          <el-input v-model="zuce.password"></el-input>
      </el-form-item>
      <el-form-item label="权限密码" prop="rootpassword">
          <el-input v-model="zuce.rootpassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('zuce')">注册</el-button>
        <el-button @click="resetForm('zuce')">重置</el-button>
      </el-form-item>
      </el-form>
      </el-container>
      </div>
</div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        
      actionUrl:'127.0.0.1'+'/api/',
        fileList: []
        ,
        zuce: {
          name: '',
          password: '',
          rootpassword: ''
        },
        rules:{
            name:[{ required: true, message: '请输入用户名', trigger: 'blur' },
             { min: 3, max: 5, message: '用户名长度在 3 到 5 个字符', trigger: 'blur' }],
            password:[{ required: true, message: '请输入密码', trigger: 'blur' },
            { min: 8, max: 12, message: '密码长度在 8 到 12 个字符', trigger: 'blur' }
            ],
            rootpassword:[{ required: true, message: '请输入权限密码', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }]
        }
      };
    },
      methods: {
         message(messages,mtype){
        this.$message({
              message: messages,
              type: mtype
        });  
      },

      submitForm(zuce) {
        this.$refs[zuce].validate((valid) => {
          if (valid) {
            
          console.log(this.zuce);
            
          this.$http.post('user/register',this.zuce).then(res=>{
          //清空录入框信息：
          
          //隐藏录入框：
          
          console.log(res);
          if(res.data=='flase'){
            this.$message({
              message: '权限密码错误',
              type: 'error'
            });
          }if(res.data=='flase1'){
              this.$message({
              message: '用户已经存在',
              type: 'error'
            });

          }
                    else{
            this.zuce = {};
           this.$message({
              message: '录入成功',
              type: 'success'
            });
            this.$router.push({path:"/"})
          }

          })


          
      } else {
                  this.message('请输入正确的信息','error');
                  return false;
              }
          

       
      })
      }, 
      resetForm(zuce) {
        this.$refs[zuce].resetFields();
      },

      handlePreview(file) {
        console.log(file);
      },

    }
  }
</script>
<style>


</style>
