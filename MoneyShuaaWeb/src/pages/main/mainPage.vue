<template>
  <div style="padding-bottom: 1.6rem">

    <DialogWindow v-show="false">
      <div class="mainPage-no-identity-pop">
        <img class="imageClose" src="../../assets/img/imgMain/popup_close_ic@2x.png"/>
        <div style="color: #282828;" class="f34">温馨提示</div>
        <img class="imageIdentity" src="../../assets/img/imgMain/popup_wxts_ic@2x.png"/>
        <div class="mainpage-identity-message f28">您尚未进行实名认证，提交认证 资料后，才能使用该功能</div>
        <div class="mainpage-identity-button f28">前去认证</div>
      </div>
    </DialogWindow>

    <div class="mainPage-Header">
      <img src="../../assets/img/imgMain/qss_logo@2x.png"/>
    </div>
    <!--快捷收款-->
    <div class="mainPage-quick-pay bb1">
      <div class="mainPage-quick-pay-subItems">
        <div class="mainPage-quick-pay-subItems-icon f30 fc0">快捷收款</div>
        <div class="f24" style="color: #BBBBBB">收款后无需提现，奖金将直接转入结算银行卡</div>
      </div>
    </div>
    <!--交易记录 我的收益-->
    <div class="mainPage-pay-collect-log bb1">
      <div class="mainPage-pay-collect-log-item">
        <div class="mainPage-pay-collect-log-item-container">
          <div class="mainPage-pay-collect-log-item-title f24">累计收款(元)</div>
          <div class="mainPage-pay-collect-log-item-amount f36 textcut">12312312312312312312312312312312312123.12</div>
          <div class="mainPage-pay-collect-log-item-button f28">交易记录</div>
        </div>
      </div>
      <div class="mainPage-pay-collect-log-vtical-line"></div>
      <div class="mainPage-pay-collect-log-item">
        <div class="mainPage-pay-collect-log-item">
          <div class="mainPage-pay-collect-log-item-container">
            <div class="mainPage-pay-collect-log-item-title f24">今日收益(元)</div>
            <div class="mainPage-pay-collect-log-item-amount f36 textcut">12123.12</div>
            <div class="mainPage-pay-collect-log-item-button f28">我的收益</div>
          </div>
        </div>
      </div>
    </div>
    <!--列表跳转-->
    <div class="mainPage-table-items bb1">
      <div class="mainPage-table-item">
        <div class="mainPage-table-imageContainer">
          <img style="width: 0.50666666rem;height: 0.42666666rem;margin-left: 0.1rem;" src="../../assets/img/imgMain/home_wdxj_ic@2x.png"/>
        </div>
        <div class="mainPage-table-item-right bb1">
          <div class="f28">我的下级</div>
          <img class="mainPage-table-item-right-arrow" src="../../assets/img/imgMain/more_ic@2x.png">
        </div>
      </div>
      <div class="mainPage-table-item">
        <div class="mainPage-table-imageContainer">
          <img style="width: 0.4rem;height: 0.4533333333rem;margin-left: 0.1rem;" src="../../assets/img/imgMain/home_fygz_ic@2x.png"/>
        </div>
        <div class="mainPage-table-item-right bb1">
          <div class="f28">分佣规则说明</div>
          <img class="mainPage-table-item-right-arrow" src="../../assets/img/imgMain/more_ic@2x.png">
        </div>
      </div>
      <div class="mainPage-table-item">
        <div class="mainPage-table-imageContainer">
          <img style="width: 0.48rem;height: 0.48rem;margin-left: 0.1rem;" src="../../assets/img/imgMain/home_wysj_ic@2x.png"/>
        </div>
        <div class="mainPage-table-item-right">
          <div class="f28">我要升级</div>
          <div class="mainPage-table-item-updage-arrow">
            <span v-show="true" class="f26" style="color: #FFA842">当前等级 Lv1</span>
            <img class="mainPage-table-item-right-arrow" src="../../assets/img/imgMain/more_ic@2x.png">
          </div>
        </div>
      </div>
    </div>
    <!--广告-->
    <div class="mainPage-advertisement bb1">
      <div class="mainPage-advertisement-banner">
        <div class="mainPage-advertisement-banner-item">
          <img src="../../assets/img/imgMain/fxjc_title_left_line.png">
          <div class="f28">发现精彩</div>
          <img src="../../assets/img/imgMain/fxjc_title_right_line.png">
        </div>
      </div>
      <div class="mainPage-advertisement-pictures">

        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="item in slideshowImg" :key="item">
            <img :src="item" alt="" />
          </swiper-slide>
        </swiper>

      </div>
    </div>
  </div>
</template>
<script>

  require('swiper/dist/css/swiper.css')
  import { swiper,swiperSlide} from 'vue-awesome-swiper'

  import DialogWindow from '../../components/DialogWindow'
  import {MessageBox} from 'mint-ui';
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';

  export default{
    name: 'mainPage',
    components: {
      DialogWindow,
      swiper,
      swiperSlide,
    },
    data(){
      return {
        slideshowImg:[
          `http://osz2pnx97.bkt.clouddn.com/ad_pic_1@2x.png?${window.Host.imgSize_big_750}`,
          `http://osz2pnx97.bkt.clouddn.com/ad_pic_2@2x.png?${window.Host.imgSize_big_750}`,
        ],
        swiperOption: {
          speed: 1000,
          autoplay: true,
          loop:true,
          autoplayDisableOnInteraction:false,
        },
      }
    },

    created(){

    },

    methods: {
    },

  }

</script>

<style scoped lang="less">

  .mainPage-no-identity-pop {
    width: 8.32rem;
    height: 7.5rem;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    .imageClose {
      width:0.3466666666rem;
      height:0.3466666666rem;
      display: block;
      align-self: flex-end;
      margin-top: 0.293333333rem;
      margin-right: 0.32rem;
      margin-bottom: 0.2rem;
    }
    .imageIdentity {
      width: 2.893333333rem;
      height: 1.8133333333rem;
      display: block;
      margin-top: 0.72rem;
      margin-bottom: 0.48rem;
    }
    .mainpage-identity-message {
      color: #282828;
      width: 5.2133333333rem;
      text-align: center;
    }
    .mainpage-identity-button {
      margin-top: 0.52rem;
      width: 6.48rem;
      height: 0.9333333333rem;
      background-color: #FB3727;
      text-align: center;
      line-height: 0.9333333333rem;
      color: white;
      border-radius: 0.08rem;
    }
  }

  .mainPage-Header {
    background: #fff;
    height: 1.18666667rem;
    z-index: 100;
    position: fixed;
    top: 0;
    border-bottom: 2px solid #e6e6e6;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 1.77333333rem;
      height: 0.52rem;
    }
  }

  /*quick pay*/
  .mainPage-quick-pay {
    padding-top: 1.18666667rem;
    height: 3.62666667rem;
    background: #fff;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .mainPage-quick-pay-subItems {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .mainPage-quick-pay-subItems-icon {
    background-color: #FB3727;
    width: 3.18666666rem;
    height: 0.93333333rem;
    text-align: center;
    line-height: 0.93333333rem;
    border-radius: 0.93333333rem;
    margin-bottom: 0.37333333rem;
  }

  /*log collection*/
  .mainPage-pay-collect-log {
    height: 3.14666667rem;
    background: #fff;
    width: 100%;
    margin-bottom: 0.32rem;
    display: flex;
    align-items: center;
  }
  .mainPage-pay-collect-log-item {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .mainPage-pay-collect-log-item-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .mainPage-pay-collect-log-item-title {
    padding-bottom: 0.3066666rem;
  }
  .mainPage-pay-collect-log-item-amount {
    width: 4.5rem;
    padding-bottom: 0.36rem;
    color: #FB3727;
    text-align: center;
  }
  .mainPage-pay-collect-log-item-button {
    width: 2.4rem;
    height: 0.8rem;
    color: #FB3727;
    text-align: center;
    line-height: 0.8rem;
    border-radius: 0.8rem;
    border-style: solid;
    border-color: #FB3727;
    border-width: 1px;
  }
  .mainPage-pay-collect-log-vtical-line {
    width: 1px;
    background-color: #e6e6e6;
    height: 60%;
  }

  /*table*/
  .mainPage-table-items {
    background: #fff;
    width: 100%;
    margin-bottom: 0.32rem;
  }
  .mainPage-table-item {
    width: 100%;
    height: 1.6rem;
    display: flex;
  }
  .mainPage-table-imageContainer {
    width: 13.33333333333%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .mainPage-table-item-right {
    flex: auto;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .mainPage-table-item-updage-arrow {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .mainPage-table-item-right-arrow {
    width: 0.533333333333333rem;
    height: 0.533333333333333rem;
    margin-right: 0.56rem
  }

  /*adverstise*/
  .mainPage-advertisement {
    background: #fff;
    width: 100%;
  }
  .mainPage-advertisement-banner {
    width: 100%;
    height: 1.413333333333333rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .mainPage-advertisement-banner-item {
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    img {
      width: 1.32rem;
      height: 0.053333333rem;
    }
  }
  .mainPage-advertisement-pictures {
    width: 100%;
    height: 3.173333333rem;
    background-color: #fff;
    img {
      width: 7.866666666rem;
      height: 2.666666666rem;
      display: block;
      margin: 0 auto;
    }
  }

</style>
