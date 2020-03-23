<template>
  <div id="app">
    <FlyBox>
      <FlyBoxItem>
        <section class='item' v-for='(item, idx) in 5' :key='idx'>{{item}}</section>
      </FlyBoxItem>
    </FlyBox>
  </div>
</template>

<script>
import FlyBox from '@/components/FlyBox'
import FlyBoxItem from '@/components/FlyBoxItem'
export default {
  name: 'App',
  components: {
    FlyBox,
    FlyBoxItem
  }
}
</script>

<style lang='scss'>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  .item{
    width:100vw;
    height:100vh;
    background-color:gray;
  }
}
</style>
