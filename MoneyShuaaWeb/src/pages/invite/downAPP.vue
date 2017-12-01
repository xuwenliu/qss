<template>
  <div class="bg0">
    <TopHeader>
      <div class="clickMe" @click="goBack"><span></span></div>
      <i>钱刷刷APP下载</i></TopHeader>
    <title>钱刷刷APP下载</title>

    <DialogWindow v-show="isShowWechatDownTips">
      <div class="show-dialog-box" style="justify-content: flex-start;">
        <img style="width: 8rem; height: 5.02666rem;"
             src="../../assets/img/wechatTips.png">
      </div>
    </DialogWindow>

    <div class="downapp-container content-box">
      <img style="margin-top: 1.33333333rem; width: 5.6rem; height: 3.06666667rem" src="../../assets/img/xzy1_text.png">
      <img style="margin-top: 1.06666666rem; width: 6rem; height: 3.73333333rem" src="../../assets/img/ic_bj.png">
      <img style="margin-top: 0.13333333rem; width: 2.49333333rem; height: 0.46666667rem"
           src="../../assets/img/xzy2_text.png">

      <div class="login-button" style="margin-top: 2.4rem; margin-bottom: 2.4rem; width: 8.4266666rem;">
        <button class="fc0 f28" style="width: 100%" :class="{'login-button-n':true}" @click="downloadApp">立即下载

        </button>
      </div>
    </div>
  </div>
</template>

<script>

  import TopHeader from '../../components/Header'
  import DialogWindow from '../../components/DialogWindow'

  import {Indicator} from 'mint-ui';
  import {MessageBox} from 'mint-ui';

  export default {
    name: 'downAPP',
    components: {
      TopHeader,
      DialogWindow
    },
    data() {
      return {
        pageNum: 1, //当前页数
        allLoaded: false,
        bottomStatus: "",
        isShowInputDialog: false,
        currentRemark: null,
        channelUserId: 0,
        develops: [],
        developInfo: {
          "rate": 0,
          "developCount": 0,
          "parentUserId": 0,
          "existedParent": false,
          "parentName": "",
          "parentPhone": ""
        },
        showToast: false,
        shareToInvite: false,

        isShowWechatDownTips: false
      }
    },
    created() {

    },
    mounted() {
    },
    methods: {

      goBack(){
        this.$router.go(-1);
      },

      downloadApp() {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        // 判断是否为微信
        var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
        // 是否在微信内打开
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          this.isShowWechatDownTips = true;
          return
        }
        //Android接口
        if (isAndroid) {
          window.location.href = "http://o7zlnyltf.bkt.clouddn.com/moneycome-release.apk";
            }
        //iOS接口
        if (isiOS) {
          window.location.href = "http://itunes.apple.com/us/app/id1305790097";
        }

//        window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.yingwumeijia.moneycome";
      }
    }, //methods结束
  }
</script>

<style scoped lang="less">
  .downapp-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .succTip {
    width: auto;
    text-align: center;
    height: 0.48rem;
    line-height: 0.48rem;
    font-size: 0.37333rem;
    color: #f56d9d;
    margin-top: 1rem;
  }
</style>
