<template>
  <div class="registrationrecord">

    <div class="innerContainer">
      <div id="icon">
        <Icon icon="lucide:clipboard-list" height="60" />
      </div>

      <div class="innertitle">挂号记录表</div>
      <div id="filter">
        <div id="chooser">
          <el-button type="primary" icon="el-icon-aim" @click="selectBySelector">选择器</el-button>
        </div>
        <div id="search">
          <el-autocomplete
              class="inline-input"
              v-model="inputData"
              :fetch-suggestions="querySearch"
              placeholder="请输入舰船名字"
              :trigger-on-focus="false"
              style="width: 100%;height: 100%"
          ></el-autocomplete>
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </div>
      </div>


      <div class="table">
        <el-table :data="tableData" stripe style="width: 100%">

          <el-table-column prop="id" label="id" width="200"></el-table-column>
          <el-table-column prop="name" label="名字" width="200"></el-table-column>
          <el-table-column prop="age" label="年龄" width="200"></el-table-column>
          <el-table-column prop="category" label="舰种" width="200"></el-table-column>
          <el-table-column prop="camp" label="阵营" width="200"></el-table-column>
          <el-table-column prop="handler" label="处理人" width="200"></el-table-column>
          <el-table-column prop="fare" label="金额" width="200"></el-table-column>
          <el-table-column prop="date" label="日期" width="200"></el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">修改</el-button>

              <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>

      <el-pagination
          background
          :page-size="pageSize"
          :total="total"
          layout="prev, pager, next"
          :current-page="currentPage"
          @current-change="handleCurrentChange"
      >
      </el-pagination>

      <EditDialog></EditDialog>
      <SelectDialog></SelectDialog>

    </div>
  </div>
</template>

<script>
import {Icon} from "@iconify/vue2";
import axios from "axios";
import EditDialog from "@/components/EditDialog";
import SelectDialog from "@/components/SelectDialog";
export default {
  name: "RegistrationRecord",
  components:{
    SelectDialog,
    EditDialog,
    Icon,
  },
  data(){
    return{
      tableData: [],
      tableDataInit:[],
      total:20,
      currentPage:1,
      pageSize:14,
      inputData:''
    }
  },
  mounted() {
  //向后端请求第一页的数据，返回tableData,total
    axios.get(`http://localhost:9090/chargeroom/registration/selectbypageInit?page=1&pageSize=${this.pageSize}`)
        .then(res=>{
          this.tableData=res.data.registrationRecordList;
          this.total=res.data.total;
        });
    axios.get('http://localhost:9090/chargeroom/registration/selectall')
        .then(res=>{
          //为了给输入框的名字拿到完整的数据
          this.tableDataInit=res.data.registrationRecords;
        })
    //绑定全局事件总线，此方法用于接收选择器查出来的数据
    this.$bus.$on('updateData',()=>{
      this.currentPage=1
      this.updatePage(this.currentPage);
    })
  },
  //在组件销毁时销毁该方法
  beforeDestroy() {
    this.$bus.$off('updateData');
  },
  methods:{
    //点击选择器时调用，弹出对话框
    selectBySelector(){
      this.$bus.$emit('changeVisibleOfSelect');
    },
    //点击修改时调用，弹出对话框
    handleEdit(index, row) {
      this.$bus.$emit('changeVisible',row);
    },
    //点击删除时调用，进行删除业务
    handleDelete(index,row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.get(`http://localhost:9090/chargeroom/registration/delete?id=${row.id}`)
            .then(res=>{
              this.updatePage(this.currentPage);
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //用于更新表格中展示的数据
    updatePage(p){
      axios.get(`http://localhost:9090/chargeroom/registration/selectbypage?page=${p}&pageSize=${this.pageSize}`)
          .then(res=>{
            this.tableData=res.data.registrationRecordList;
            this.total=res.data.total;
          });
    },
    //用于更新页面时更新表格内容
    handleCurrentChange(page){
      this.currentPage=page;
      this.updatePage(page);
    },
    //这个真的捞，必须搞成和element示例一样的结构才可以
    querySearch(queryString,cb){
      let datas = this.tableDataInit.map((item)=>{
        return {value:item.name}
      });
      let results = queryString ? datas.filter(this.createFilter(queryString)) : datas;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (data) => {
        return (data.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    //模糊查询
    search(){
      axios.get(`http://localhost:9090/chargeroom/registration/selectbyname?name=${this.inputData}`)
          .then(res=>{
            console.log(res);
            this.updatePage(this.currentPage);
          })
    }
  }
}
</script>

<style scoped>
.registrationrecord{
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
/deep/#filter .el-input{
  height: 100%;
}
/deep/#filter .el-input__inner{
  width: 100%;
  height: 100%;
  font-size: 18px;
}

.table{
  width: 1852.5px;
  height: 809px;
  margin-top: 190px;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  border-radius: 20px;
  padding: 15px;
}

.el-pagination{
  float: right;
  margin: 15px 50px 0 0;
}

</style>