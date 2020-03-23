<template>
	<section id="fly-box-component">
		<div
			class="swiper-gesture"
			ref="swiperContainter"
			@touchstart.stop="touchStart"
			@touchmove.stop="touchMove"
			@touchend.stop="touchEnd"
			@touchcancel.stop="touchEnd"
			:style="{ webkitTransform: 'translate3d(0,' + currentPosition + 'px,0)' }"
		>
			<div class="swiper-item-wrap">
				<slot></slot>
			</div>
		</div>
	</section>
</template>
<script>
export default {
	props: {
		//
		threshold: {
			default: function() {
				return 0.1
			}
		},
		// 滚动时间持续 小于这个值 会直接翻页 否则回到原来位置 单位 毫秒
		scrollDuration: {
			default: function() {
				return 400
			}
		},
		total: {
			default: function() {
				return null
			}
		}
	},
	computed: {
	},
	data: () => {
		return {
			thresholdHeight: 100, // 翻页距离阈值 超过可视距离切换页面 否则回到原来位置
			startTime: 0, // 滚动开始时间戳
			page: 0, // 当前item下标
			clientH: window.innerHeight, // 可视区域高
			initialPosition: 0, // 每次 touchStart 滑动前的初始位置
			currentPosition: 0, // touchMove 过程中的实际位置
			startY: 0 // touchstart 开始是，手指触控点y轴位置
		}
	},
	created() {
	},
	activated() {
		this.clientH = window.innerHeight
		this.resetOffsetHandle()
	},
	methods: {
		touchStart(e) {
			this.$refs.swiperContainter.classList.remove('trans')
			this.startTime = new Date().getTime()
			this.startY = e.touches[0].pageY
			this.initialPosition = this.currentPosition // 本次滑动前的初始位置
		},
		touchMove(e) {
			let deltaY = e.touches[0].pageY - this.startY
			// 当前需要移动的位置
			let translate = this.initialPosition + deltaY
			this.currentPosition = translate
		},
		touchEnd(e) {
			// e.preventDefault();
			this.$refs.swiperContainter.classList.add('trans')
			let t = e.changedTouches[0].pageY
			let endTime = new Date().getTime()
			if (endTime - this.startTime < 10 && this.startY < 30) {
				// console.log('阻断touch事件 执行click handle 暂停')
				return
			}
			if (endTime - this.startTime < this.scrollDuration) {
				// console.log('操作时间符合')
				if (t - this.startY > 20) {
					this.prevHandle()
				} else if (this.startY - t > 20) {
					this.nextHandle()
				} else {
					this.resetOffsetHandle()
					// console.log('符合时间操作 但是不符合最短距离')
				}
			} else {
				let offset = t - this.startY
				if (offset > this.thresholdHeight) {
					this.prevHandle()
				} else if (-offset > this.thresholdHeight) {
					this.nextHandle()
				} else {
					this.resetOffsetHandle()
					// console.log('无效操作')
				}
			}
		},
		// 下一页
		nextHandle() {
			if (this.total === this.page + 1) {
				this.resetOffsetHandle()
				// 到底部 加载更多
				// TODO: 测试加载更多之后的UI样式
				return
			}
			this.page++
			this.resetOffsetHandle()
			this.$emit('change', this.page)
		},
		// 上一页
		prevHandle() {
			console.log('上一页')
			if (this.page <= 0) {
				// 到顶部 下拉刷新
				// TODO: 下拉刷新
				this.page = 0
				this.resetOffsetHandle()
				return
			}
			this.page--
			this.resetOffsetHandle()
			this.$emit('change', this.page)
		},
		// 重置偏移量
		resetOffsetHandle() {
			this.currentPosition = -this.page * this.clientH
		},
		//暂停播放方法
		playerToggle() {}
	},
	components: {}
}
</script>
<style lang="scss">
#fly-box-component {
	position: relative;
	overflow: hidden;
	.swiper-gesture {
		-webkit-transform: translate3d(0, 0, 0);
		-webkit-backface-visibility: hidden;
		-webkit-perspective: 1000;
		will-change: --webkit-transform;
	}
	.trans {
		-webkit-transition: all 0.3s ease-out;
	}
}
</style>
