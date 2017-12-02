<template>
  <div style="padding-bottom: 1.6rem">

    <div class="sharepage-Header f34">
      分享
    </div>

    <DialogWindow v-show="shareToInvite">
      <div @click="shareAndInviteShow(false)">
        <div class="sharepage-share-dialog">
          <span>分享到</span>
          <div class="sharepage-share-dialog-items" >

            <div class="sharepage-share-dialog-item" @click="shareToWechat">
              <img src="../../assets/img/WeChat_ic.png">
              <span>微信好友</span>
            </div>

            <div class="sharepage-share-dialog-item" @click="shareToWechatFriend">
              <img src="../../assets/img/WeChat_pyq_ic.png">
              <span>微信朋友圈</span>
            </div>

            <div class="sharepage-share-dialog-item" @click="shareToSMS">
              <img src="../../assets/img/message_ic.png">
              <span>手机短信</span>
            </div>

          </div>
        </div>
      </div>
    </DialogWindow>

    <!--列表跳转-->
    <div class="sharepage-table-items">
      <div class="sharepage-table-item">
        <div class="sharepage-table-imageContainer">
          <img src="../../assets/img/imgShare/share_invite_ic.png"/>
        </div>
        <div class="sharepage-table-item-right bb1">
          <div class="f28">邀请注册</div>
          <img class="sharepage-table-item-right-arrow" src="../../assets/img/imgMain/more_ic@2x.png">
        </div>
      </div>
      <div class="sharepage-table-item">
        <div class="sharepage-table-imageContainer">
          <img src="../../assets/img/imgShare/share_code_ic.png"/>
        </div>
        <div class="sharepage-table-item-right bb1">
          <div class="f28">二维码推广</div>
          <img class="sharepage-table-item-right-arrow" src="../../assets/img/imgMain/more_ic@2x.png">
        </div>
      </div>
      <div class="sharepage-table-item">
        <div class="sharepage-table-imageContainer">
          <img src="../../assets/img/imgShare/share_face_to_face_ic.png"/>
        </div>
        <div class="sharepage-table-item-right bb1">
          <div class="f28">面对面注册</div>
          <img class="sharepage-table-item-right-arrow" src="../../assets/img/imgMain/more_ic@2x.png">
        </div>
      </div>
      <div class="sharepage-table-item">
        <div class="sharepage-table-imageContainer">
          <img src="../../assets/img/imgShare/share_h5_ic.png"/>
        </div>
        <div class="sharepage-table-item-right">
          <div class="f28">H5营销页</div>
          <img class="sharepage-table-item-right-arrow" src="../../assets/img/imgMain/more_ic@2x.png">
        </div>
      </div>
      <div class="sharepage-table-item" style="margin-top: 0.346666666rem" @click="shareAndInviteShow(true)">
        <div class="sharepage-table-imageContainer">
          <img src="../../assets/img/imgShare/share_friends_ic.png"/>
        </div>
        <div class="sharepage-table-item-right" @click="goGeneralize">
          <div class="f28">朋友圈推广文案</div>
          <img class="sharepage-table-item-right-arrow" src="../../assets/img/imgMain/more_ic@2x.png">
        </div>
      </div>
    </div>

  </div>
</template>
<script>

  import DialogWindow from '../../components/DialogWindow'
  import {MessageBox} from 'mint-ui';
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';

  export default{
    name: 'sharePage',
    components: {
      DialogWindow,
    },
    data(){
      return {
        shareToInvite: false,
        sharedUrl: '',
        sharedTitle: share_app_config.sharedTitle,
        sharedImageUrl: share_app_config.sharedImageUrl,
        sharedDescription: share_app_config.sharedDescription,
      }
    },

    created(){

    },

    methods: {
    	goGeneralize(){
    		this.$router.push({"name":"generalize"});	
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
    },

  }

</script>

<style scoped lang="less">

  .sharepage-Header {
    background: #fff;
    height: 1.18666667rem;
    z-index: 100;
    position: fixed;
    top: 0;
    border-bottom: 2px solid #e6e6e6;
    width: 100%;
    text-align: center;
    line-height: 1.18666667rem;
  }
  /*table*/
  .sharepage-table-items {
    margin-top: 1.6rem;
    width: 100%;
    margin-bottom: 0.32rem;
  }
  .sharepage-table-item {
    width: 100%;
    height: 1.6rem;
    display: flex;
    background: #fff;
  }
  .sharepage-table-imageContainer {
    width: 13.33333333333%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 0.56rem;
      height: 0.56rem;
      margin-left: 0.1rem;
    }
  }
  .sharepage-table-item-right {
    flex: auto;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .sharepage-table-item-updage-arrow {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .sharepage-table-item-right-arrow {
    width: 0.533333333333333rem;
    height: 0.533333333333333rem;
    margin-right: 0.56rem
  }

  .sharepage-share-dialog {

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

  .sharepage-share-dialog-items {
    width: 100%;
    display: flex;
    flex-direction:row;
    justify-content: space-around;
  }

  .sharepage-share-dialog-item {
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
