<template>
  <div class="homecard" :style="style">
    <div class="top">
      <div class="title">
        <div class="icon">
          <Icon :icon="iconType" height="40" />
        </div>
        <div class="text">
          <slot name="title">卡片标题</slot>
        </div>

      </div>
    </div>

    <slot name="body"></slot>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2';
export default {
  name: "HomeCard",
  data(){
    return{

    }
  },
  props:{
    iconType: {
      type: String,
      default:"lucide:bookmark"
    },
    width:{
      type:String,
      default: "400px"
    }
  },
  computed:{
    style(){
      return `width:${this.width}`;
    }
  },
  components:{
    Icon,
  }
}
</script>

<style scoped>
.homecard{
  background-color: rgba(255, 243, 212, 1);
  box-shadow:0px 8px 40px rgba(0, 0, 0, 0.15);
  height: 100%;
  border-radius: 20px;
}
.top{
  width: 100%;
  height: 73px;
  border-bottom: 2px solid black;
}
.title{
  height: 70px;
  margin-top: 10px;
  padding-left:20px ;
  display: flex;
  flex-wrap: nowrap;
}
.icon{
  margin-top: 10px;
  margin-right: 10px;
}
.text{
  line-height: 70px;
  font-size: 32px;
  font-family: Inter;
  text-align: center;
}

</style>