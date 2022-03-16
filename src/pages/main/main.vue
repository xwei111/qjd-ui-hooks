<template>
  <div class="main">
    <div class="mainContent">
      <Slider></Slider>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Slider from "@/components/Slider";
export default {
  name: "Main",
  components: {
    Slider,
  },
};
</script>
<style lang="scss" scoped>
.main {
  flex: 1;
  background: #f7f7f7;
  display: flex;
  padding: 10px 50px;
  .mainContent {
    flex: 1;
    display: flex;
    background: #fff;
    border-radius: 4px;
    overflow: hidden;
  }
}
</style>