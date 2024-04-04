<template>
  <div class="top-navi" @click="go">

      <div class="head-shot" :style="`background-image:url(${img})`"></div>

      <div class="title">
        <slot>导航标题</slot>
      </div>

    <div class="myIcon">
      <Icon icon="ic:baseline-maps-home-work" color="rgba(255, 210, 51, 0.5)" height="90" />
    </div>

  </div>
</template>

<script>
import { Icon } from '@iconify/vue2';
export default {
  name: "TopNavi",
  components:{
    Icon,
  },
  props:{
    img:{
      type:String,
      default:require("../assets/head-vestal.jpg")
    },
    to:{
      type:String,
      default:'/home'
    }
  },
  methods:{
    go(){
      this.$router.push({path:this.to});
    }
  }
}
</script>

<style scoped>
.top-navi{
  height: 200px;
  width: 335px;
  display: flex;
  flex-wrap: nowrap;
  background-color: rgba(254, 238, 255, 0.7);
  position:relative;
  border:1px solid rgba(173, 162, 162, 1);
  border-radius: 20px;
}
.top-navi:hover{
  border: 3px solid cornflowerblue;
}
.title{
  font-family:Inter ;
  font-size: 24px;
  text-align: center;
  width: 145px;
  height: 67px;
  line-height: 67px;
  position: absolute;
  left: 110px;
  top:70px;
}
.head-shot{
  width:80px ;
  height: 80px;
  border-radius: 85px;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top:20px;
  left: 20px;
}
.myIcon{
  width: 90px;
  height: 90px;
  position: absolute;
  bottom: 0;
  right:5px;
}

</style>