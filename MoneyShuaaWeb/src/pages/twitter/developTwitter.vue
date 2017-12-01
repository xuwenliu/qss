<template>
  <div class="develop">
    <TopHeader>
      <div class="clickMe" @click="goBack"><span></span></div>
      <i>发展下级推客</i></TopHeader>

    <BottomFooter>
      <div @click="shareAndInviteShow(true)">分享并邀请好友注册</div>
    </BottomFooter>

    <DialogWindow v-show="shareToInvite">
      <div class="develop-twitter-share" @click="shareAndInviteShow(false)">
        <div class="develop-twitter-share-dialog">
            <span>分享到</span>
            <div class="develop-twitter-share-dialog-items">

                <div class="develop-twitter-share-dialog-item" @click="shareToWechat">
                <img src="../../assets/img/WeChat_ic.png">
                <span>微信好友</span>
              </div>

                <div class="develop-twitter-share-dialog-item" @click="shareToWechatFriend">
                <img src="../../assets/img/WeChat_pyq_ic.png">
                <span>微信朋友圈</span>
              </div>

                <div class="develop-twitter-share-dialog-item" @click="shareToSMS">
                <img src="../../assets/img/message_ic.png">
                <span>手机短信</span>
              </div>

            </div>
        </div>
      </div>
    </DialogWindow>

    <!--generalize.wxml-->
    <div class="content-box" style="padding-bottom: 1.3rem">
      <div
        style="position:relative;height: 5.12rem;display: flex;justify-content: center;align-items: center;color: #FFFFFF;">
        <img style="position: absolute;height: 5.65333rem;left:0;top: 0;" src="../../assets/img/fzxjtk_sm.png">
        <div class="f28"
             style="display: flex;flex-direction: column;position: relative;align-items:center;height: 5.12rem;">
          <div class="b" style="display: flex;align-items: center;margin-top: 1.76rem;">
          </div>

          <div class="mt10">分享并邀请用户注册</div>
          <div>该用户将会成为您的下级推客</div>
          <div>他发展的收款客户,每笔交易您都将获得佣金</div>
          <div>佣金额度为收款额度的 <i class="b">万分之{{developInfo.rate * 10000}}</i></div>

        </div>
      </div>

      <div class="mt30 bg0 bb1 bt1"
           style="height: 1.7333rem;display: flex;justify-content: space-between;align-items: center;padding: 0 0.74666rem;">
        <div v-if="developInfo.parentName" style="display: table-cell;vertical-align: bottom">
          <i style="padding-right: 0.1rem" class="f32">{{developInfo.parentName}}</i> <i v-show="developInfo.parentName"
                                                                                         style="padding-left: 0.1rem;border-left: solid 1px #505050"
                                                                                         class="f24 fc1">我的邀请人</i>
        </div>
        <a v-if="developInfo.parentName" :href="'tel:'+developInfo.parentPhone">
          <img style="width: 0.88rem;height: 0.88rem" src="../../assets/img/phone_ic.png">
        </a>


        <div v-if="!developInfo.parentName" style="display: table-cell;vertical-align: bottom">
          <i class="f32">官方客服</i>
        </div>
        <a v-if="!developInfo.parentName" href="tel:18190947263">
          <img style="width: 0.88rem;height: 0.88rem" src="../../assets/img/phone_ic.png">
        </a>

      </div>


      <div v-if="develops.length!=0" class="mt30">
        <div class="develop-list">

          <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
                       @bottom-status-change="handleBottomChange" ref="loadmore" :auto-fill="false" :max-distance="80">

            <div class="develop-item bg0 bb1 bt1" style="padding: 0 0.74666rem;" v-for="(item,index) in develops">

              <div class="develop-item-main bb1">
                <div class="develop-item-main-left">
                  <div v-if="item.childChannelName" style="display: flex;align-items: center;">
                    <span class="f32 fc2 b">{{item.childChannelName}}</span>
                    <img v-show="item.identityAuditStatus == 0 || item.identityAuditStatus == 3"
                         style="margin-left:0.13333rem;width:1.04rem ;height: 0.4rem" src="../../assets/img/wrz_ic.png">
                  </div>

                  <div v-if="!item.childChannelName" style="display: flex;align-items: center;">
                    <span class="f32 fc2 b">{{item.channelPhone}}</span>
                    <img v-show="item.identityAuditStatus == 0 || item.identityAuditStatus == 3"
                         style="margin-left:0.13333rem;width:1.04rem ;height: 0.4rem" src="../../assets/img/wrz_ic.png">
                  </div>
                  <!--<span v-if="!item.childChannelName" class="f32 fc2 b">{{item.channelPhone}}</span>-->
                  <span class="f24 mt10" style="color: #787878">{{item.relationTime | setDate}}</span>
                  <a :href="'tel:'+item.channelPhone" class="mt10"><img style="width: 1.86666rem;height: 0.66666rem;"
                                                                        src="../../assets/img/phone2_bt.png"></a>
                </div>
                <div class="develop-item-main-right">
                  <span class="f36 fc2">{{item.brokerage | currency("",2)}}</span>
                  <span class="f24 mt10" style="color: #787878">累计带来佣金</span>
                </div>
              </div>


              <div class="develop-item-bottom f26" @click="listenerRmarkClick(item.id,item.channelRemark)">
                <div>
                  <p style="display: flex;flex-direction: row;align-items: center"><i style="color: #ffa338">备忘录</i> <i
                    style="background-color: #b2b2b2;width: 1px;height: 0.26666rem;margin: 0 0.3rem"></i>
                  </p>
                  <span style="width:5.73333rem" class="text-cut"
                        v-show="item.channelRemark">{{item.channelRemark}}</span>
                  <span v-show="!item.channelRemark" style="color:#888888;padding:0 0.2rem;">点击填写备忘录</span>
                </div>
                <img class="arrow" src="../../assets/img/more_ic@2x.png">
              </div>
            </div>

            <div slot="bottom" class="mint-loadmore-bottom" style="font-size:0.37333rem;">
              <span v-show="bottomStatus === 'pull'">上拉加载</span>
              <span v-show="bottomStatus === 'drop'">释放加载</span>
              <span v-show="bottomStatus === 'loading'">
                  <Spinner type="fading-circle" :size="20"></Spinner>&nbsp;加载中...
            </span>
            </div>
          </mt-loadmore>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import DialogWindow from '../../components/DialogWindow'
  import TopHeader from '../../components/Header'
  import BottomFooter from '../../components/Footer'
  import InputNote from '../../components/InputNote'
  import {Indicator} from 'mint-ui';
  import {MessageBox} from 'mint-ui';

  export default {
    name: 'develop',
    components: {
      TopHeader,
      BottomFooter,
      InputNote,
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

        sharedUrl: '',
        sharedTitle: share_app_config.sharedTitle,
        sharedImageUrl: share_app_config.sharedImageUrl,
        sharedDescription: share_app_config.sharedDescription,
      }
    },
    created() {

      if (!localStorage.sessions) {
        if (this.$route.query.u) {
          this.$router.push({path: `/register`, query: {u: this.$route.query.u, type: this.$route.query.type}});
          return false;
        }
      }

      this.getBaseInfo();
      this.getListData();

      this.sharedUrl = location.protocol + "//" + location.host + `#/register?u=${localStorage.userId}&type=2`;
      console.log(this.sharedUrl);
    },
    mounted() {
    },
    methods: {

      goBack(){
        this.$router.go(-1);
      },

      shareAndInviteShow(show) {
        if (show) {
          this.shareToInvite = true;
        } else  {
          this.shareToInvite = false;
        }
      },
      shareToWechat() {
        invokeNative({
          "code": window.jsBridge.CODE_SHARE,
          "data": {
            "type":0,
            "mShareUrl": this.sharedUrl,
            "mShareImg": this.sharedImageUrl,
            "mDescription": this.sharedDescription,
            "mShareTitle": this.sharedTitle
          }
        });
      },
      shareToWechatFriend() {
        invokeNative({
          "code": window.jsBridge.CODE_SHARE,
          "data": {
            "type":1,
            "mShareUrl": this.sharedUrl,
            "mShareImg": this.sharedImageUrl,
            "mDescription": this.sharedDescription,
            "mShareTitle": this.sharedTitle
          }
        });
      },
      shareToSMS() {
        invokeNative({
          "code": window.jsBridge.CODE_SHARE,
          "data": {
            "type":2,
            "mShareUrl": this.sharedUrl,
            "mShareImg": this.sharedImageUrl,
            "mDescription": this.sharedDescription,
            "mShareTitle": this.sharedTitle
          }
        });
      },

      getBaseInfo() {

        this.$http.get(`${window.Host.apiHost}/pos/develop/general`).then((res) => {
          console.log(res);
          if (res.data.stateCode === 0) {
            this.developInfo = res.data.data
          } else {
            MessageBox({
              closeOnClickModal: false,
              title: '提示',
              message: res.data.message,
              showCancelButton: false
            });
          }
        })
      },


      /**
       *
       * 获取列表数据
       */
      getListData() {
        this.$http.get(`${window.Host.apiHost}/pos/develop?pageNum=${this.pageNum}&pageSize=20`).then((res) => {
          if (res.data.stateCode === 0) {
            console.log(res)
            this.onResponseList(res.data.data.result)
          } else {
            MessageBox({
              closeOnClickModal: false,
              title: '提示',
              message: res.data.message,
              showCancelButton: false
            });
          }
        })
      },

      /**
       * 响应列表数据
       * @param data
       */
      onResponseList(data) {
        if (!data) {
          this.allLoaded = true;
          return false;
        } else {
          if (data.length < this.pageSize) {
            this.allLoaded = true;
          }
          if (this.pageNum == 1) {
            this.develops = data;
          } else {
            this.develops = this.develops.concat(data);
          }
        }

      },

      /**
       * 列表修改备注按钮被点击
       * @param index
       */
      listenerRmarkClick(id, channelRemark) {

        this.$router.push({
          "name": "editRemark",
          query: {'channelUserId': id, 'channelRemark': channelRemark}
        });
//        this.$router.push({'name':})
      },


      //mint-ui 上拉加载
      handleBottomChange(status) {
        this.bottomStatus = status;
      },

      loadBottom() {
        this.pageNum += 1;
        setTimeout(() => {
          this.getListData();
          this.$refs.loadmore.onBottomLoaded();
        }, 1500);
      },

    }, //methods结束
  }
</script>

<style scoped lang="less">
  .mint-loadmore-bottom span {
    display: inline-block;
    vertical-align: middle
  }

  .toast-share {
    position: fixed;
    max-width: 80%;
    padding: 0.26666rem;
    border-radius: 6px;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    box-sizing: border-box;
    text-align: center;
    z-index: 1000;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .content {
    bottom: 1.33333rem;
  }

  .rule-area {
    height: 4.4rem;
    background: #fff;
    box-sizing: border-box;
  }

  .rule-title {
    font-weight: bold;
    font-size: 0.48rem;
    width: 100%;
    text-align: center;
    line-height: 1.49333rem;
    position: absolute;
    display: flex;
    justify-content: center;
    top: 0;
  }

  .rule-title-view {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.33333rem;
    height: 1.49333rem;
  }

  .rule-title-view-text {
    width: 3.33333rem;
    height: 0.53333rem;
    line-height: 0.53333rem;
  }

  .rule-area-content {
    display: flex;
    padding-bottom: 0.70666rem;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    height: 100%;
    font-size: 0.426666rem;
    box-sizing: border-box;
    padding-top: 0.74666rem;
  }

  .rule-area-center {
    display: flex;
    flex-grow: 3;
    flex-direction: column;
    justify-content: center;
    border: solid #e5e5e5 1px;
    align-items: center;
  }

  .develop-tab {
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .develop-list {
  }

  .develop-item {
    margin-bottom: 0.18666rem;
    box-sizing: border-box;
  }

  .develop-item-main {
    display: flex;
    align-items: center;
    height: 2.8rem;
    justify-content: space-between;
  }

  .develop-item-main-left {
    display: flex;
    flex-direction: column;
  }

  .develop-item-main-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .develop-item-top {
    height: 2rem;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  }

  .develop-item-top-left {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .develop-item-top-left image {
    height: 1.06666rem;
    width: 1.06666rem;
    margin-right: 0.26666rem;
  }

  /* .develop-item-top-left view {
    display: flex;
    flex-direction: column;
  } */

  .develop-item-top-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
  }

  .develop-item-bottom {
    height: 0.93333rem;
    line-height: 0.93333rem;
    flex-direction: row;
    box-sizing: border-box;
    display: flex;
    color: #353535;
    justify-content: space-between;
    align-items: center;
  }

  .develop-item-bottom div {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-grow: 2;
  }

  .phone-area {
    display: flex;
    flex-direction: row;
    align-items: center
  }

  .phone-area-btn {
    width: 1.6rem;
    height: 0.48rem;
    line-height: 0.48rem;
    text-align: center;
    border: solid #2a7ae8 1px;
    font-size: 0.34666rem;
    color: #2a7ae8;
    margin-left: 0.26666rem;
  }

  .inputBox {
    background-color: #FFFFFF;
    text-align: center;
  }

  .inputBox-title {
    margin-top: 0.53333rem;
    margin-bottom: 0.26666rem;
  }

  .inputBox-input {
    width: 70%;
    height: 2rem;
    border: 0.026666rem #737373 solid;
    text-align: start;
    padding: 0.13333rem;
    box-sizing: border-box;
    margin-bottom: 0.53333rem;
  }

  .inputBox-btn {
    border-top: 0.026666rem solid #737373;
    height: 1.2rem;
    position: relative;
  }

  .inputBox-btn div {
    float: left;
    width: 49.5%;
    height: 1.2rem;
    line-height: 1.2rem;;
  }

  .develop-twitter-share {

    background: rgba(0, 0, 0, 0.6);
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .develop-twitter-share-dialog {

    position: fixed;
    left: 50%;
    margin-left: -44%;
    bottom: 2.667rem;


    display: flex;
    flex-direction: column;
    align-items: center;
    width: 88%;
    border-radius: 0.26666rem;
    background-color: #ffffff;

    span{
      font-size: 0.4rem;
      height: 1.07rem;
      margin-top: 0.4rem;
      margin-bottom: 0.2666666rem;
    }
  }

  .develop-twitter-share-dialog-items {
    width: 100%;
    display: flex;
    flex-direction:row;
    justify-content: space-around;
  }

  .develop-twitter-share-dialog-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 1.3333333rem;
      height: 1.3333333rem;
    }
    span {
      font-size: 0.2666666rem;
    }
  }

</style>
