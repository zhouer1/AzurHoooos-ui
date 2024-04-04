<template>
  <el-container>
    <el-aside width="400px">
      <el-menu
          default-active="/chargroom/chargroombusiness"
          class="chargeroomAside"
          router
      >
        <el-menu-item index="/home">
          <span slot="title">主页</span>
        </el-menu-item>
        <el-menu-item index="/chargeroom/chargeroombusiness">
          <span slot="title">门诊业务</span>
        </el-menu-item>
        <el-menu-item index="/chargeroom/income">
          <span slot="title">收入管理</span>
        </el-menu-item>
        <el-menu-item index="/chargeroom/registrationrecord">
          <span slot="title">挂号记录查看</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-main>
      <div class="maintitle">收费室</div>
      <div class="headshot"></div>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "ChargeroomView"
}
</script>

<style scoped>
.el-container{
  height: 100vh;
  background: #FFE5AB;
}
.el-main{
  height: 100vh;
  position: relative;
}
.el-menu-item{
  height: 130px;
  font-family: 等线;
  font-size: 40px;
  font-weight: lighter;
  color:rgba(151, 92, 3, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid white;
}

.chargeroomAside{
  height: 100vh;
  background-color:rgba(254, 238, 255, 0.7);
}
.maintitle{
  position:absolute;
  top:60px;
  left: 110px;
  font-size: 48px;
  font-weight: bold;
  font-family: 等线;
}
.headshot{
  width: 100px;
  height: 100px;
  border-radius: 100px;
  background-image: url("../assets/head-shiranui.jpg");
  position: absolute;
  right: 168px;
  top:40px;
  box-sizing: border-box;
}
.headshot:hover{
  border:2px solid cornflowerblue;
}
</style>