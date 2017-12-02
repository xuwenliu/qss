<template>
	<div>
		<y-header>
			<div class="clickMe" @click="goBack"><span></span></div>朋友圈推广文案</y-header>
		<div class="content">
			<div v-for="(data, dataIndex) in datas">
				<div class="year c28">{{data.year}}年</div>
				<div class="item" v-for="(item, itemIndex) in data.items" :class="{'auto-height' : item.isSpread}">
					<div class="item-left"><span class="f34 c28">{{item.day}}</span>&nbsp;<span class="f24 gray">{{item.month}}月</span></div>
					<div class="desc">
						<p class="f28 gray" :class="{'auto-height' : item.isSpread, 'default-height' : !item.isSpread}">{{item.text}}</p>
						<button class="f28 btn-more" :class="{fl : !(item.images && item.images.length)}" @click="contentToggle(dataIndex, itemIndex)">{{item.isSpread ? '收起' : '更多'}}</button>
						<div class="image">
							<img v-for="(image, index) in item.images" :src="image" :class="{'pl':index % 3 !=0}">
						</div>
						<button class="btn-tool f24 gray">复制文案</button>
						<button class="btn-tool f24 gray"  v-show="item.images && item.images.length!=0">保存图片</button>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>
<script>
	import yHeader from '../../components/Header'
	/*mint-ui*/
	import { MessageBox } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	export default {
		name: 'generalize',
		components: {
			yHeader,
		},
		data() {
			return {
				datas: [{
						year: '2017',
						items: [
							{
								day: '23',
								month: '10',
								text: '文案，原指放书的桌子，后来指在桌子上写字的人。现在指的是公司或企业中从事文字工作的职位，就是以文字来表现已经制定的创意策略。文案它不同于设计师用画面或其他手段的表现手法，它是一个与广告创意先后相继的表现的过程、发展的过程、深化的过程， 多存在于广告公司，企业宣传，新闻策划等。',
							}, 
							{
								day: '22',
								month: '10',
								text: '文案，原指放书的桌子，后来指在桌子上写字的人。现在指的是公司或企业中从事文字工作的职位，就是以文字来表现已经制定的创意策略。文案它不同于设计师用画面或其他手段的表现手法，它是一个与广告创意先后相继的表现的过程、发展的过程、深化的过程， 多存在于广告公司，企业宣传，新闻策划等。',
								images: [
									'http://img1.imgtn.bdimg.com/it/u=989341999,236255160&fm=27&gp=0.jpg',
									'http://img1.imgtn.bdimg.com/it/u=989341999,236255160&fm=27&gp=0.jpg',
									'http://img1.imgtn.bdimg.com/it/u=989341999,236255160&fm=27&gp=0.jpg',
									'http://img1.imgtn.bdimg.com/it/u=989341999,236255160&fm=27&gp=0.jpg',
									'http://img1.imgtn.bdimg.com/it/u=989341999,236255160&fm=27&gp=0.jpg',
									'http://img1.imgtn.bdimg.com/it/u=989341999,236255160&fm=27&gp=0.jpg',
									'http://img1.imgtn.bdimg.com/it/u=989341999,236255160&fm=27&gp=0.jpg',
									'http://img1.imgtn.bdimg.com/it/u=989341999,236255160&fm=27&gp=0.jpg',
									
								]
							}
						]
					}

				],

			}
		},
		created() {

		},
		mounted() {

		},
		methods: {
			goBack() {
				this.$router.go(-1);
			},
			contentToggle(dataIndex, itemIndex) {
				if (this.datas[dataIndex].items[itemIndex].hasOwnProperty('isSpread')) {
					this.datas[dataIndex].items[itemIndex].isSpread = !this.datas[dataIndex].items[itemIndex].isSpread;
				} else {
					this.$set(this.datas[dataIndex].items[itemIndex], 'isSpread', true);
				}
				
			}

		},

	}
</script>

<style scoped lang="less">
	.content {
		top: 1.2rem;
		background-color: #fff;
		.c28 {
			color: #282828;
		}
		.gray {
			color: gray;
		}
		.year {
			padding-left: 0.50666rem;
			padding-top: 0.58666rem;
			padding-bottom: 0.12rem;
			font-size: 0.64rem;
		}
		.item {
			padding: 0.54666rem 0.64rem 0 0.50666rem;
			display: flex;
			justify-content: space-between;
			.item-left{
				display: flex;
			}
			.desc {
				width: 81%;
				.default-height {
					
					height: 1.96rem;
					overflow: hidden;
				}
				.auto-height {
					height: auto;
				}
				p {
					/*margin-top: 0.4rem;*/
				}
				button {
					margin-top: 0.28rem;
					margin-right: 0.2rem;
				}
				button:nth-last-child(1) {
					margin-right: 0.32rem;
				}
				.btn-more {
					background: none;
					color: #FF293C;
				}
				.btn-tool {
					width: 1.70666rem;
					height: 0.62666rem;
					border-radius: 2.2rem;
					background: none;
					border: 0.02666rem solid gray;
					float: right;
				}
				.image{
				    margin-top: .2rem;
				    font-size: 0;
					img {
						width: 2.27rem;
						height: 2.27rem;
						margin-bottom: 0.09333rem;
					}
					
					.pl {
						padding-left: 0.09333rem;
					}
				}
			}
		}
	}
</style>