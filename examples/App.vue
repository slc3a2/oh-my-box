<template>
  <div id="app">
    <OhMyBox
      :scrollHeight='scrollHeight'
      :quickScrollHeight='quickScrollHeight'
      :scrollDuration='scrollDuration'
      @change='change'
    >
      <OhMyBoxItem v-for='(item, idx) in 5' :key='idx'>{{item}}</OhMyBoxItem>
    </OhMyBox>
  </div>
</template>

<script>
import { OhMyBox, OhMyBoxItem } from '../packages/index.js'
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
		OhMyBox,
		OhMyBoxItem
	}
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
</style>
