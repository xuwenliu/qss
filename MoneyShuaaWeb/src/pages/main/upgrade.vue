<template>
	<div>
		<y-header><div class="clickMe" @click="goBack"><span></span></div>我要升级 <i style="position: absolute;right: 0.5rem;color: #FB3727;">升级说明</i></y-header>
		<div class="content">
			<div class="upgrade">
				<!--LV1-->
				<div class="lv">
    				<img class="lv-bg" :src="currentBg_lv1"/>
    				<div class="lv-con">
    					<div class="clearfix">
    						<div class="fl">
	    						<p class="f34 fwb lvx" :class="{'lv-color':currentGrade===1}">Lv&nbsp;{{LV1}}</p>
	    						<img class="lv-small" :src="currentBg_lv_lv1" alt="" />
	    					</div>
    					</div>
    					
    					<ul class="f28 date-and-rate">
    						<li><i class="circle-gray" :class="{'circle-black':currentGrade===1}"></i><em>到账日期</em>&nbsp;<span :class="{'currentColor':currentGrade===1}">D+0</span></li>
    						<li><i class="circle-gray" :class="{'circle-black':currentGrade===1}"></i><em>费率</em>&nbsp;<span :class="{'currentColor':currentGrade===1}">0.58%+3 (元)</span></li>
    						
    					</ul>

    				</div>
    			</div>
    			<!--LV2-->
    			<div class="lv" :class="{'minHeight':LV2===2&&currentGrade!=2,'minHeight-checked':currentGrade===2,'minHeight-checked-34':currentGrade===3||currentGrade===4}">
    				<img class="lv-bg" :src="currentBg_lv2" alt="" />
    				<div class="lv-con">
    					<div class="clearfix">
    						<div class="fl">
	    						<p class="f34 fwb lvx" :class="{'lv-color':currentGrade===2}">Lv&nbsp;2</p>
	    						<img class="lv-small" :src="currentBg_lv_lv2" alt="" />
	    					</div>
    					</div>
    					
    					<ul class="f28 date-and-rate">
    						<li><i class="circle-gray" :class="{'circle-black':currentGrade===2}"></i><em :class="{'c-gray':currentGrade===1}">到账日期</em>&nbsp;<span :class="{'currentColor':currentGrade===2}">D+0</span></li>
    						<li><i class="circle-gray" :class="{'circle-black':currentGrade===2}"></i><em :class="{'c-gray':currentGrade===1}">费率</em>&nbsp;<span :class="{'currentColor':currentGrade===2}">0.53%+3 (元)</span></li>
  
    					</ul>
    					<div v-show="currentGrade!=2 && currentGrade!=3 && currentGrade!=4" class="threeChooseOne bb1 bt1 f28">
    						<div class="left">
    							<p>1.邀请5个用户</p>
    							<p>3.收款达30万</p>
    						</div>
    						<div class="center">
    							<p>2.付费88元</p>
    							<p>以上条件3选1</p>
    						</div>
    						<div class="right">
    							<button>升级</button>
    						</div>
    					</div>
    					<div class="profit f22" :class="{'currentColor':currentGrade===2}">每1000万交易，可赚13000.00分润</div>
    				</div>
    			</div>
    			<!--LV3-->
    			<div class="lv" :class="{'minHeight':LV3===3&&currentGrade!=3,'minHeight-checked':currentGrade===3,'minHeight-checked-34':currentGrade===4}">
    				<img class="lv-bg" :src="currentBg_lv3" alt="" />
    				<div class="lv-con">
    					<div class="clearfix">
    						<div class="fl">
	    						<p class="f34 fwb lvx" :class="{'lv-color':currentGrade===3}">Lv&nbsp;3</p>
	    						<img class="lv-small" :src="currentBg_lv_lv3" alt="" />
	    					</div>
    					</div>
    					
    					<ul class="f28 date-and-rate">
    						<li><i class="circle-gray" :class="{'circle-black':currentGrade===3}"></i><em :class="{'c-gray':currentGrade===1 || currentGrade===2}">到账日期</em>&nbsp;<span :class="{'currentColor':currentGrade===3}">D+0</span></li>
    						<li><i class="circle-gray" :class="{'circle-black':currentGrade===3}"></i><em :class="{'c-gray':currentGrade===1 || currentGrade===2}">费率</em>&nbsp;<span :class="{'currentColor':currentGrade===3}">0.45%+3 (元)</span></li>
  
    					</ul>
    					<div v-show="currentGrade!=3 && currentGrade!=4" class="threeChooseOne bb1 bt1 f28">
    						<div class="left">
    							<p>1.邀请20个用户</p>
    							<p>3.收款达50万</p>
    						</div>
    						<div class="center">
    							<p>2.付费388元</p>
    							<p>以上条件3选1</p>
    						</div>
    						<div class="right">
    							<button>升级</button>
    						</div>
    					</div>
    					<div class="profit f22" :class="{'currentColor':currentGrade===3}">每1000万交易，可赚13000.00分润</div>
    				</div>
    			</div>
    			<!--LV4-->
    			<div class="lv">
    				<img class="lv-bg" :src="currentBg_lv4" alt="" />
    				<div class="lv-con">
    					<div class="clearfix">
    						<div class="fl">
	    						<p class="f34 fwb lvx" :class="{'lv-color':currentGrade===4}">Lv&nbsp;4</p>
	    						<img class="lv-small" :src="currentBg_lv_lv4" alt="" />
	    					</div>
	    					<h2 v-show="currentGrade!==4" class="f28 fl">请咨询平台客服</h2>
    					</div>
    					
    					<ul class="f28 date-and-rate">
    						<li v-show="currentGrade===4"><i class="circle-gray" :class="{'circle-black':currentGrade===4}"></i><em>到账日期</em>&nbsp;<span :class="{'currentColor':currentGrade===4}">D+0</span></li>
    						<li v-show="currentGrade===4"><i class="circle-gray" :class="{'circle-black':currentGrade===4}"></i><em>费率</em>&nbsp;<span :class="{'currentColor':currentGrade===4}">0.45%+3 (元)</span></li>
    						
    						<li v-show="currentGrade!==4"><i class="circle-gray" ></i><em :class="{'c-gray':currentGrade===1 || currentGrade===2 || currentGrade===3}">微信</em>&nbsp;<span>qsseposs</span></li>
    						<li v-show="currentGrade!==4"><i class="circle-gray" ></i><em :class="{'c-gray':currentGrade===1 || currentGrade===2 || currentGrade===3}">电话</em>&nbsp;<span>13912345678</span></li>
    					</ul>
    					<div v-show="currentGrade===4" class="profit f22" :class="{'currentColor':currentGrade===4}">每1000万交易，可赚13000.00分润</div>
    				</div>
    			</div>

			</div>
    		

  		</div>
	</div>
  	
</template>
<script>
	import yHeader from '../../components/Header'
  /*mint-ui*/
import {MessageBox} from 'mint-ui';
import {Indicator} from 'mint-ui';
import {Toast} from 'mint-ui';
export default{
    name: 'upgrade',
    components: {
    	yHeader,
    },
    data(){
      	return {
      		defaultImgArr:[
       			require("../../assets/img/imgMain/rank_nomal_bg@2x.png"),//白色背景
       			require("../../assets/img/imgMain/rank_ic@2x.png")//红色LV背景
       		],
       		currentImgArr:[
       			require("../../assets/img/imgMain/rank_now_bg@2x.png"),//黄色背景
       			require("../../assets/img/imgMain/rank_now_ic@2x.png")//黑色LV背景
       		],
       		/*LV1选中时 LV2，LV3白色背景
       		  LV2选中时，LV3白色背景
       		     对应最小高度 .minHeight
       		 * */
       		lv23BigImg:require("../../assets/img/imgMain/rank_full_bg@2x.png"),
       		
       		/*LV2.3.4选中时,黄色背景 
       		* 对应最小高度.minHeight-checked
       		* */
       		lv234BigImg:require("../../assets/img/imgMain/rank_now_full_bg@2x.png"),
      		
      		/*LV3选中时LV2的白色背景，
      		 * LV4选中LV2和LV3白色背景
      		 * 对应最小高度 .minHeight-checked-34
      		 * 
      		 * */
      		lv34BigImg:require("../../assets/img/imgMain/rank_nomal_bg@2x.png"),//此图设计未给出
      		
      		LV1:1,
      		currentBg_lv1:"",
      		currentBg_lv_lv1:"",
      		
      		LV2:2,
      		currentBg_lv2:"",
      		currentBg_lv_lv2:"",
      		
      		LV3:3,
      		currentBg_lv3:"",
      		currentBg_lv_lv3:"",
      		
      		LV4:4,
      		currentBg_lv4:"",
      		currentBg_lv_lv4:"",
      		
       		currentGrade:1,
       		

      	}
    },
    created(){
    	if(this.LV1===1){
    		this.currentBg_lv1 = this.defaultImgArr[0];
    		this.currentBg_lv_lv1 = this.defaultImgArr[1];
    	}
    	if(this.LV2===2){
    		this.currentBg_lv2 = this.lv23BigImg;
    		this.currentBg_lv_lv2 = this.defaultImgArr[1];
    	}
    	if(this.LV3===3){
    		this.currentBg_lv3 = this.lv23BigImg;
    		this.currentBg_lv_lv3 = this.defaultImgArr[1];
    	}
    	if(this.LV4===4){
    		this.currentBg_lv4 = this.defaultImgArr[0];
    		this.currentBg_lv_lv4 = this.defaultImgArr[1];
    	}
    	
		if(this.currentGrade===1){
			this.currentBg_lv1 = this.currentImgArr[0];
			this.currentBg_lv_lv1 = this.currentImgArr[1];
		}
		if(this.currentGrade===2){
			this.currentBg_lv2 = this.lv234BigImg;
			this.currentBg_lv_lv2 = this.currentImgArr[1];
		}
		if(this.currentGrade===3){
			this.currentBg_lv3 = this.lv234BigImg;
			this.currentBg_lv_lv3 = this.currentImgArr[1];
			
			this.currentBg_lv2 = this.lv34BigImg;
		}
		if(this.currentGrade===4){
			this.currentBg_lv4 = this.lv234BigImg;
			this.currentBg_lv_lv4 = this.currentImgArr[1];
			
			this.currentBg_lv2 = this.lv34BigImg;
			this.currentBg_lv3 = this.lv34BigImg;
		}
    },
    mounted(){

    },
    methods: {
     	goBack() {
            this.$router.go(-1);
        },
    },

}

</script>

<style scoped lang="less">
.content {
	top:1.2rem;
}

.c-gray{color: gray !important;}
.lv-color{color: #C49914 !important;}/*LV X选中时字体颜色*/
.circle-black{background-color: #282828 !important;}/*LV X选中时 小圆点背景颜色*/
.currentColor{color:#855F0D !important;}/*LV X选中时 D+0和费率字体颜色*/

/*LV默认最小高度min-height: 3.146666rem; 236px 已经写在CSS里面
 * LV1，LV2，LV3，LV4选中-LV1最小高度
 * */

.minHeight{min-height: 5.573333rem !important;}/*LV1选中-LV2.3背景最小高度，LV2选中-LV3背景最小高度  418px*/

.minHeight-checked{min-height: 3.68rem !important;}/*LV2.3.4选中时背景最小高度276px*/

.minHeight-checked-34{min-height: 3.72rem !important;}/*LV3选中时LV2的最小高度，LV4选中LV2和LV3最小高度*/



.upgrade {
	padding: 0 0.2rem 0 0.226666rem;
}
.lv{
	min-height: 3.146666rem;
	margin-top: 0.213333rem;
	position:relative;
	.lv-bg{
		position: absolute;
		width: 100%;
		display: block;
		top: 0;
		left: 0;
	}
	.lv-con{
		top: 0.64rem;
		left: 0.8rem;
		position: absolute;
		z-index: 1;
		width: 84%;
		.lv-small{
			width: 2.466666rem;
			height: 1.013333rem;
			
		}
		h2{
			margin-left: 0.6rem;
    		line-height: 1rem;
		}
		p.lvx{
			position: absolute;
			z-index: 2;
			top: 0.26rem;
    		left: 1.25rem;
			color: #fff;
		}
		.date-and-rate{
			display: flex;
			li {
				color:#282828;
				i.circle-gray{
					width: 0.133333rem;
					height: 0.133333rem;
					display: inline-block;
					background-color: #bbb;
					border-radius: 50%;
					margin-right: 0.2rem;
					margin-bottom: 0.05rem;
				}
				span{
					color: #FB3727;
					font-weight: bold;
				}
			}
			li:nth-child(2){
				margin-left: 0.96rem;
			}
			li:last-child{
				margin-left: 0.96rem;
			}
		}
		.threeChooseOne {
			display: flex;
    		justify-content: space-around;
    		align-items: center;
    		padding: 0.3rem 0;
    		margin-top: 0.3rem;
    		.left,.center{
    			p:nth-child(2){
    				margin-top: 0.2rem;
    			}
    		}
    		.right{
    			button{
    				width: 2rem;
				    height: 0.7rem;
				    line-height: 0.7rem;
				    text-align: center;
				    background: #fff;
				    border: 1px solid red;
				    border-radius: 0.08rem;
				    color: red;
    			}
    		}
		}
		.profit{
			color: #FB3727;
			/*margin-top: 0.4rem;*/
			margin-top: 0.2rem;
		}
	}
	
	
	
}
</style>
