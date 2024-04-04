<template>
<div class="registrationForm">
  <el-form :model="formData" ref="registrationForm" label-position="left" label-width="60px">
    <el-form-item label="名字" prop="name">
      <el-input v-model="formData.name"></el-input>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input v-model="formData.age"></el-input>
    </el-form-item>
    <el-form-item label="舰种" prop="category">
      <el-input v-model="formData.category"></el-input>
    </el-form-item>
    <el-form-item label="阵营" prop="camp">
      <el-input v-model="formData.camp"></el-input>
    </el-form-item>
    <el-form-item label="处理人" prop="handler">
      <el-input v-model="formData.handler"></el-input>
    </el-form-item>
    <el-form-item label="金额" prop="fare">
      <el-input v-model="formData.fare"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
    </el-form-item>

  </el-form>
</div>
</template>

<script>
import axios from "axios";
export default {
  name: "RegistrationForm",
  data(){
    return {
      formData:{
        name:'',
        age:'',
        category:'',
        camp:'',
        handler:'',
        fare:''
      }
    }
  },
  methods:{
    submit(){
      axios.post('http://localhost:9090/chargeroom/registration/add',this.formData)
          .then(res=>{
            console.log(res);
            this.$message({
              message:res.data.msg,
              type:'success',
            });
            this.formData={
              name:'',
              age:'',
              category:'',
              camp:'',
              handler:'',
              fare:''
            };
          })
          .catch(res=>{
            console.log(res);
            this.$message({
              message:'出错了，（；´д｀）ゞ挂号失败'
            })
          });
    }
  }
}
</script>

<style scoped>
.registrationForm{
  width: 100%;
  height: 100%;
}

/deep/.el-button{
  margin-left: 25%;
  width: 100px;
  border-radius: 10px;
}
/deep/.el-input{
  width: 280px;
}
.el-form-item{
  height: 75px;
}
</style>