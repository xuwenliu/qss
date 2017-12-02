<template>
	<div>
		<y-header>
			<div class="clickMe" @click="goBack"><span></span></div>朋友圈推广文案</y-header>
		<div class="content">
			<div v-for="(data, dataIndex) in datas">
				<div class="year c28">{{data.year}}年</div>
				<div class="item" v-for="(item, itemIndex) in data.items" v-bind:class="{'auto-height' : item.isSpread}">
					<div><span class="f34 c28">{{item.day}}</span>&nbsp;<span class="f24 gray">{{item.month}}月</span></div>
					<div class="desc">
						<p class="f28 gray" v-bind:class="{'auto-height' : item.isSpread, 'default-height' : !item.isSpread}">{{item.text}}</p>
						<button class="f28 btn-more" v-bind:class="{fl : !(item.images && item.images.length)}" @click="contentToggle(dataIndex, itemIndex)">{{item.isSpread ? '收起' : '展开'}}</button>
						<div>
							<img v-for="(image, index) in item.images" v-bind:src="image" v-bind:class="{pl : (index % 3 != 0)}">
						</div>
						<button class="btn-tool f24 gray">复制文案</button>
						<button class="btn-tool f24 gray"  v-show="item.images && item.images.length">保存图片</button>
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
						items: [{
							day: '23',
							month: '10',
							text: '文案，原指放书的桌子，后来指在桌子上写字的人。现在指的是公司或企业中从事文字工作的职位，就是以文字来表现已经制定的创意策略。文案它不同于设计师用画面或其他手段的表现手法，它是一个与广告创意先后相继的表现的过程、发展的过程、深化的过程， 多存在于广告公司，企业宣传，新闻策划等。',
						}, {
							day: '22',
							month: '10',
							text: '文案，原指放书的桌子，后来指在桌子上写字的人。现在指的是公司或企业中从事文字工作的职位，就是以文字来表现已经制定的创意策略。文案它不同于设计师用画面或其他手段的表现手法，它是一个与广告创意先后相继的表现的过程、发展的过程、深化的过程， 多存在于广告公司，企业宣传，新闻策划等。',
							images: ['http://pic16.nipic.com/20110822/5105171_212149369384_2.jpg',
								'http://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=%E8%9D%8E%E5%AD%90%E5%9B%BE%E7%89%87&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&cs=3792023088,1514294382&os=835292285,206492977&simid=3452832667,361194448&pn=1&rn=1&di=165254109680&ln=1966&fr=&fmq=1512142497996_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&hs=2&objurl=http%3A%2F%2Fa2.att.hudong.com%2F72%2F36%2F01300000164460121023360769331.jpg&rpstart=0&rpnum=0&adpicid=0',
								'http://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=%E8%9D%8E%E5%AD%90%E5%9B%BE%E7%89%87&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&cs=1937815589,470263601&os=2030200904,138387548&simid=3316168903,296323871&pn=2&rn=1&di=96578484860&ln=1966&fr=&fmq=1512142497996_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&hs=2&objurl=http%3A%2F%2Fimg.warting.com%2Fallimg%2F2015%2F0728%2F150728vm3aus35lje.jpg&rpstart=0&rpnum=0&adpicid=0',
								'http://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=%E8%9D%8E%E5%AD%90%E5%9B%BE%E7%89%87&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&cs=3724124599,4122827736&os=115397741,2662085119&simid=4206297884,750312746&pn=3&rn=1&di=40387532570&ln=1966&fr=&fmq=1512142497996_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&hs=2&objurl=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F38%2F75%2F62958PICGAu_1024.jpg&rpstart=0&rpnum=0&adpicid=0',
								'http://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=%E8%9D%8E%E5%AD%90%E5%9B%BE%E7%89%87&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&cs=4066931735,2302564271&os=1228253665,3566192321&simid=3436006478,314679152&pn=4&rn=1&di=151178921190&ln=1966&fr=&fmq=1512142497996_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&hs=2&objurl=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F38%2F40%2F82h58PICkwV_1024.jpg&rpstart=0&rpnum=0&adpicid=0'
							]
						}]
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
		background-color: white;
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
			.desc {
				width: 81%;
				.default-height {
					height: 2.1rem;
					overflow: hidden;
				}
				.auto-height {
					height: auto;
				}
				p {
					margin-top: 0.2rem;
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
				.fl {
					float: left;
				}
				.btn-tool {
					width: 1.70666rem;
					height: 0.62666rem;
					border-radius: 2.2rem;
					background: none;
					border: 0.02666rem solid gray;
					float: right;
				}
				div {
					img {
						width: 2.27rem;
						height: 2.27rem;
					}
					.pl {
						padding-left: 0.09333rem;
					}
				}
			}
		}
	}
</style>