<template>
  <div class="bg0" id="video_container"
       style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;padding-bottom: 1.4rem;overflow-y: auto;">

    <TopHeader>
      <div class="clickMe" @click="goBack"><span></span></div>
      <i>结算卡信息</i></TopHeader>


    <DialogWindow v-show="showFailDialog">
      <div class="show-dialog-box">

        <div class="index-dialog">
          <img src="../../assets/img/popup_ic_not_pass_n@2x.png" class="index-dialog-icon">
          <span>失败</span>
          <p>{{failReason}}</p>
          <button @click="listenerShowFailDialog(false)" class="f28 fc0">知道了</button>
        </div>
      </div>

    </DialogWindow>

    <DialogWindow v-show="showSuccDialog">
      <div class="show-dialog-box">

        <div class="index-dialog">
          <img src="../../assets/img/popup_ic_pass_n@2x.png" class="index-dialog-icon">
          <i class="f24" style="color: #000000;margin-bottom: 0.4rem">认证信息已提交</i>
          <span>快捷收款 现已开通</span>
          <p>平台会在三个工作日内，审核您的认证信息。若认证失败，您需要重新提交相关认证资料</p>
          <button @click="listenerShowSuccDialog(false)" class="f28 fc0">知道了</button>
        </div>
      </div>

    </DialogWindow>

    <div class="content-box">
      <div class="input-area" style="margin-top: 0.85333rem">
        <span>真实姓名</span>
        <input :disabled="true" type="text" maxlength="10" placeholder="请输入持卡人姓名"
               v-model="baseInfo.name">
      </div>


      <div class="input-area" style="margin-top: 0.56rem">
        <span>银行卡号</span>
        <input :disabled="!canModify" type="tel" maxlength="21" placeholder="请输入银行储蓄卡号"
               v-model="baseInfo.cardNO">
      </div>

      <div class="input-area" style="margin-top: 0.56rem">
        <span>手机号</span>
        <input :disabled="!canModify" type="tel" maxlength="11" placeholder="请输入银行预留手机号码"
               v-model="baseInfo.phone">
      </div>


      <div class="identity-hint">

        <img src="../../assets/img/red_info_ic@2x.png"> <span class="f22 fc1">此银行卡仅用于收款结算，平台会保证您的资金信息安全</span>

      </div>

      <!--身份证正面照-->
      <div class="identity-edit-box" style="margin-top: 0.96rem;margin-bottom: 1.0rem" id="uploader_container">

        <div class="identity-edit-img-area" id="bankCardAddButton">
          <button v-show="!baseInfo.posCardImage" class="identity-edit-add bgt" ></button>
          <div v-show="baseInfo.posCardImage && baseInfo.posCardImageCanModify" class="identity-edit-modify">点击修改</div>
          <img v-show="!baseInfo.posCardImage" src="../../assets/img/cxk_pic@2x.png">
          <img v-show="baseInfo.posCardImage" :src="baseInfo.posCardImage">
        </div>
        <span class="identity-edit-title">上传储蓄卡正面照</span>
      </div>

      <!--bottom button-->
      <button class="bottom-button-identity2" @click="listenerSubmitClick" style="position: fixed">提交</button>
    </div>

  </div>

</template>
<script>
  import TopHeader from '../../components/Header'
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';
  import {MessageBox} from 'mint-ui';
  import DialogWindow from '../../components/DialogWindow'


  export default{
    name: 'login',
    components: {
      DialogWindow,
      TopHeader,
    },
    data(){
      return {
        isDisabled: false,
        showCardImage: false,
        bindUsernameInput: '',
        bindPwasswordInput: '',
        showFailDialog: false,
        failReason: '',
        showSuccDialog: false,
        isShow: true,
        loginBtnEnable: false,
        identitySucc: false,
        canModify: true,
        baseInfo: {
          "posCardId": 0,
          "name": '',
          "cardNO": '',
          "phone": '',
          "posCardImage": '',
          "posCardImageCanModify": true
        },
        imgs:"",

      }
    },

    created(){

      var name = this.$route.query.name;
      this.baseInfo.name = name;

      this.getBankInfo();

    },
    mounted(){
      var _this = this;

      var uploadUpButton1 = window.uploader('bankCardAddButton',function (url) {
        _this.baseInfo.posCardImage = url;
      });

    },

    methods: {
      goBack(){
        this.$router.go(-1);
      },

      /***
       * 显示认证失败弹窗
       */
      listenerShowFailDialog(show){
        this.showFailDialog = show;
      },

      /***
       * 显示认证成功弹窗
       */
      listenerShowSuccDialog(show){
        this.showSuccDialog = show;
        if (!show) {
          if (this.identitySucc) {
            localStorage.identityCompleted = 1;
            this.$router.go(-1)
          }
        }
      },

      /***
       * 获取已经绑定的结算卡信息
       */
      getBankInfo(){
        this.$http.get(`${window.Host.apiHost}/pos/bindCard`).then((res) => {
          console.log(res);
          if (res.body.data) {
            var info = res.body.data;

            info.posCardImage=info.posCardImage||"";
            console.log(info);
            this.baseInfo = info;

            if (info.name) {
              this.baseInfo.name = decRsa(info.name);
            }
            if (info.cardNO) {
              this.canModify = false;
              this.baseInfo.cardNO = decRsa(info.cardNO);
            }
            if (info.phone) {
              this.baseInfo.phone = decRsa(info.phone);
            }
          }
        }, (error) => {

        })
      },

      /***
       * @onClick 提交
       */
      listenerSubmitClick(){
        if (this.preconditionPass()) {
          var info = {
            "posCardId": this.baseInfo.posCardId,
            "name": Rsa(this.baseInfo.name),
            "cardNO": Rsa(this.baseInfo.cardNO),
            "phone": Rsa(this.baseInfo.phone),
            "posCardImage": this.baseInfo.posCardImage,
            "posCardImageCanModify": this.baseInfo.posCardImageCanModify
          };

          this.$http.post(`${window.Host.apiHost}/pos/bindCard`, info).then((res) => {
            console.log(res);
            if (res.body.succ) {
              this.identitySucc = true;
              this.showSuccDialog = true;
              this.canModify = false;
            } else {
              this.failReason = res.body.message;
              this.listenerShowFailDialog(true)
            }
          }, (error) => {
          })
        }
      },


      /**
       * 提交结算卡信息的先决条件
       */
      preconditionPass(){

        if (!(Regex.realname.test(this.baseInfo.name))) {
          Toast({message: '持卡人姓名格式不正确', position: 'center', duration: 3000});
          return false;
        }

        if (!(Regex.bankCard.test(this.baseInfo.cardNO))) {
          Toast({message: '银行卡号格式不正确', position: 'center', duration: 3000});
          return false;
        }

        if (!(Regex.phone.test(this.baseInfo.phone))) {
          Toast({message: '手机号不正确', position: 'center', duration: 3000});
          return false;
        }

        if (!this.baseInfo.posCardImage) {
          Toast({message: '请上传储蓄卡照片', position: 'center', duration: 3000});
          return false;
        }

        return true;
      }
    },

  }

</script>

<style>
  /* login.wxss */

  .index-dialog {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 6.4rem;
    border-radius: 0.26666rem;
    background-color: #ffffff;
  }

  .index-dialog-icon {
    width: 1.0666rem;
    height: 1.0666rem;
    margin: 0.5333rem 0;
  }

  .index-dialog-icon-p {
    width: 0.82666rem;
    height: 1.0666rem;
    margin: 0.5333rem 0;
  }

  .index-dialog span {
    color: #505050;
    font-size: 0.42666rem;
    font-weight: bold;
  }

  .index-dialog p {
    text-align: center;
    font-size: 0.34666rem;
    margin-top: 0.26666rem;
    margin-left: 0.50666rem;
    line-height: 0.753333rem;
    margin-right: 0.50666rem;
    color: #505050;
  }

  .index-dialog button {
    width: 4rem;
    height: 0.93333rem;
    line-height: 0.93333rem;
    text-align: center;
    margin-top: 0.93333rem;
    margin-bottom: 0.4rem;
    border-radius: 0.6rem;
    background-image: url("../../assets/img/btn_n.png");
  }

  .identity-edit-box {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .identity-edit-title {
    color: #282828;
    font-size: 0.4rem;
    margin-top: 0.26666rem;
    margin-bottom: 0.66666rem;
  }

  .identity-edit-img-area {
    width: 8.5333rem;
    height: 5.54666rem;
    border: solid 1px #b4b4b4;
    position: relative;
    border-radius: 0.26666rem;
  }

  .identity-edit-img-area img {
    width: 8.5333rem;
    height: 5.54666rem;
    box-sizing: border-box;
    border-radius: 0.26666rem;
  }

  .identity-hint {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.77333rem;
    margin-bottom: 0.93333rem;
  }

  .identity-hint img {
    width: 0.32rem;
    margin-right: 0.21333rem;
    height: 0.32rem;
  }

  .identity-edit-add {
    background-image: url("../../assets/img/add_ic@2x.png");
    width: 1.6rem;
    height: 1.6rem;
    position: absolute;
    left: 50%;
    margin-left: -0.8rem;
    top: 50%;
    margin-top: -0.8rem;
    background-repeat: no-repeat;
    background-size: 100%;

  }

  .identity-edit-modify {
    width: 8.5333rem;
    height: 0.88rem;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    bottom: 0;
    border-bottom-left-radius: 0.26666rem;
    text-align: center;
    line-height: 0.88rem;
    font-size: 0.4rem;
    color: #ffffff;
    border-bottom-right-radius: 0.26666rem;
  }
  .bottom-button-identity2 {
    height: 1.33333rem;
    line-height: 1.33333rem;
    text-align: center;
    background-color: #ff293c;
    color: #ffffff;
    font-size: 0.4rem;
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 200;
  }
</style>
