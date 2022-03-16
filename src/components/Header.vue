<template>
  <div class="header-box">
    <span class="header-title" @click="goHomeHandle">QJD-UI</span>
    <div class="header-coms" @click="goComsHandle">组件</div>
  </div>
</template>
<script>
export default {
  name: "Header",
  methods: {
    goHomeHandle() {
      this.$router.push({ path: "/home" });
    },
    goComsHandle() {
      const { path } = this.$route;
      if (path.indexOf("main") < 0) {
        this.$router.push({ path: "/main" });
      }
    },
  },
};
</script>