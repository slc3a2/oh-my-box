<template>
  <div class='fly-box-item'>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name:'FlyBoxItem',
  data:()=>{
    return {}
  }
}
</script>
<style lang="scss">
.fly-box-item{
  width:100vw;
  height:100vh;
  border:1px solid red;
  font-size: 35px;
}
</style>