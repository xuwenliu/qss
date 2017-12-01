<template>
  <!--交易记录详情-->
  <div class="dealRecordDetail">
    <TopHeader>
      <div class="clickMe" @click="goBack"><span></span></div>
      <i>提现记录</i></TopHeader>

    <title>提现记录</title>

    <div class="content content-box">
      <img style="width: 100%" :src="image">
    </div>
  </div>
</template>

<script>
  import TopHeader from '../../../components/Header'
  export default {
    name: 'dealRecordDetail',
    components: {
      TopHeader
    },
    data() {
      return {
        image: this.$route.query.image
      }
    },
    created() {
      console.log(this.info)


    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
    }, //methods结束
  }
</script>

<style scoped lang="less">

</style>
