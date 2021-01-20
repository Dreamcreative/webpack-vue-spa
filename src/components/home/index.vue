<template>
  <div class="dashboard-editor-container">
    <div>
      <img src="../../assets/images/sq_btn.jpg" class="logo" />
      <span class="logoTitle">测试测试</span>
    </div>
    <div class="content">
      <div class="contentP">
        测试测试测试测试测试测试测试测试测试测试测试测试
      </div>
      <div>
        <button>开始使用</button>
      </div>
    </div>
    <div />
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {
    // 使用hook在mounted周期监听 beforeDestroy周期事件
    this.$once("hook:beforeDestroy", () => {
      console.log("这是beforedestroy ");
    });
  },
  methods: {},
};
</script>

<style scoped>
.logo {
  width: 100px;
  height: 100px;
}
.logoTitle {
  padding-left: 15%;
  font-size: 36px;
  font: bold 80px "华文行楷";
  color: dodgerblue;
  text-shadow: 10px 10px 50px #000;
}
.content {
  text-align: center;
}
.contentP {
  width: 30%;
  font: 500 18px "微软雅黑";
  margin: 0 auto;
  padding-bottom: 30px;
}
.emptyGif {
  display: block;
  width: 50%;
  margin: 0 auto;
}

.dashboard-editor-container {
  background-color: #e3e3e3;
  min-height: 100vh;
  padding: 30px 60px 0px;
}
.el-divider {
  background-color: #b1a8a8;
}
.el-button {
  font-size: 18px;
  font-weight: 800;
}
.aaaaaaaa {
  font-size: 18px;
  font-weight: 800;
}
</style>
