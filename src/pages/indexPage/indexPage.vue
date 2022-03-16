<template>
  <div class="index-content-box">
    <div class="index-content">
      QJD-UI
    </div>
    <div class="index-bottom">
      <div class="index-navbtn">
        <p @click="goComsHandle">开始使用</p>
        <p @click="goGitHandle">GitLab</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "IndexPage",
  methods: {
    goComsHandle() {
      this.$router.push({ path: "/main" });
    },
    goGitHandle() {
      window.open("https://gitlab.qjdchina.com/FE-zhuozhu/qjdui")
    },
  },
};
</script>
