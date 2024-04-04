<template>
  <div class="editdialog">
    <el-dialog
        width="600px"
        :visible.sync="isVisible"
        :before-close="handleClose">

      <el-row type="flex" justify="center">
        <el-col :span="24"><div class="title">按舰种选择</div></el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <div class="selectContainer">
            <el-checkbox-group v-model="categoryResult">
              <el-checkbox-button v-for="item in category" :label="item" :key="item">{{item}}</el-checkbox-button>
            </el-checkbox-group>
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="24"><div class="title">按阵营选择</div></el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <div class="selectContainer">
            <el-checkbox-group v-model="campResult">
              <el-checkbox-button v-for="item in camp" :label="item" :key="item">{{item}}</el-checkbox-button>
            </el-checkbox-group>
          </div>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submit">确定</el-button>
           <el-button @click="isVisible = false">取 消</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SelectDialog",
  data(){
    return{
      isVisible:false,
      categoryResult: [],
      campResult: [],
      category:['全部','驱逐', '轻巡', '重巡', '超巡','战巡','战列','航母','轻航','重炮','维修','潜艇','运输'] ,
      camp:['全部','白鹰','皇家','重樱','铁血','东煌','撒丁帝国','北方联合','自由鸢尾','维希教廷'],
    }
  },
  mounted() {
    //由编辑按钮传进来一个row
    this.$bus.$on('changeVisibleOfSelect',()=>{
      this.isVisible=true;
      console.log('成功触发事件');
    })
  },
  beforeDestroy() {
    this.$bus.$off('changeVisibleOfSelect');
    console.log('事件已被销毁');
  },
  methods:{
    submit(){
      // if(this.categoryResult&&this.campResult){
        if(this.categoryResult.includes('全部')&&this.campResult.includes('全部')){
          axios.post('http://localhost:9090/chargeroom/registration/selectbyselector',{
            category:this.category,
            camp:this.camp,
          }).then(res=>{
            console.log('双全部');
            this.$bus.$emit('updateData');
          });
        }else if(this.categoryResult.includes('全部')&&!this.campResult.includes('全部')){
          axios.post('http://localhost:9090/chargeroom/registration/selectbyselector',{
            category:this.category,
            camp:this.campResult,
          }).then(res=>{
            console.log('上全下不全');
            this.$bus.$emit('updateData');
          });
        }else if(!this.categoryResult.includes('全部')&&this.campResult.includes('全部')){
          axios.post('http://localhost:9090/chargeroom/registration/selectbyselector',{
            category:this.categoryResult,
            camp:this.camp,
          }).then(res=>{
            console.log('上不全下全');
            this.$bus.$emit('updateData');
          });
        }else{
          axios.post('http://localhost:9090/chargeroom/registration/selectbyselector',{
            category:this.categoryResult,
            camp:this.campResult,
          }).then(res=>{
            console.log('两个都限制');
            this.$bus.$emit('updateData');
          });
        }
      // }
      this.isVisible=false;
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
.title{
  font-family: 等线;
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
}
.selectContainer{
  margin-bottom: 30px;
}
</style>