<template>
<div>
  <router-link to="/zuce">
  <el-button type="primary" style="float:right">注册</el-button>
  </router-link>
<div style="position:fixed;left:37%;top:25%;width:400px">
      <div style="width:400px;border: solid 1px ;height:270px;border-radius:10px">
      <el-container style="margin:20px">
 
      <el-form :model="denglu" :rules="rules" ref="denglu" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="name">
          <el-input v-model="denglu.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
          <el-input v-model="denglu.password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('denglu')">登录</el-button>
        <el-button @click="resetForm('denglu')">重置</el-button>
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
        denglu: {
          name: '',
          password: '',
        },
        rules:{
            name:[{ required: true, message: '请输入用户名', trigger: 'blur' },
             { min: 3, max: 5, message: '用户名长度在 3 到 5 个字符', trigger: 'blur' }],
            password:[{ required: true, message: '请输入密码', trigger: 'blur' },
            { min: 8, max: 12, message: '密码长度在 8 到 12 个字符', trigger: 'blur' }
            ]
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
      submitForm(denglu){
        this.$refs[denglu].validate((valid) => {
          if (valid) {
             this.$http.get(`findBySname/${this.denglu.name}`).then(res=>{
                if(res.data!=''){
                    if(res.data[0].password==this.denglu.password){
                        this.$message({
                          message: '登录成功',
                          type: 'success'
                        });
                         this.$router.push({path:"/about"})

                    }
                    else{
                        this.$message({
                          message: '密码错误',
                          type: 'error'
                        });

                    }
           }
           else{
                this.$message({
                  message: '请输入正确的用户名',
                  type: 'error'
                });

           }
         })
      
      

      } else {
                  this.message('请输入正确的信息','error');
                  return false;
              }
          

       
      })

      },

      resetForm(denglu) {
        this.$refs[denglu].resetFields();
      }
    }
  }
</script>
<style>


</style>
