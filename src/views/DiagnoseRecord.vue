<template>
  <div class="diagnoserecord">

    <div class="innerContainer">
      <div id="icon">
        <Icon icon="lucide:clipboard-list" height="60" />
      </div>

      <div class="innertitle">接诊记录表</div>

      <div id="filter">
        <div id="chooser">
          <el-button type="primary" icon="el-icon-aim">选择器</el-button>
        </div>
        <div id="search">
          <el-input></el-input>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>
      </div>


      <div class="table">
        <el-table :data="tableData" stripe style="width: 100%">

          <el-table-column prop="id" label="id" width="180"></el-table-column>
          <el-table-column prop="name" label="名字" width="180"></el-table-column>
          <el-table-column prop="age" label="年龄" width="180"></el-table-column>
          <el-table-column prop="category" label="舰种" width="180"></el-table-column>
          <el-table-column prop="camp" label="阵营" width="180"></el-table-column>
          <el-table-column prop="diagnose" label="诊断结果" width="180"></el-table-column>
          <el-table-column prop="doctor" label="诊断医生" width="180"></el-table-column>
          <el-table-column prop="date" label="日期" width="180"></el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  @click="lookPrescription(scope.$index, scope.row)">查看处方</el-button>
              <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>
    </div>
  </div>
</template>

<script>
import {Icon} from "@iconify/vue2";
export default {
  name: "DiagnoseRecord",
  components:{
    Icon,
  },
  data(){
    return{
      tableData: [{
        id:1,
        name:'长门',
        age:102,
        category:'战列',
        camp:'重樱',
        diagnose:'舰体轻度擦伤',
        doctor:'女灶神',
        date: '2022-08-10',
      },],

    }
  },
  methods:{
    lookPrescription(index, row) {
      console.log(index, row);
    },
    handleDelete(index,row) {
      console.log(index,row);
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(id-1,1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

  }
}
</script>

<style scoped>
.diagnoserecord{
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
#filter{
  position:absolute;
  top:110px;
  right: 200px;
  width: 800px;
  height: 50px;
  display: flex;
  flex-wrap: nowrap;
}
#filter #chooser{
  width: 173px;
  height: 100%;
}
#filter #search{
  width: 630px;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
}
/deep/#filter .el-button{
  height: 100%;
  width: 120px;
}
/deep/#filter .el-input__inner{
  height: 100%;
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