<template>
  <div id="app">
    <div v-show="isShowUp" class="scroll_up" @click="upHandle">
      <i class="xw-icon-packup"></i>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isShowUp: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    handleScroll() {
      let appScrollTop = document.getElementById("app").scrollTop;
      this.isShowUp = appScrollTop > 200 ? true : false;
    },
    upHandle() {
      document.getElementById("app").scrollTop = 0;
    },
  },
};
</script>

<style lang="scss">
.scroll_up {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  background: #1890ff;
  bottom: 100px;
  right: 100px;
  border-radius: 50%;
  opacity: 0.7;
  z-index: 999;
  cursor: pointer;
  i {
    font-size: 24px;
    color: #fff;
  }
}
</style>
