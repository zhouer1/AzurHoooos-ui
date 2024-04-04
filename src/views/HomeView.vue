<template>
  <div class="home">
    <el-header></el-header>
    <div class="container">
      <el-container>

        <el-main>
          <div id="topnavis">
            <top-navi>系统管理</top-navi>
            <top-navi to="/chargeroom">收费室</top-navi>
            <top-navi :img="require('../assets/head-jervis.jpg')" to="/doctor">医生工作站</top-navi>
            <top-navi :img="require('../assets/head-perseus.jpg')">护士工作站</top-navi>
            <top-navi>后勤管理</top-navi>
            <top-navi :img="require('../assets/head-akashi.jpg')" to="/pharmacy">药房管理</top-navi>
            <top-navi>查看病历</top-navi>
          </div>

          <div class="cardContainer">

            <HomeCard width="795px" icon-type="lucide:bookmark">
              <template v-slot:title>最新公告</template>
            </HomeCard>

            <HomeCard width="1220px" icon-type="lucide:alarm-plus">
              <template v-slot:title>今日值班</template>

              <template v-slot:body>
                <div id="cardBody">
                  <ShipCard  v-for="item in shipCard" :key="item.name" :img="item.img">
                    <template v-slot:name>{{item.name}}</template>
                    <template v-slot:extra>{{item.extra}}</template>
                  </ShipCard>
                </div>
              </template>

            </HomeCard>

            <HomeCard width="395px" icon-type="lucide:calendar-clock">
              <template v-slot:title>日历</template>
            </HomeCard>

          </div>

          <div class="visualContainer">

            <HomeCard width="1210px" icon-type="lucide:user">
              <template v-slot:title>七日就诊人数统计</template>
            </HomeCard>

            <HomeCard width="1210px" icon-type="lucide:alert-triangle">
              <template v-slot:title>七日高发病症统计</template>
            </HomeCard>

          </div>

        </el-main>
        <el-footer></el-footer>
      </el-container>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import TopNavi from "@/components/TopNavi";
import HomeCard from "@/components/HomeCard";
import ShipCard from "@/components/ShipCard";
export default {
  name: 'HomeView',
  components: {
    TopNavi,
    HomeCard,
    ShipCard,
  },
  data(){
    return{
      shipCard:[
        {
          name:'英仙座',
          extra:'护士',
          img:require("../assets/head-perseus.jpg")
        },
        {
          name:'明石',
          extra:'医生',
          img:require("../assets/head-akashi.jpg")
        },
        {
          name:'贾维斯',
          extra:'医生',
          img:require("../assets/head-jervis.jpg")
        },
        {
          name:'独角兽',
          extra:'医生',
          img:require("../assets/head-unicorn.jpg")
        },
        {
          name:'金刚',
          extra:'护士',
          img:require("../assets/head-kongo.jpg")
        },
        {
          name:'英勇',
          extra:'护士',
          img:require("../assets/head-valiant.jpg")
        },
        {
          name:'龙凤',
          extra:'医生',
          img:require("../assets/head-ryuho.jpg")
        },
        {
          name:'圣女贞德',
          extra:'医生',
          img:require("../assets/head-jeanned.jpg")
        }
      ]
    }
  },

}
</script>

<style scoped>
.container{
  padding-left:50px ;
  padding-right: 50px;
}
.home{
  background-color: rgba(255, 229, 171, 1);
}
#topnavis{
  padding-top: 20px;
  padding-bottom: 20px;
  width: 100%;
  height:220px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.el-header{
  padding: 0;
  background-color: rgba(255, 159, 138, 1)
}
.el-main{
  padding: 0;
}
.cardContainer{
  height: 411px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin-bottom: 40px;
}
#cardBody{
  margin-left: 75px;
  margin-right: 75px;
  margin-top: 10px;
  height: 300px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
}
.visualContainer{
  height: 570px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}

</style>
