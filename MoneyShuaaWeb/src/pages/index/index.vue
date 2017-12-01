<template>
  <div  style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;">

    <mt-tab-container v-model="active">
      <mt-tab-container-item id="mainPage">
        <MainPage></MainPage>
      </mt-tab-container-item>
      <mt-tab-container-item id="sharePage">
        <SharePage></SharePage>
      </mt-tab-container-item>
      <mt-tab-container-item id="minePage">
        <MinePage></MinePage>
      </mt-tab-container-item>
    </mt-tab-container>

    <!--选项卡-->
    <div class="status-customer">
      <ul>
        <li class="F4 C1 mgl40" v-for="(item,index) in tabbarItems" @click="goTab(index)">
          <div class="index-tabbar-item">
            <img v-show="inow == index" :src="item.lightImage"/>
            <img v-show="inow != index" :src="item.normalImage"/>
            <div class="f22" style="margin-top: 0.04rem" :class="{'active':inow==index}">{{item.name}}</div>
          </div>
        </li>
      </ul>
    </div>

  </div>

</template>
<script>

  import MainPage from '../main/mainPage';
  import SharePage from '../share/sharePage';
  import MinePage from '../mine/minePage';

  import {MessageBox} from 'mint-ui';
  import {Indicator} from 'mint-ui';
  import { TabContainer, TabContainerItem } from 'mint-ui';

  export default{
    name: 'mainPage',
    components: {
      MainPage,
      SharePage,
      MinePage
    },
    data(){
      return {
        active: 'mainPage',
        inow: 0,
        index: 0,
        tabbarItems:[
          {
            name:'首页',
            lightImage:require('../../assets/img/tabbar/tab_home_ic_light@2x.png'),
            normalImage:require('../../assets/img/tabbar/tab_home_ic.png')
          },
          {
            name:'分享',
            lightImage:require('../../assets/img/tabbar/tab_share_ic_light.png'),
            normalImage:require('../../assets/img/tabbar/tab_share_ic_n@2x.png')
          },
          {
            name:'我的',
            lightImage:require('../../assets/img/tabbar/tab_mine_ic_light.png'),
            normalImage:require('../../assets/img/tabbar/tab_mine_ic_n@2x.png')
          }
        ]
      }
    },

    created(){
    },

    methods: {
      goTab(index) {
        this.inow = index;
        switch (index) {
          case 0:
            this.active = 'mainPage';
            break;
          case 1:
            this.active = 'sharePage';
            break;
          case 2:
            this.active = 'minePage';
            break;
          default:
            break;
        }
      }
    },
  }

</script>

<style scoped lang="less">

  .status-customer {
    background-color: #fff;
    position: fixed;
    z-index: 100;
    left: 0;
    right: 0;
    bottom: 0;
    ul {
      display: flex;
      li {
        flex: 1;
      }
    }
  }
  .active {
    color: #FB3727;
  }
  .index-tabbar-item {
    width: 100%;
    height: 1.24rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #A8A8A8;
    img {
      width: 0.56rem;
      height: 0.56rem;
    }
  }
</style>
