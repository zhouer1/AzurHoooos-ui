<template>
  <div class="chargeroombusiness">
    <div class="container">
      <div class="innerContainer">
        <div id="icon">
          <Icon icon="lucide:clipboard-list" height="60" />
        </div>

        <div class="innertitle">挂号表</div>

        <div class="table1">
          <RegistrationForm></RegistrationForm>
        </div>
      </div>

    <div class="innerContainer">
      <div id="icon">
        <Icon icon="lucide:clipboard-list" height="60" />
      </div>

      <div class="innertitle">收费表</div>

      <div class="table2">
        <el-table :data="tableData" stripe style="width: 100%">

          <el-table-column prop="id" label="id" width="80"></el-table-column>
          <el-table-column prop="name" label="名字" width="80"></el-table-column>
          <el-table-column prop="age" label="年龄" width="80"></el-table-column>
          <el-table-column prop="category" label="舰种" width="80"></el-table-column>
          <el-table-column prop="camp" label="阵营" width="80"></el-table-column>
          <el-table-column prop="source" label="来源" width="80"></el-table-column>
          <el-table-column prop="fare" label="金额" width="80"></el-table-column>
          <el-table-column prop="date" label="日期" width="100"></el-table-column>
          <el-table-column prop="state" label="状态" width="90">
            <template slot-scope="scope">
              <el-tag type="warning">{{scope.row.state}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  @click="lookPrescription(scope.$index, scope.row)">收费</el-button>
              <el-button
                  size="mini"
                  type="success"
                  @click="handleDelete(scope.$index,scope.row)">确认收费</el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>
    </div>
    </div>
  </div>
</template>

<script>
import {Icon} from "@iconify/vue2";
import RegistrationForm from "@/components/RegistrationForm";
export default {
  name: "DiagnoseRecord",
  components:{
    Icon,
    RegistrationForm,
  },
  data(){
    return{
      tableData: [{
        id:1,
        name:'长门',
        age:102,
        category:'战列',
        camp:'重樱',
        source:'门诊',
        fare:'50',
        date: '2022-08-10',
        state:'待收费'
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
.chargeroombusiness{
  position: relative;
}
.container{
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  position: absolute;
  top: 155px;
  width: 100%;
}
.innerContainer{
  height: 1114px;
  width: 990px;
  border-radius: 20px;
  background-color:#fff3d4;
  box-shadow:0px 9px 33px rgba(0, 0, 0, 0.15);
  position: relative;
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

.table1{
  width: 493px;
  height: 806px;
  margin-top: 190px;
  margin-left:auto ;
  margin-right: auto;
  background-color: white;
  border-radius: 20px;
  padding: 70px;
  box-sizing: border-box;

}
.table2{
  width: 926px;
  height: 806px;
  margin-top: 190px;
  margin-left:auto ;
  margin-right: auto;
  background-color: white;
  border-radius: 20px;
  padding: 15px;
}


</style>