<template>
  <div class="generalize">
    <TopHeader>
      <div class="clickMe" @click="goBack"><span></span></div>
      <i>我的收益</i></TopHeader>

    <BottomFooter>
      <div @click="listenerGetMoneyClick">申请提现</div>
    </BottomFooter>

    <DialogWindow v-show="showApplySuccess">
      <div class="show-dialog-box">

        <div class="index-dialog">
          <img src="../../assets/img/txsqcg_ic.png" class="index-dialog-icon">
          <span class="f24 b" style="color: #000000">提现申请已提交</span>
          <span class="f32 fc1 b mt30">提现金额：{{applyMoney}}</span>
          <div class="fc1 f26 mt10">平台会在三个工作日内</div>
          <div class="fc1 f26 mt10">处理您的提现申请</div>
          <div class="fc1 f26 mt10">款项会转到您的收款银行卡</div>
          <button @click="showApplySuccessDialog(false)" class="f28 fc0">知道了</button>
        </div>
      </div>

    </DialogWindow>

    <DialogWindow v-show="showApplyFail">
      <div class="show-dialog-box">

        <div class="index-dialog">
          <img src="../../assets/img/popup_ic_not_pass_n@2x.png" class="index-dialog-icon">
          <span class="f32 fc1 b">提现申请失败</span>
          <div class="fc1 f26 mt10">可提现余额达到10元</div>
          <div class="fc1 f26 mt10">才能申请提现</div>
          <button @click="showApplyFailDialog(false)" class="f28 fc0">知道了</button>
        </div>
      </div>

    </DialogWindow>
    <DialogWindow v-show="showApplyNo">
      <div class="show-dialog-box">

        <div class="index-dialog">
          <img src="../../assets/img/popup_ic_not_pass_n@2x.png" class="index-dialog-icon">
          <span class="f32 fc1 b">提现申请失败</span>
          <div class="fc1 f26 mt10">还存在待处理的提现申请</div>
          <button @click="showApplyNoDialog(false)" class="f28 fc0">知道了</button>
        </div>
      </div>

    </DialogWindow>

    <div class="toast-share f32" v-show="showToast">
      <p>在<span class="b">当前页面</span></p>
      <p>点右上角进行分享</p>
      <p>即可推广快捷收款</p>
    </div>
    <!--generalize.wxml-->
    <div class="content content-box">

      <div style="position:relative;height: 3.333rem;display: flex;justify-content: center;align-items: center;">
        <img style="position: absolute;top:0;left:0;height: 3.333rem;width: 100%" src="../../assets/img/wdsy_bj.png">
        <div
          style="position: absolute; top: 0;left: 0;right: 0;display: flex;flex-direction: column;align-items: center">

          <span class="fc0 f28" style="margin-top: 0.8rem">可提现金额（元）</span>
          <span class="fc0 b" style="margin-top: 0.4rem;font-size: 0.61333rem">{{earningsInfo.canApplyMoney | currency("",2)}}</span>
        </div>

      </div>
      <div class="pos-tab bb1 bg0">
        <span class="pos-tab-title">待处理提现</span>
        <span class="f30 fc3 b">{{earningsInfo.currentApplyMoney | currency("",2)}}元</span>
      </div>

      <div class="pos-tab-area bg0 bb1 bt1 mt30 fc2">
        <div class="pos-tab" @click="listenerClickTotalLog">
          <div class="pos-tab-left">
            <span class="pos-tab-title">累计提现</span>
          </div>
          <div class="pos-tab-btn">
            <span style="margin-right:0.4rem;color: #b2b2b2" class="f24">{{earningsInfo.totalApplyMoney | currency("",2)}}元</span>
            <img class="arrow" src="../../assets/img/more_ic@2x.png"></image>
          </div>
        </div>
        <div class="pos-tab bt1" @click="listenerClickTodayLog">
          <div class="pos-tab-left">
            <span class="pos-tab-title">每日收益</span>
          </div>
          <div class="pos-tab-btn">
            <span style="margin-right:0.4rem;color: #b2b2b2" class="f24">今日收益：{{earningsInfo.todayBrokerage | currency("",2)}}元</span>
            <img class="arrow" src="../../assets/img/more_ic@2x.png"></image>
          </div>
        </div>

      </div>


      <div v-if="logs.length!=0">
        <div style="height:0.74666rem;padding-top:0.48rem;padding-left:0.4rem;color:#888888" class="f32">
          <span>每日记录</span>
        </div>
        <div class="pos-tab-area bg0 bb1 bt1">
          <div class="page-loadmore">
            <div class="page-loadmore-wrapper" ref="wrapper">

              <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
                           @bottom-status-change="handleBottomChange" ref="loadmore" :auto-fill="false"
                           :max-distance="80">
                <div class="pos-tab" v-for="(item,index) in logs" :key="index" :class="{'bb1':index!=logs.length-1}">
                  <div class="pos-tab-left">
                    <span style="margin-right:0.4rem;">{{item.dateKey | setDate}}</span>
                    <span>收款：{{item.orderCount}}单</span>
                  </div>
                  <span>奖金：{{item.brokerage | currency("",2)}}元</span>
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
    </div>

  </div>
</template>

<script>

  import TopHeader from '../../components/Header'
  import BottomFooter from '../../components/Footer'
  import {MessageBox} from 'mint-ui'
  import DialogWindow from '../../components/DialogWindow'
  import {Toast} from 'mint-ui';


  const wx = require("weixin-js-sdk");

  export default {
    name: 'earnings',
    components: {
      TopHeader,
      BottomFooter,
      DialogWindow
    },
    data() {
      return {
        earningsInfo: {},
        allLoaded: false,
        bottomStatus: "",
        showApplySuccess: false,
        showApplyFail: false,
        applyMoney: '',
        failReason: '还存在待处理的提现申请',
        page: 1, //当前页数
        pageSize: 10, //每页请求的条数
        totalPage: 0, //总页数
        logs: [], //每日记录
        showApplyNo: false,
        showToast: false, //是否显示分享滑动层
      }
    },
    created() {
      this.getImplementationNotes();
//      this.getEveryDayRecord();


    },
    mounted() {

    },

    methods: {
      goBack() {
        this.$router.go(-1);
      },

      showApplyNoDialog(show){
        this.showApplyNo = show;
      },

      /*显示提现成功过弹窗*/
      showApplySuccessDialog(show){
        this.showApplySuccess = show;
        if (!show) {
          this.getImplementationNotes()
        }
      },

      showApplyFailDialog(show){
        this.showApplyFail = show;
      },

      getImplementationNotes() {
        this.$http.get(`${window.Host.apiHost}/pos/twitter/general`).then((res) => {
          console.log(res);
          if (res.data.stateCode === 0) {
            this.earningsInfo = res.data.data;
            this.applyMoney = this.earningsInfo.canApplyMoney;
          } else {
            Toast({message: res.data.message, position: 'center', duration: 3000});
          }
        })
      },
      alertToast() {
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 5000);
      },

      //提现
      listenerGetMoneyClick() {
        if (this.earningsInfo.canApplyMoney < 10) {
          this.showApplyFailDialog(true);
          return false;
        }

        this.$http.post(`${window.Host.apiHost}/pos/twitter/apply`).then((res) => {
          console.log(res)
          if (res.data.stateCode === 0) {
            this.showApplySuccessDialog(true)
          } else {
            if (res.data.stateCode === 1803) {
              this.showApplyNoDialog(true)
            } else {
              MessageBox({
                closeOnClickModal: false,
                confirmButtonText: "我知道了",
                title: '提示',
                message: res.data.message,
                showCancelButton: false
              });
            }

//            Toast({message: res.data.message, position: 'center', duration: 3000});
          }
        })
      },


      /*查看每日收益记录*/
      listenerClickTodayLog() {
        this.$router.push({"name": "earningsRecord"});
      },
      /*查看累计提现记录*/
      listenerClickTotalLog() {
        this.$router.push({"name": "depositRecord"});
      },
      getEveryDayRecord() {
        this.$http.get(`${window.Host.apiHost}/pos/spread/statistics?pageNum=${this.page}&pageSize=${this.pageSize}`).then((res) => {
          console.log(res);
          console.log(this.page);
          if (res.data.stateCode === 0) {
            this.onResponseListData(res.data.data);
          } else {
            MessageBox({
              closeOnClickModal: false,
              confirmButtonText: "我知道了",
              title: '提示',
              message: res.data.message,
              showCancelButton: false
            });
          }
        })
      },


      onResponseListData(data) {
        if (!data) {
          this.allLoaded = true;
          return false;
        } else {
          if (data.length < this.pageSize) {
            this.allLoaded = true;
          }
          if (this.page == 1) {
            this.logs = data;
          } else {
            this.logs = this.logs.concat(data);
          }

        }

      },

      //mint-ui 上拉加载
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      loadBottom() {
        this.page += 1;
        setTimeout(() => {
          this.getEveryDayRecord();
          this.$refs.loadmore.onBottomLoaded();
        }, 1500);
      },
    }, //methods结束
  }
</script>

<style scoped lang="less">
  .content {
    bottom: 1.33333rem;
  }

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

  .index-dialog p {
    text-align: center;
    font-size: 0.42666rem;
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

  .mint-loadmore-bottom span {
    display: inline-block;
    vertical-align: middle
  }

  .pos-tab-area {
  }

  .pos-tab {
    height: 1.33333rem;
    display: flex;
    font-size: 0.42666rem;
    padding: 0 0.74666rem;
    align-items: center;
    justify-content: space-between;
  }

  .pos-tab-title {
    margin-right: 0.66666rem;
  }

  .pos-tab-btn {
    width: 4.06666rem;
    height: 1.14666rem;
    display: flex;
    font-size: 0.34666rem;
    color: #828282;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }
</style>
