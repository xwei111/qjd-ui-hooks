<template>
  <div class="demo_container">
    <div v-show="isShowCode">
      <slot name="desc"></slot>
      <slot name="code"></slot>
    </div>
    <div class="show_code" @click="showHandle">
      {{ isShowCode ? "隐藏代码" : "显示代码" }}
    </div>
  </div>
</template>

<script>
export default {
  name: "demo-block",
  data() {
    return {
      isShowCode: false,
    };
  },
  methods: {
    showHandle() {
      this.isShowCode = !this.isShowCode;
    },
  },
};
</script>

