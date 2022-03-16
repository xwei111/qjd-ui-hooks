<template lang="pug">
.desc-box(:class="[border ? 'desc-border' : '']")
  .desc-item(
    v-for="item in columns",
    :key="item.key",
    :style="`width: ${item.num ? 100 / item.num : 100 / num}%`",
    :class="[inline ? 'desc-item-row' : 'desc-item-column']"
  )
    .desc-default.desc-item-label(
      :style="`width: ${labelWidth}px`"
      :class="[border ? 'desc-item-border' : '', inline ? '' : 'desc-item-label-column', labelWidth || labelWidth === 0 ? '' : 'desc-item-label-flex', labelBg ? 'desc-item-label-bg' : '']"
    ) {{ item.label }}
    .desc-default.desc-item-content(
      :class="[inline ? 'desc-item-content-row' : 'desc-item-content-column', border ? 'desc-item-border' : '']"
    )
      slot(v-if="slots[item.key]", :name="item.key", :dataSource="dataSource")
      fragment(v-else) {{ item.render ? item.render(dataSource, dataSource && dataSource[item.key] ? dataSource[item.key] : '') : dataSource && dataSource[item.key] ? dataSource[item.key] : '- -' }}
</template>
<script>
/**
 * @param labelWidth label宽度是否自定义
 * @param labelBg label是否有背景色
 * @param num 一行显示数量，默认为2
 * @param inline 标题和内容是否在一行，默认为一行
 * @param border 是否有border，默认有
 * @param columns 标题数据集合，类型为数组
 * @param dataSource 详情数据，类型为对象
 */
export default {
  props: {
    labelWidth: {
      type: Number,
      default: null
    },
    labelBg: {
      type: Boolean,
      default: true,
    },
    num: {
      type: Number,
      default: 2,
    },
    inline: {
      type: Boolean,
      default: true,
    },
    border: {
      type: Boolean,
      default: true,
    },
    columns: {
      type: Array,
      default: () => [],
    },
    dataSource: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { slots }) {
    return {
      slots,
    };
  },
};
</script>
<style lang="scss" scoped>
.desc-box {
  display: flex;
  flex-wrap: wrap;
  width: auto;
  font-size: 12px;
  overflow: hidden;
  &.desc-border {
    box-sizing: border-box;
    border-top: 1px solid #ebeef5;
    border-left: 1px solid #ebeef5;
  }
  .desc-item {
    display: flex;
    overflow: hidden;
    &.desc-item-row {
      flex-direction: row;
    }
    &.desc-item-column {
      flex-direction: column;
    }
    .desc-default {
      padding: 12px 10px;
    }
    .desc-item-label {
      display: flex;
      color: #909399;
      font-weight: 700;
      overflow: hidden;
      &.desc-item-label-flex {
        flex: 1;
      }
      &.desc-item-label-column {
        flex: 0 0 auto;
      }
      &.desc-item-label-bg {
        background: #f8fbfd;
      }
    }
    .desc-item-content {
      color: #606266;
      overflow: hidden;
      flex-wrap: wrap;
      word-wrap: break-word;
      &.desc-item-content-row {
        flex: 2.2;
      }
      &.desc-item-content-column {
        flex: 1;
      }
    }
  }
  .desc-item-border {
    box-sizing: border-box;
    border-right: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
  }
}
</style>
