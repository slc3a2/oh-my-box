<template>
  <div id="app">
    <button @click='scroll(2)'>强制滚动到下标为2的item</button>
    <OhMyBox
      :scrollHeight='scrollHeight'
      :quickScrollHeight='quickScrollHeight'
      :scrollDuration='scrollDuration'
      :clickDuration='clickDuration'
      :clickDistance='clickDistance'
      @change='change'
      @click='click'
      ref='ohmycookie'
    >
      <OhMyBoxItem class='item' v-for='(item, idx) in 5' :key='idx'>{{item}}</OhMyBoxItem>
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
      scrollDuration: 400,
      clickDuration:10,
      clickDistance:30
    }
  },
  methods:{
    change(idx, total, direction){
      console.log(idx, total, direction)
    },
    click(idx, total, direction){
      console.log(idx, total, direction)
    },
    scroll(idx) {
      this.$refs.ohmycookie.forceScrollHandle(idx);
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
