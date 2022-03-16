<template>
  <div class="home">
    <Header />
    <router-view />
  </div>
</template>
<script>
import Header from "@/components/Header";
export default {
  name: "Home",
  components: {
    Header,
  },
};
</script>
<style lang="scss" scoped>
.home {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
}
</style>