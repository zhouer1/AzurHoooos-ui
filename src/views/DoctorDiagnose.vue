<template>
<div class="doctordiagnose">

  <div class="innerContainer">
    <div id="icon">
      <Icon icon="lucide:calendar-heart" height="60" />
    </div>

    <div class="innertitle">接诊面板</div>

    <div class="table">
      <el-table :data="tableData" stripe style="width: 100%">

        <el-table-column prop="id" label="id" width="220"></el-table-column>
        <el-table-column prop="name" label="名字" width="220"></el-table-column>
        <el-table-column prop="age" label="年龄" width="220"></el-table-column>
        <el-table-column prop="category" label="舰种" width="220"></el-table-column>
        <el-table-column prop="camp" label="阵营" width="220"></el-table-column>
        <el-table-column prop="date" label="日期" width="220"></el-table-column>
        <el-table-column prop="state" label="状态" width="220">
          <template slot-scope="scope">
            <el-tag type="warning">{{scope.row.state}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleDiagnose(scope.$index, scope.row)">会诊</el-button>
            <el-button
                size="mini"
                type="success"
                @click="handleConfirm(scope.$index)">确认就诊</el-button>
          </template>
        </el-table-column>
      </el-table>
      <PrescriptionForm></PrescriptionForm>
    </div>
  </div>
</div>
</template>

<script>
import {Icon} from "@iconify/vue2";
import PrescriptionForm from "@/components/PrescriptionForm";
export default {
  name: "DoctorDiagnose",
  components:{
    Icon,
    PrescriptionForm,
  },
  data(){
    return{
      tableData: [{
        id:1,
        name:'长门',
        age:102,
        category:'战列',
        camp:'重樱',
        date: '2022-08-10',
        state:'待就诊',
      },],

    }
  },
  methods:{
    handleDiagnose(index, row) {
      console.log(index, row);
      this.$bus.$emit('changeVisible');
    },
    handleConfirm(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(id-1,1)
        this.$message({
          type: 'success',
          message: '确认就诊成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消确认就诊'
        });
      });
    },

  }
}
</script>

<style scoped>
.doctordiagnose{
  position: relative;
}
.innerContainer{
  height: 1114px;
  width: 2003px;
  border-radius: 20px;
  background-color:#fff3d4;
  box-shadow:0px 9px 33px rgba(0, 0, 0, 0.15);
  position: absolute;
  top:155px;
  right:70px;
}
#icon{
  position:absolute;
  left:160px ;
  top:65px;
}
.innertitle{
  position: absolute;
  top:85px;
  left: 240px;
  font-family: 等线;
  font-size: 40px
}

.table{
  width: 1852.5px;
  height: 809px;
  position:absolute;
  top:190px;
  right: 76px;
  background-color: white;
  border-radius: 20px;
  padding: 15px;
}


</style>