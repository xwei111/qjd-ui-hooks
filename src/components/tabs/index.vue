<template lang="pug">
div(:class="setClass()")
  .u-header-tablist
    el-tabs(v-model="tabItem", @tab-click="tabCLick")
      el-tab-pane(
        v-for="item in dataSource",
        :key="item.value",
        :label="item.label",
        :name="item.value"
      )
</template>
<script>
import { ref } from "@vue/composition-api";

export default {
  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
    defaultTab: String,
    type: {
      type: String,
      default: "normal",
    },
  },
  setup(props, { emit }) {
    const tabItem = ref(props.defaultTab);

    const tabCLick = (e) => emit("tabCLick", e && e.name ? e.name : "");
    // 手动设置
    const setCurrentTab = (val) => {
      tabItem.value = val;
    };

    // 根据不同type设定class
    const setClass = () => {
      // 默认样式
      const className = ["page-layout-three-section-tab"];
      // 样式二，样例：风险列表：riskList
      if (props.type === "backgroundLine") {
        className.push("p-tabs-background-line");
      }
      // 样式三，在样式二基础上，没有背景色，没有阴影，没有边框，样例：客户评估详情-企业风险-数据概览
      if (props.type === "noBackground") {
        className.push("p-tabs-background-line");
        className.push("p-no-background");
      }
      return className.join(" ");
    };

    return {
      tabItem,
      tabCLick,
      setCurrentTab,
      setClass,
    };
  },
};
</script>
<style lang="scss" scoped>
.page-layout-three-section-tab {
  background-color: #fff;
  border: 1px solid #EAEBEE;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.05);
  margin-bottom: 13px;
  padding: 5px 34px 0;
  .u-header-tablist {
    >>>.el-tabs__header {
      margin-bottom: 8px;
      .el-tabs__item {
        height: 38px;
        &.is-active {
          color: #4C6EBC;
        }
      }
      .el-tabs__item:hover {
        color: #4C6EBC;
      }
      .el-tabs__nav-wrap::after {
        background-color: #fff;
      }
      .el-tabs__active-bar {
        background-color: #4C6EBC;
      }
    }
  }
}
.p-tabs-background-line {
  margin-bottom: 0;
  border: none;
  padding: 5px 20px 0 20px;
  .u-header-tablist {
    border-bottom: 2px solid #EAEBEE;
    >>>.el-tabs__header {
      margin-bottom: 0;
      .el-tabs__item {
        font-weight: normal;
        color: #9aa6b8;
        min-width: 95px;
        text-align: center;
        height: 40px;
        padding: 0;
      }
      .el-tabs__active-bar {
        min-width: 95px;
        border-bottom: 3px solid #3c5da4;
      }
    }
  }
}
.p-no-background {
  background: none;
  box-shadow: none;
}
</style>
