<template lang="pug">
.notice_box(
  :style="`top: ${top}px; right: ${right}px`"
)
  span 我是可移动的元素
</template>
<script>
import { ref } from "@vue/composition-api";
import useMove from "@/hooks/useMove";

export default {
  props: {
    rules: {
      type: Array,
      default: () => [],
    },
    member: String,
    type: {
      type: String,
      default: "warn",
    },
  },
  setup() {
    // 移动元素ref
    const target = ref(null);
    // 位置
    const { right, top } = useMove({
      right: 30,
      top: 90,
      target,
      refWidth: 200,
      refHeight: 200,
    });

    return {
      target,
      top,
      right,
    };
  },
};
</script>

<style scoped>
.notice_box {
  position: fixed;
  width: 200px;
  height: 200px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-size: 12px;
  z-index: 3000;
  overflow: hidden;
  background: #eced99;
  cursor: move;
  opacity: 0.8;
  text-align: center;
  line-height: 200px;
}
</style>
