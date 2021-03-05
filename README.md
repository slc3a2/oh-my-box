## oh-my-box
>A Scroll Component for Vue.js
<div><img width='200px' src='https://i.loli.net/2020/04/17/d9IurLPOT3qWfAv.gif' alt='example image'/></div>

## Links
- [Homepage](https://github.com/llqi/oh-my-box)
- [Bugs](https://github.com/llqi/oh-my-box/issues)
- [Npm](https://www.npmjs.com/package/ohmybox)

## Install
```shell
npm install ohmybox -S
```

## Start
``` javascript
import { OhMyBox, OhMyBoxItem } from 'ohmybox'
import 'ohmybox/lib/ohmybox.css'

<OhMyBox
  :scrollHeight='scrollHeight'
  :quickScrollHeight='quickScrollHeight'
  :scrollDuration='scrollDuration'
  :clickDuration='clickDuration'
  :clickDistance='clickDistance'
  @change='change'
  @click='click'
  ref='ohmybox'
>
  <OhMyBoxItem v-for='(item, idx) in 5' :key='idx'>{{item}}</OhMyBoxItem>
</OhMyBox>
```
## Attributes

<table>
    <tr>
        <th>参数</th>
        <th>说明</th>
        <th>类型</th>
        <th>默认值</th>
    </tr>
    <tr>
        <th>scrollHeight</th>
        <th>触发翻页高度</th>
        <th>Number</th>
        <th>300 (px)</th>
    </tr>
    <tr>
        <th>scrollDuration</th>
        <th>触发翻页滚动时间</th>
        <th>Mumber</th>
        <th>400 (ms)</th>
    </tr>
    <tr>
        <th>quickScrollHeight</th>
        <th>快速滑动时，触发翻页高度</th>
        <th>Number</th>
        <th>20 (px)</th>
    </tr>
    <tr>
        <th>clickDuration</th>
        <th>模拟点击方法touchstart到touchend持续时间</th>
        <th>Number</th>
        <th>10 (ms)</th>
    </tr>
    <tr>
        <th>clickDistance</th>
        <th>模拟点击方法touchstart到touchend移动距离</th>
        <th>Number</th>
        <th>30 (px)</th>
    </tr>
</table>

## Events

<table>
    <tr>
        <th>方法</th>
        <th>说明</th>
        <th>参数</th>
    </tr>
    <tr>
        <th>change</th>
        <th>翻页回调方法</th>
        <th>(当前页下标，总下标，当前项对象)</th>
    </tr>
    <tr>
        <th>click</th>
        <th>点击方法</th>
        <th>(当前页下标，总下标，当前项对象)</th>
    </tr>
    <tr>
        <th>this.$refs.ohmybox.forceScrollHandle</th>
        <th>强制滚动到对应下标item</th>
        <th>(要滚动到的item下标)</th>
    </tr>
</table>



