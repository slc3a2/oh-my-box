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
		}

	},
	computed: {
	},
	data: () => {
		return {
			startTime: 0, // 滚动开始时间戳
			page: 0, // 当前item下标
			defaultItemHeight: window.innerHeight, // 默认item高度
			initialPosition: 0, // 每次 touchStart 滑动前的初始位置
			currentPosition: 0, // touchMove 过程中的实际位置
			startY: 0 // touchstart 开始是，手指触控点y轴位置
		}
	},
	created() {
	},
	activated() {
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
			let translate = this.initialPosition + deltaY
			this.currentPosition = translate
		},
		touchEnd(e) {
			this.$refs.swiperContainter.classList.add('trans')
			let t = e.changedTouches[0].pageY
			let endTime = new Date().getTime()
			if (endTime - this.startTime < 10 && this.startY < 30) {
				console.log('模拟点击事件')
				return
			}
			if (endTime - this.startTime < this.scrollDuration) {
				if (t - this.startY > this.quickScrollHeight) {
					this.prevHandle()
				} else if (this.startY - t > this.quickScrollHeight) {
					this.nextHandle()
				} else {
					this.resetOffsetHandle()
					console.log('符合时间操作 但是不符合最短距离')
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
			// if (this.total === this.page + 1) {
			// 	this.resetOffsetHandle()
			// 	// 到底部 加载更多
			// 	return
			// }
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
			this.currentPosition = -this.page * (this.itemHeight || this.defaultItemHeight)
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
