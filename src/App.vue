<template>
  <div id="app">
    <FlyBox
      :scrollHeight='scrollHeight'
      :quickScrollHeight='quickScrollHeight'
      :scrollDuration='scrollDuration'
      @change='change'
    >
      <FlyBoxItem v-for='(item, idx) in 5' :key='idx'>
        
      </FlyBoxItem>
    </FlyBox>
  </div>
</template>

<script>
import FlyBox from '@/components/FlyBox'
import FlyBoxItem from '@/components/FlyBoxItem'
export default {
  name: 'App',
  data:()=>{
    return {
      scrollHeight:300,
      quickScrollHeight:20,
      scrollDuration: 400
    }
  },
  methods:{
    change(idx, total, direction){
      console.log(idx, total, direction)
    }
  },
  components: {
    FlyBox,
    FlyBoxItem
  }
}
</script>

<style lang='scss'>
*{
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
