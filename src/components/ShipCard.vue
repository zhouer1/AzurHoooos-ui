<template>
  <div class="shipcard">
    <div class="headshot" :style="`background-image:url(${img})`"></div>
    <div class="name">
      <slot name="name"></slot>
    </div>
    <div class="extra">
      <slot name="extra"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShipCard",
  props: {
    img:{
      type:String,
      default:require("../assets/head-perseus.jpg"),
    }
  }
}
</script>

<style scoped>
.shipcard{
  width: 251px;
  height: 88px;
  border-radius: 15px;
  position: relative;
  background-color: white;
  margin: 8px;
}
.headshot{
  position: absolute;
  left: 19px;
  top: 5px;
  width: 76.8px;
  height: 76.8px;
  border-radius: 76.8px;
  background-size: cover;
  background-repeat: no-repeat;
}
.name{
  position:absolute;
  font-size:24.2px;
  font-family:Inter;
  left:117px;
  top:20px;
}
.extra{
  position: absolute;
  font-size: 16px;
  font-family: Inter;
  left: 117px;
  top:55px;
  color: rgba(131, 131, 131, 1);
}
</style>