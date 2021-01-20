<template>
  <div id="app">
    我的jenkins
    <router-link to="/about"> 111111 </router-link>
    <router-link to="/home"> 222222</router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
#App {
  color: red;
  background: url("./assets/images/sq_btn.jpg") no-repeat;
  border-radius: 50%;
  width: 100%;
  height: 500px;
}
</style>
