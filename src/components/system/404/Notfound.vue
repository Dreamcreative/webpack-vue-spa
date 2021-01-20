<template>
  <div class="bg404">
    <div class="head404" />
    <div class="txtbg404">
      <div class="txtbox">
        <h1>对不起，您请求的页面不存在</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notfound',
  data () {
    return {}
  }
}
</script>
<style scoped>
.bg404{
  width: 100%;
  height: 100%;
  background-color: #494949
}
.head404 {
  width: 580px;
  height: 234px;
  margin: 50px auto 0 auto;
  background: url(https://www.daixiaorui.com/Public/images/head404.png)
    no-repeat;
}

.txtbg404 {
  width: 499px;
  height: 169px;
  margin: 10px auto 0 auto;
  background: url(https://www.daixiaorui.com/Public/images/txtbg404.png)
    no-repeat;
}

.txtbg404 .txtbox {
  width: 390px;
  position: relative;
  top: 30px;
  left: 60px;
  color: #eee;
  font-size: 13px;
}

.txtbg404 .txtbox p {
  margin: 5px 0;
  line-height: 18px;
}

.txtbg404 .txtbox .paddingbox {
  padding-top: 15px;
}

.txtbg404 .txtbox p a {
  color: #eee;
  text-decoration: none;
}

.txtbg404 .txtbox p a:hover {
  color: #fc9d1d;
  text-decoration: underline;
}
</style>
