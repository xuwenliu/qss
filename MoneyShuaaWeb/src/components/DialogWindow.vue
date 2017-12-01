<template>
  <div @touchmove.prevent class="show-dialog-box">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'DialogWindow'
  }
</script>
<style scoped>
  .show-dialog-box {
    display: flex;
    background: rgba(0, 0, 0, 0.65);
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .show-input-box > div {
    width: 70%;
  }

</style>
