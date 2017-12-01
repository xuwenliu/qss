<template>
  <div style="padding-bottom: 2.4rem">

    <div class="minepage-Header">
      <!--已登录-->
      <div v-show="true" class="minepage-Header-Box">
        <div class="minepage-Header-logined">
          <div class="minepage-Header-user-name">张嘉译 Lv1</div>
          <div class="minepage-Header-user-phone f34">189****3103</div>
          <div class="minepage-header-button-logout">
            <span class="f24" style="color: white">退出登录</span>
            <img src="../../assets/img/imgMine/logout_arrow_ic.png">
          </div>
        </div>
        <img src="../../assets/img/imgMine/user_head_ic_light.png"/>
      </div>
      <!--未登录-->
      <div v-show="false" class="minepage-Header-Box">
        <div class="minepage-Header-nologin">
          <div class="minepage-Header-welcome">欢迎来到 “钱刷刷”</div>
          <div class="minepage-header-button-login f28">登录/注册</div>
        </div>
        <img src="../../assets/img/imgMine/user_head_ic.png"/>
      </div>

    </div>
    <!--列表跳转-->
    <div class="minepage-table-items">
      <div class="minepage-table-item">
        <div class="minepage-table-imageContainer">
          <img src="../../assets/img/imgMine/mine_invitor_ic.png"/>
        </div>
        <div class="minepage-table-item-right">
          <div class="f28">推荐人</div>
          <div class="f28" style="margin-right: 0.56rem">刘** 189****3209</div>
        </div>
      </div>
      <div class="minepage-table-item">
        <div class="minepage-table-imageContainer">
          <img src="../../assets/img/imgMine/mine_true_name_ic.png"/>
        </div>
        <div class="minepage-table-item-right bb1">
          <div class="f28">实名认证</div>
          <div class="minepage-table-item-updage-arrow">
            <span v-show="true" class="f26" style="color: #BBBBBB">未提交</span>
            <img class="minepage-table-item-right-arrow" src="../../assets/img/imgMain/more_ic@2x.png">
          </div>
        </div>
      </div>
      <div class="minepage-table-item" style="margin-top: 0">
        <div class="minepage-table-imageContainer">
          <img src="../../assets/img/imgMine/mine_card_ic.png"/>
        </div>
        <div class="minepage-table-item-right">
          <div class="f28">银行卡管理</div>
          <img class="minepage-table-item-right-arrow" src="../../assets/img/imgMain/more_ic@2x.png">
        </div>
      </div>

      <div class="minepage-table-item">
        <div class="minepage-table-imageContainer">
          <img src="../../assets/img/imgMine/mine_password_ic.png"/>
        </div>
        <div class="minepage-table-item-right">
          <div class="f28">修改密码</div>
          <img class="minepage-table-item-right-arrow" src="../../assets/img/imgMain/more_ic@2x.png">
        </div>
      </div>
      <div class="minepage-table-item">
        <div class="minepage-table-imageContainer">
          <img src="../../assets/img/imgMine/mine_contact_ic.png"/>
        </div>
        <div class="minepage-table-item-right">
          <div class="f28">联系客服</div>
          <img class="minepage-table-item-right-arrow" src="../../assets/img/imgMain/more_ic@2x.png">
        </div>
      </div>
      <div class="minepage-table-item">
        <div class="minepage-table-imageContainer">
          <img src="../../assets/img/imgMine/mine_up_ic.png"/>
        </div>
        <div class="minepage-table-item-right">
          <div class="f28">检查更新</div>
          <div class="minepage-table-item-updage-arrow">
            <span v-show="true" class="f26" style="color: #BBBBBB">当前版本 v2.0.0</span>
            <img class="minepage-table-item-right-arrow" src="../../assets/img/imgMain/more_ic@2x.png">
          </div>
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
      }
    },

    created(){

    },

    methods: {
    },

  }

</script>

<style scoped lang="less">

  .minepage-Header {
    height: 4.066666666rem;
    width: 100%;
    background-repeat: no-repeat;
    background-image: url("../../assets/img/imgMine/user_top_bg.png");
    background-size: cover;
    display: flex;
    flex-direction: column-reverse;
  }
  .minepage-Header-Box {
    height: 2.86666666rem;
    width: 8.306666666rem;
    margin-left: 0.61333333rem;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    img {
      width: 1.8133333rem;
      height: 1.8133333rem;
      display: block;
    }
  }
  .minepage-Header-logined {
    height: 100%;
    flex: auto;
    display: flex;
    flex-direction: column;
    .minepage-Header-user-name {
      font-size: 0.5733333rem;
      color: white;
    }
    .minepage-Header-user-phone {
      color: white;
      margin-top: 0.1rem;
    }
    .minepage-header-button-logout {
      display: flex;
      align-items: center;
      flex: auto;
      img {
        width: 0.266666666rem;
        height: 0.266666666rem;
      }
    }
  }

  .minepage-Header-nologin {
    .minepage-Header-welcome {
      font-size: 0.5733333rem;
      color: white;
    }
    .minepage-header-button-login {
      margin-top: 0.4rem;
      width: 2.8rem;
      height: 0.8rem;
      line-height: 0.8rem;
      border-radius: 0.133333333rem;
      text-align: center;
      color: red;
      background-color: white;
    }
  }

  /*table*/
  .minepage-table-items {
    width: 100%;
    margin-bottom: 0.32rem;
  }
  .minepage-table-item {
    margin-top: 0.3733333rem;
    width: 100%;
    height: 1.6rem;
    display: flex;
    background: #fff;
  }
  .minepage-table-imageContainer {
    width: 13.33333333333%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 0.53333333rem;
      height: 0.56rem;
      margin-left: 0.1rem;
    }
  }
  .minepage-table-item-right {
    flex: auto;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .minepage-table-item-updage-arrow {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .minepage-table-item-right-arrow {
    width: 0.533333333333333rem;
    height: 0.533333333333333rem;
    margin-right: 0.56rem
  }
  .minepage-table-item-updage-arrow {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
