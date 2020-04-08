<template>
  <div class='ohmybox-item'>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name:'ohmybox-item',
  data:()=>{
    return {}
  }
}
</script>
<style lang="scss">
.ohmybox-item{
  width:100vw;
  height:100vh;
}
</style>