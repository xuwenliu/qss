<template>
  <div class="bg0"
       style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;padding-bottom: 1.4rem;overflow-y: auto;">

    <TopHeader>
      <div class="clickMe" @click="goBack"><span></span></div>
      <i>身份信息</i></TopHeader>


    <div class="content-box" id="uploader_container">

      <div class="input-area" style="margin-top: 0.85333rem">
        <span>真实姓名</span>
        <input :disabled="!baseInfo.realNameCanModify" type="text" maxlength="10" placeholder="请输入持卡人姓名"
               v-model="baseInfo.realName">
      </div>
      <div class="input-area" style="margin-top: 0.56rem">
        <span>身份证号</span>
        <input :disabled="!baseInfo.idCardNoCanModify" type="text" maxlength="18" placeholder="请输入持卡人身份证号"
               v-model="baseInfo.idCardNo">
      </div>


      <!--身份证正面照-->
      <div class="identity-edit-box" style="margin-top: 0.96rem">
        <div class="identity-edit-img-area" id="IdentityUpButton1">
          <button v-show="!baseInfo.idImageA" class="identity-edit-add bgt"></button>
          <div v-show="baseInfo.idImageA && baseInfo.imageCanModify " class="identity-edit-modify" id="IdentityUpButton2">点击修改</div>
          <img v-show="!baseInfo.idImageA" src="../../assets/img/sfzzm_pic@2x.png">
          <img v-show="baseInfo.idImageA" :src="baseInfo.idImageA">
        </div>
        <span class="identity-edit-title">上传身份证正面照</span>
      </div>
      <!--身份证反面照-->
      <div class="identity-edit-box" style="margin-top: 0.96rem">
        <div class="identity-edit-img-area" id="IdentityDownButton1">
          <button v-show="!baseInfo.idImageB" class="identity-edit-add bgt"></button>
          <div v-show="baseInfo.idImageB && baseInfo.imageCanModify " class="identity-edit-modify" id="IdentityDownButton2">点击修改</div>
          <img v-show="!baseInfo.idImageB" src="../../assets/img/sfzfm_pic@2x.png">
          <img v-show="baseInfo.idImageB" :src="baseInfo.idImageB">
        </div>
        <span class="identity-edit-title">上传身份证反面照</span>
      </div>
      <!--手持身份证-->
      <div class="identity-edit-box" style="margin-top: 0.96rem;margin-bottom: 1rem">
        <div class="identity-edit-img-area" id="IdentityHoldUpButton1">
          <button v-show="!baseInfo.idHoldImage" class="identity-edit-add bgt" ></button>
          <div v-show="baseInfo.idHoldImage && baseInfo.imageCanModify " class="identity-edit-modify" id="IdentityHoldUpButton2">点击修改</div>
          <img v-show="!baseInfo.idHoldImage" src="../../assets/img/sfzsc_pic@2x.png">
          <img v-show="baseInfo.idHoldImage" :src="baseInfo.idHoldImage">
        </div>
        <span class="identity-edit-title">上传手持身份证正面照</span>
      </div>
    </div>

    <!--bottom button-->
    <button class="bottom-button-identity" @click="listenerNextClick" style="position: fixed">下一步</button>
  </div>

</template>
<script>
  import TopHeader from '../../components/Header'
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';
  import {MessageBox} from 'mint-ui';



  export default{
    name: 'login',
    components: {
      TopHeader
    },

    data(){
      return {
        isDisabled: true,
        bindUsernameInput: '',
        bindPwasswordInput: '',
        isShow: true,
        loginBtnEnable: false,
        baseInfo: {
          "realName": "",
          "realNameCanModify": true,
          "idCardNo": "",
          "idCardNoCanModify": true,
          "idImageA": '',
          "idImageB": '',
          "idHoldImage": '',
          "imageCanModify": true
        },

      }
    },

    created(){

      if (localStorage.identityCompleted == 1) {//认证资料已经全部提交了，返回首页
        this.$router.go(-1);
        return false;
      }
      this.getIdentityInfo();
    },

    methods: {

      goBack(){
        this.$router.go(-1);
      },

      /***
       * 获取已提交的身份认证信息
       */
      getIdentityInfo(){
        this.$http.get(`${window.Host.apiHost}/pos/identity`).then((res) => {
          console.log(res);
          if (res.body.data) {
            var info = res.body.data;
            info.idImageA = info.idImageA || "";
            info.idImageB = info.idImageB || "";
            info.idHoldImage = info.idHoldImage || "";
            this.baseInfo = info;
            if (info.realName)
              console.log(info.realName);
              this.baseInfo.realName = decRsa(info.realName)


              ;
            if (info.idCardNo)
              this.baseInfo.idCardNo = decRsa(info.idCardNo);
            console.log("getInfo");
            console.log(this.baseInfo);
          }
        }, (error) => {

        })
      },

      /***
       * @onClick 下一步
       */
      listenerNextClick(){
        if (this.preconditionPass()) {
          var info = {
            "realName": Rsa(this.baseInfo.realName),
            "realNameCanModify": this.baseInfo.realNameCanModify,
            "idCardNo": Rsa(this.baseInfo.idCardNo),
            "idCardNoCanModify": this.baseInfo.idCardNoCanModify,
            "idImageA": this.baseInfo.idImageA,
            "idImageB": this.baseInfo.idImageB,
            "idHoldImage": this.baseInfo.idHoldImage,
            "imageCanModify": this.baseInfo.imageCanModify
          };

          Indicator.open();
          this.$http.post(`${window.Host.apiHost}/pos/identity`, info).then((res) => {
            Indicator.close();
            if (res.body.succ) {
              this.didIdentityCompleted()
            } else {
              Toast({message: res.body.message, position: 'center', duration: 3000})
            }
          }, (error) => {
            Toast({message: "网路异常", position: 'center', duration: 3000})
          })
        }
      },


      /***
       * 提交身份信息成功
       */
      didIdentityCompleted(){
        this.$router.push({path: `/identitySecond`, query: {'name': this.baseInfo.realName}})
      },


      /**
       * 下一步的先决条件
       */
      preconditionPass(){
        var info = this.baseInfo;
        if (!(Regex.realname.test(info.realName))) {
          Toast({message: '持卡人姓名格式不正确', position: 'center', duration: 3000});
          return false;
        }

        if (!(Regex.identity.test(info.idCardNo))) {
          Toast({message: '身份证格式不正确', position: 'center', duration: 3000});
          return false
        }

        if (!(info.idImageA)) {
          Toast({message: '请上传身份证正面照', position: 'center', duration: 3000});
          return false
        }

        if (!(info.idImageB)) {
          Toast({message: '请上传身份证反面照', position: 'center', duration: 3000});
          return false
        }

        if (!(info.idHoldImage)) {
          Toast({message: '请上传身份证持证照', position: 'center', duration: 3000});
          return false
        }
        return true;
      },


    },

    mounted () {

      var _this = this;

      var uploadUpButton1 = window.uploader('IdentityUpButton1',function (url) {
        _this.baseInfo.idImageA = url;
      });

      var uploadDownButton1 = window.uploader('IdentityDownButton1',function (url) {
        _this.baseInfo.idImageB = url;
      });

      var uploadHoldUpButton1 = window.uploader('IdentityHoldUpButton1',function (url) {
        _this.baseInfo.idHoldImage = url;
      });

    },
  }

</script>

<style>

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

  .identity-edit-add {
    background-image: url("../../assets/img/add_ic@2x.png");
    width: 1.6rem;
    height: 1.6rem;
    /*width: 100%;*/
    /*height: 100%;*/
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

  .bottom-button-identity {
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
