<template>
	<section id="ohmybox-component">
		<div
			class="ohmybox-gesture"
			ref="ohmyboxContainter"
			@touchstart.stop="touchStart"
			@touchmove.stop="touchMove"
			@touchend.stop="touchEnd"
			@touchcancel.stop="touchEnd"
			:style="{ webkitTransform: 'translate3d(0,' + currentPosition + 'px,0)' }"
		>
			<div class="ohmybox-item-wrap">
				<slot></slot>
			</div>
		</div>
	</section>
</template>
<script>
export default {
	name:'ohmybox',
	props: {
		// 翻页距离阈值 超过可视距离切换页面 否则回到原来位置 单位px
		scrollHeight: {
			default: function() {
				return 300
			}
		},
		// 快速滑动过程中翻页距离阈值
		quickScrollHeight: {
			default: function() {
				return 20
			}
		},
		// 模拟点击起始点和结束点操作持续时间
		clickDuration:{
			default: function() {
				return 10
			}
		},
		// 模拟点击起始点和结束点距离
		clickDistance:{
			default: function() {
				return 30
			}
		},
		// 滚动时间持续 小于这个值 会直接翻页 否则回到原来位置 单位 毫秒
		scrollDuration: {
			default: function() {
				return 400
			}
		},
		// item高度 
		itemHeight: {
			default: function() {
				return 0
			}
		},
		change: {
			default: ()=>{}
		},
		click: {
			default: ()=>{}
		}
	},
	data: () => {
		return {
			startTime: 0, // 滚动开始时间戳
			page: 0, // 当前item下标
			defaultItemHeight: window.innerHeight, // 默认item高度
			initialPosition: 0, // 每次 touchStart 滑动前的初始位置
			currentPosition: 0, // touchMove 过程中的实际位置
			startY: 0, // touchstart 开始是，手指触控点y轴位置
			direction: ''
		}
	},
	created() {
		this.resetOffsetHandle()
	},
	mounted() {
		window.addEventListener("resize",this.onresize);
	},
	activated() {
		this.resetOffsetHandle()
	},
	methods: {
		touchStart(e) {
			this.$refs.ohmyboxContainter.classList.remove('trans')
			this.startTime = new Date().getTime()
			this.startY = e.touches[0].pageY
			this.initialPosition = this.currentPosition // 本次滑动前的初始位置
		},
		touchMove(e) {
			let deltaY = e.touches[0].pageY - this.startY
			let translate = this.initialPosition + deltaY
			this.currentPosition = translate
		},
		touchEnd(e) {
			this.$refs.ohmyboxContainter.classList.add('trans')
			let t = e.changedTouches[0].pageY
			let endTime = new Date().getTime()
			if (endTime - this.startTime < this.clickDuration && t - this.startY < this.clickDistance) {
				// console.log('模拟点击事件')
				let itemLength = document.querySelector('.ohmybox-item-wrap').children.length;
				this.$emit('click', this.page, itemLength, this._self)
				return;
			}
			if (endTime - this.startTime < this.scrollDuration) {
				if (t - this.startY > this.quickScrollHeight) {
					this.prevHandle()
				} else if (this.startY - t > this.quickScrollHeight) {
					this.nextHandle()
				} else {
					this.resetOffsetHandle()
					// console.log('符合时间操作 但是不符合最短距离')
				}
			} else {
				let offset = t - this.startY
				if (offset > this.scrollHeight) {
					this.prevHandle()
				} else if (-offset > this.scrollHeight) {
					this.nextHandle()
				} else {
					this.resetOffsetHandle()
				}
			}
		},
		// 下一页
		nextHandle() {
			this.direction = 'next';
			let itemLength = document.querySelector('.ohmybox-item-wrap').children.length;
			if(itemLength == this.page + 1){
				// 到达底部
				this.resetOffsetHandle()
				this.$emit('change', itemLength, itemLength, this._self)
			}else{
				this.page++
				this.resetOffsetHandle()
				this.$emit('change', this.page, itemLength, this._self)
			}
		},
		// 上一页
		prevHandle() {
			this.direction = 'prev';
			let itemLength = document.querySelector('.ohmybox-item-wrap').children.length;
			if (this.page <= 0) {
				// 到达顶部
				this.page = 0
				this.$emit('change', this.page, itemLength, this._self)
				this.resetOffsetHandle()
			}else{
				this.page--
				this.resetOffsetHandle()
				this.$emit('change', this.page, itemLength, this._self)
			}
		},
		// 重置偏移量
		resetOffsetHandle() {
			this.currentPosition = -this.page * (this.itemHeight || this.defaultItemHeight)
		},
		// 页面窗口改变重置item高度
		onresize() {
			this.defaultItemHeight = window.innerHeight;
		},
		// 强制滑动到对应下标item位置
		forceScrollHandle(idx) {
			if(idx) {
				this.page = idx;
				this.currentPosition = -this.page * (this.itemHeight || this.defaultItemHeight)
			}
		}
	}
}
</script>
<style scoped>
#ohmybox-component {
	position: fixed;
	overflow: hidden;
	width:100vw;
	height:100vh;
}
.ohmybox-gesture {
	-webkit-transform: translate3d(0, 0, 0);
	-webkit-backface-visibility: hidden;
	-webkit-perspective: 1000;
	will-change: --webkit-transform;
}
.trans {
	-webkit-transition: all 0.3s ease-out;
}
</style>
