<template>
<div class="editdialog">
  <el-dialog
      width="600px"
      :visible.sync="isVisible"
      :before-close="handleClose">
  <el-form :model="formData" ref="editForm" label-position="left" label-width="60px">
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
  </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="isVisible = false">取 消</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import axios from "axios";
export default {
  name: "EditDialog",
  data(){
    return{
      formData:{
        id:'',
        name:'',
        age:'',
        category:'',
        camp:'',
        handler:'',
        fare:'',
        date:''
      },
      isVisible:false,
    }

  },
  mounted() {
    //由修改按钮借助row把该行的数据传到此组件
    this.$bus.$on('changeVisible',(row)=>{
      this.isVisible=true;
      this.formData=row;
    })
  },
  beforeDestroy() {
    this.$bus.$off('changeVisible');
  },
  methods:{
    //提交修改后的结果
    submit(){
      axios.post('http://localhost:9090/chargeroom/registration/edit',this.formData)
          .then(res=>{
            this.$message({
              message:res.data.msg,
              type:'success',
            });
            this.isVisible=false;
          })
          .catch(err=>{
            console.log(err);
            this.$message({
              message:'修改失败',
              type:'error',
            });
            this.isVisible=false;
          });
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    }
  }

}
</script>

<style scoped>

</style>