<template>
  <div class="login">
    <div class="loginBoxs">
      <div id="loginBox">
        <div id="title">登录</div>
        <el-form :model="formData" ref="loginForm" :rules="rules">
          <el-form-item prop="account">
            <el-input v-model="formData.account" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="formData.password" placeholder="请输入密码" type="password"></el-input>
          </el-form-item>
        </el-form>
        <el-row type="flex" justify="space-between">
          <el-col :span="8">
            <span>记住我</span>
          </el-col>
          <el-col :span="8">
            <span>忘记密码？</span>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-button @click='submit("loginForm")' type="primary" round style="margin-top: 20px;margin-bottom: 50px;width: 310px;">登录</el-button>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col class="line" :span="9" style="color: #909399">————</el-col>
          <el-col :span="6" style="font-family: 等线;font-weight: bold">第三方登录</el-col>
          <el-col class="line" :span="9" style="color: #909399">————</el-col>
        </el-row>
        <el-row type="flex" justify="space-around">
          <el-col :span="8">
            <el-button type="warning" style="margin-top: 20px;width: 100px;">司令部</el-button>
          </el-col>
          <el-col :span="8">
            <el-button type="success" style="margin-top: 20px;width: 100px;">指挥官</el-button>
          </el-col>
        </el-row>
      </div>

      <div id="loginBox1"></div>
      <div id="loginBox2"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'LoginView',
  data(){
    return{
      formData:{
        account:'',
        password:'',
      },
      rules:{
        account:[
          {required:true,massage:'请输入账号',trigger:'blur'},
          { min: 2, max: 10, message: '请输入2~10位账号', trigger: 'blur' }
        ],
        password:[
          {required:true,massage:'请输入账号',trigger:'blur'},
          { min: 6, max: 8, message: '请输入6~8位密码', trigger: 'blur' }
        ],
      }
    }
  },
  methods:{
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        //符合校验规则
        if (valid) {
          axios.post('http://localhost:9090/login',this.formData)
              .then(
                  res=>{
                    //清除原来的token
                    sessionStorage.removeItem('token');
                    this.$store.commit('clearToken');
                    //清除原来的access
                    this.$store.commit('clearAccess');

                    if(res.data.success===true){
                      let token=res.data.token;
                      let access=res.data.access;
                      sessionStorage.setItem('token',token);
                      this.$store.commit('setToken',token);
                      this.$store.commit('setAccess',access);
                      this.$router.push({name:'home'});
                    }
                  }

              )
              .catch(err=>console.log(err));
        } else {
          //不符合校验规则
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<style scoped>
.login{
  height: 100vh;
  background-image: url("../assets/loginback.png");
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loginBoxs{
  position: relative;
  width: 400px;
  height: 550px;
  border-radius: 20px;
}
#loginBox,#loginBox1,#loginBox2{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
}
#loginBox{
  background-color: #FCFCFC;
  z-index: 5;

}
#title{
  font-size: 32px;
  font-weight:bold ;
  font-family: 等线;
  color:#303133;
  margin-top: 35px;
  margin-bottom: 75px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
/deep/ .el-input{
  width: 310px;
  box-shadow:0px 4px 10px rgba(0, 0, 0, 0.15);;
}
/deep/ .el-form-item{
  display: flex;
  justify-content: center;
}
/deep/ .el-col{
  text-align: center;
}
.el-button{

}
#loginBox1{
  background-color: #FFE5AB;
  transform: rotate(5deg);
}
#loginBox2{
  background-color: rgba(254, 238, 255, 1);
  transform: rotate(-5deg);
}
span{
  font-family: 等线;
  font-size: 14px;
  font-weight: lighter;
}
</style>
