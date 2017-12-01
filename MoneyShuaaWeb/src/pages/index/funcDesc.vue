<template>
  <div class="supportBank">

    <TopHeader>
      <div class="clickMe" @click="goBack"><span></span></div>
      <i>功能说明</i></TopHeader>

    <!--<title>功能说明</title>-->

    <div class="content-img-area">
      <img src="../../assets/img/info_part1.png">
      <img src="../../assets/img/info_part2.png">
      <img src="../../assets/img/info_part3.png">
      <!--<img src="../../assets/img/info_part4.png">-->
    </div>
  </div>
</template>

<script>
  import TopHeader from '../../components/Header'

  export default {
    name: 'funcDesc',
    components: {
      TopHeader
    },
    data() {
      return {}
    },
    created() {
    },
    methods: {
      goBack(){
        this.$router.go(-1);
      },
    }, //methods结束
  }
</script>

<style scoped lang="less">

  .content-img-area {

  }

  .content-img-area img {
    width: 100%;
    display: block;
  }
</style>
