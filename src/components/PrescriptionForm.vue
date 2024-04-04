<template>

<div class="prescriptionForm">

  <el-dialog
      width="900px"
      :visible.sync="isVisible"
      :before-close="handleClose">
    <div id="title">开具处方</div>

    <el-form :model="formData" ref="prescriptionForm" label-position="left">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="名字" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄" prop="age">
            <el-input v-model="formData.age"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="诊断结果" prop="diagnose">
        <el-input type="textarea" v-model="formData.diagnose" rows="8"></el-input>
      </el-form-item>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="开药" prop="drug">
            <el-input v-model="formData.drug"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="剂量" prop="dosage">
            <el-input v-model="formData.dosage"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用法" prop="usage">
            <el-input v-model="formData.usage"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-input type="textarea" rows="8"></el-input>


      <el-form-item label="医嘱" prop="advice">
        <el-input type="textarea" v-model="formData.advice" rows="8"></el-input>
      </el-form-item>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="金额" prop="fare">
            <el-input v-model="formData.fare"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="医生" prop="doctor">
            <el-input v-model="formData.doctor"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="isVisible = false">提交</el-button>
      <el-button @click="isVisible = false">取 消</el-button>
    </span>
  </el-dialog>

</div>
</template>

<script>
export default {
  name: "PrescriptionForm",
  data(){
    return{
      formData:{
        name:'',
        age:'',
        diagnose:'',
        drug:'',
        dosage:'',
        usage:'',
        advice:'',
        fare:'',
        doctor:''
      },
      isVisible:false,
    }
  },
  mounted() {
    this.$bus.$on('changeVisible',()=>{
      this.isVisible=true;
      console.log('成功触发事件');
    })
  },
  beforeDestroy() {
    this.$bus.$off('changeVisible');
    console.log('事件已被销毁');
  },
  methods:{
    submit(){

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
.prescriptionForm{
  width: 900px;
  height: 1250px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: flex-start;
}

#title{
  font-size: 64px;
  font-family: 等线;
  font-weight: bold;
  width: 100%;
  height: 100px;
  text-align: center;
  text-align: center;
}
 /deep/.el-dialog__body{
  padding: 70px;
}
</style>