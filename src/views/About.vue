<template>

  <el-container>
    <el-dialog
      title="请输入录入学生信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>
        <el-form :inline="true" :model="ruleForm" :rules="rule" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="身份证号码" prop="number">
            <el-input v-model="ruleForm.number" placeholder="请输入身份证号码"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name"  placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model="ruleForm.age"  placeholder="请输入年龄"></el-input>
          </el-form-item>
          <el-form-item label="出生日期" required>
            <el-col >
              <el-form-item prop="date1">
                <el-date-picker type="date" value-format="yyyy年-MM月-dd日" placeholder="选择日期" v-model="ruleForm.chushengriqi" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="ruleForm.sex">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
            <el-form-item label="户籍地址" prop="address">
            <el-input v-model="ruleForm.address"  placeholder="请输入户籍地址"></el-input>
          </el-form-item>
        </el-form>
        
        
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addpersonnel('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>  

    <el-dialog
      title="请编辑学生信息"
      :visible.sync="dialogVisible1"
      width="30%"
      :before-close="handleClose">
      <span>
        <el-form :inline="true" :model="bianji" :rules="rules1" ref="bianji" label-width="100px" class="demo-ruleForm">
          <el-form-item label="身份证号码" prop="number">
            <el-input v-model="bianji.number" placeholder="请输入身份证号码"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="bianji.name"  placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model="bianji.age"  placeholder="请输入年龄"></el-input>
          </el-form-item>
          <el-form-item label="出生日期" required>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker type="date" value-format="yyyy年-MM月-dd日" placeholder="选择日期" v-model="bianji.chushengriqi" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="bianji.sex">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
            <el-form-item label="户籍地址" prop="address">
            <el-input v-model="bianji.address"  placeholder="请输入户籍地址"></el-input>
          </el-form-item>
        </el-form>
        
        
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="edit('bianji')">确 定</el-button>
      </span>
    </el-dialog>  
    <el-header>
    <el-row>
    <i class="el-icon-edit">人员管理系统</i>

    <el-tooltip  class="item" effect="dark" content="注销用户" placement="bottom">
      <el-button @click="zhuxiao()" style="float:right;margin-top:5px;margin-top:10px" circle icon="el-icon-user-solid"></el-button>
    </el-tooltip>
    <div style="float:right;margin-top:5px;margin-top:10px;margin-right:5px">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    </div>

    
      <div style="float:right;margin-top:5px;margin-left:5px">
      
      </div>
    </el-row>      
    </el-header>
    
    
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini" ref="formInline" :rules="chaxun">
      <el-form-item label="学号" prop="number">
        <el-input v-model="formInline.number" placeholder="精确查询" ></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formInline.name" placeholder="模糊查询" ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('formInline')">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="luru()">录入</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="fanhui('formInline')">返回</el-button>
      </el-form-item>
    </el-form>
    
    <el-main>
      <el-table
    :data="personnelList"
    border
    style="width: 100%">  
    <el-table-column
      fixed
      prop="number"
      label="身份证号码">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="age"
      label="年龄">
    </el-table-column>
    <el-table-column
      prop="chushengriqi"
      label="出生日期">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别">
    </el-table-column>
    <el-table-column
      prop="address"
      label="户籍地址">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button  type="primary" @click="bianji1(scope.row._id)" size="small">编辑</el-button>
        <el-button type="danger" @click="remove(scope.row._id)" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
          <div class="block" style='text-align:right;margin-top:10px'>
            <el-pagination
              @current-change="currentChange"
              layout="prev, pager, next"
              :page-size="page.size"
              :current-page="page.current"
              :total="page.total">
            </el-pagination>
          </div>
    </el-main>
    
  </el-container>

  
</template>

<script>


export default {
   data() {
      var checkInt = (rule, value, callback) => {

        setTimeout(() => {
          if (!(/(^[1-9]\d*$)/.test(value))) {
            callback(new Error('请输入数字值'));
          }else {
            if (value.length != 18) {
              callback(new Error('请输入18位的身份证号码'));
            }else{
              callback();
            }
              
            }
          
        }, 1000);
      };
      var checkage = (rule, value, callback) => {

        setTimeout(() => {
          if (!(/(^[1-9]\d*$)/.test(value))) {
            callback(new Error('请输入数字值'));
          }else {
            if (0 == value|| value>150) {
              callback(new Error('请输入正确的年龄'));
            }else{
              callback();
            }
              
            }
          
        }, 1000);
      };
      var checkname = (rule, value, callback) => {

        setTimeout(() => {
          if (!(/^[a-zA-Z]+$/.test(value)) && !(/^[\u4e00-\u9fa5]{0,}$/.test(value))) {
            callback(new Error('请输入正确的姓名'));
            
          }else {
            if (value.length<1 ||value.length >=5 ) {
              callback(new Error('请输入正确的姓名'));
            }else{
              callback();
            }
              
            }
          
        }, 1000);
      };
      var checkhanzi = (rule, value, callback) => {

        setTimeout(() => {
          if (!(/^[\u4e00-\u9fa5]{0,}$/.test(value))) {
            callback(new Error('请输入正确的地址'));
            console.log('啊')
          }else {
            if (value.length<6) {
              callback(new Error('请输入正确的地址'));
            }else{
              callback();
            }
              
            }
          
        }, 1000);
      };

      

      return {
        ruleForm: {
          number:'',
          name: '',
          age: '',
          chushengriqi:'',
          sex: '',
          address: '',
        },
        bianji: {
          number:'',
          name: '',
          age: '',
          chushengriqi:'',
          sex: '',
          address: '',
        },
        rule: {
          number: [
            { required: true, message: '请输入身份证号码', trigger: 'blur' },
            { validator: checkInt,  trigger: 'blur'}
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { validator: checkname, trigger: 'blur' }
          ],
          age: [
            { required: true, message: '请输入年龄', trigger: 'blur' },
            { validator: checkage , trigger: 'blur' }
          ],
          chushengriqi: [
            {type: 'date',  message: '请选择日期', trigger: 'change' }
          ],

          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          address: [
            { required: true,  validator:checkhanzi, trigger: 'blur' }
          ]
        },
        chaxun:{
          number:[
            {  min: 18, max: 18, message: '长度在 18个字符',  trigger: 'blur'}
          ],
          name:[
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ]
        },
        rules1: {
          number: [
            { required: true, message: '请输入身份证号码', trigger: 'blur' },
            {  validator: checkInt,trigger: 'blur'}
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { validator: checkname,  trigger: 'blur' }
          ],
          age: [
            { required: true, message: '请输入年龄', trigger: 'blur' },
            { validator: checkage , trigger: 'blur' }
          ],
          chushengriqi: [
            { type: 'date',  message: '请选择日期', trigger: 'change' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          address: [
            { required: true,  validator:checkhanzi, trigger: 'blur' }
          ]
        },
        formInline: {
          number: '',
          name: ''
        },page:{
         current:1,
         size:5,
         total:0,
       },
         personnelList:[],  
         dialogVisible: false,
         dialogVisible1: false,
                
      }
    },
        created(){
        this.pageInation();
           
        
    },
     methods: {
      fetch(){


          this.formInline.name = '';
          this.page.current = 1;
          this.pageInation();
      },
      pageInation() {
        let that = this;
        
        
        
        //每次点击更改页码值
        this.$http.get('personnelList?currentPage='+that.page.current+'&pageSize='+that.page.size).then(res=>{
            console.log( that.page.current)
        
            if(res.data.data == null || res.data.data.length == 0){
               //除第一页的其他某页全都删除了的情况：
               that.page.current =  that.page.current - 1;
               that.personnelList = res.data.data;
               this.pageInation();

            }else{
                that.personnelList = res.data.data;
                that.page.total = res.data.total;

            }
            
        });
        
      },
        fanhui(formInline) {
          let that = this;
            this.$refs[formInline].resetFields()
          
        that.page.curren=1
        //每次点击更改页码值
        this.$http.get('personnelList?currentPage='+that.page.current+'&pageSize='+that.page.size).then(res=>{
        
            if(res.data.data == null || res.data.data.length == 1){
               //除第一页的其他某页全都删除了的情况：
               
               that.page.current =  that.page.current - 1;
               that.pageInation();
            }else{
                that.personnelList = res.data.data;
                that.page.total = res.data.total;
            }
            
        });
        
      },

      
        currentChange(current){
        
        this.page.current = current;
        //姓名模糊查询的分页：
        if(this.formInline.name  != ''){
          this.$http.get('findByName?currentPage='+this.page.current+'&pageSize='+this.page.size+'&names='+this.formInline.name).then(res=>{
                     
                      console.log('姓名模糊分页查询结果：')
                      console.log(res.data)
                      this.personnelList = res.data.data;
                      this.page.total = res.data.total;        
          })
          return;
        }
        this.pageInation();
        console.log(current)

      },
      edit(bianji){
          this.$refs[bianji].validate((valid) => {
              if(valid) {
                        
              this.dialogVisible1 = false;
               this.ConfirmUpdate(this.id);

              } else {
                  this.message('请输入正确的信息','error');
                  return false;
              }
         });


      },
      luru(){
          this.dialogVisible=true;
      },
      bianji1(id){
        
          
          this.id = id;
          console.log(this.bianji)
          this.$http.get(`update/${id}`).then(res=>{
                this.bianji = res.data
                console.log(this.bianji)
                this.dialogVisible1=true;
          });

      },
      addpersonnel(ruleForm){
      this.$refs[ruleForm].validate((valid) => {
      if(valid) {
          this.$http.post('personnels',this.ruleForm).then(()=>{
          //清空录入框信息：
          this.ruleForm = {};
          //隐藏录入框：
          this.$message({
              message: '录入成功',
              type: 'success'
            });
            this.page.current = 1;
            this.pageInation();
            this.dialogVisible=false
          })
      } else {
                  this.message('请输入正确的信息','error');
                  return false;
              }
          

       
      })
      }, 
      remove(id){


          this.$http.delete(`personnel/${id}`).then(()=>{
             this.$message({
              message: '删除人员信息成功',
              type: 'success'
            });
            // this.page.current = 1;
              this.pageInation();
          })
      },
      
      ConfirmUpdate(id){
        this.$http.put(`confirmUpdata/${id}`,this.bianji).then(()=>{
            this.$message({
              message: '更新成功',
              type: 'success'
            });
            this.bianji = {};
            // this.page.current = 1;
              this.pageInation();
        })
      },

      dialogVisible4() {
        console.log('submit!');
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(() => {
            done();
          })
          .catch(() => {});
      },
      zhuxiao() {
        console.log("sdadsa")
        this.$router.push("/")
      },
      onSubmit(formInline){
        if(this.formInline.number!='' && this.formInline.name ==''){
          console.log('a')
          this.$refs[formInline].validate((valid) => {
              if(valid) {
                //根据学号精确查询：
                this.$http.get(`findBySnumber/${this.formInline.number}`).then(res=>{
                  console.log('a')  
                  this.personnelList = res.data;
                  this.formInline.number = '';
                  this.page.total = 0;
                })
              } else {
                  this.message('请输入18位数字学号','error');
                  return false;
              }
         });
        }else if(this.formInline.number == '' && this.formInline.name !=''){
          console.log('b')
          this.$refs[formInline].validate((valid) => {
              if(valid) {
                 console.log('姓名查询') 
                  //根据姓名模糊查询：
                    this.$http.get('findByName?currentPage='+this.page.current+'&pageSize='+this.page.size+'&names='+this.formInline.name).then(res=>{
                     
                      console.log('姓名模糊分页查询结果：')
                      console.log(res.data)
                      this.personnelList = res.data.data;
                      this.page.total = res.data.total;
                    
                  })
              } else {
                  this.message('请输入正确的的字符','warning');
                  return false;
              }
          });
        }else{
          console.log('c')
          if(this.formInline.number == '' && this.formInline.name ==''){
              this.message('请输入有效字符','error')
              return;
          }else{
              this.message('请输入有效字符','error')
              return;
          }

        }
      },
            //消息通知框：
      message(messages,mtype){
        this.$message({
              message: messages,
              type: mtype
        });  
      },

    
    }

    
}
</script>


<style>

  body{
    margin-top: 0px;
    margin-left: 0px;
    margin-right: 0px;
    
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    margin-bottom: 10px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 50px;
  }
  .el-form{
    text-align: center;
    justify-content: center;
  }

</style>
