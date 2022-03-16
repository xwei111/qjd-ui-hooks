<template lang="pug">
.pop_box(v-if="visible")
  .pop_card(:style="realeStyle")
    .pop_card_arrow_top(
      v-if="current.direction === 'top' || !current.direction"
    )
    .pop_card_arrow_bottom(v-if="current.direction === 'bottom'")
    .pop_card_arrow_left(v-if="current.direction === 'left'")
    .pop_card_content
      div
        i.icon.iconfont.iconqipaotishi.custom_icon
      .pop_card_content_txt {{ current && current.text ? current.text : '' }}
    .pop_card_sure(@click="nextHandle") 好的，知道了
</template>
<script>
import { computed, onMounted, ref } from "@vue/composition-api";
// import store from "@/store";
import useTimeout from "@/hooks/useTimeout";

// 由于各屏幕分辨率不同，所以元素可能不在屏幕内需传入当前元素id和父级id（当前项目滚动区域均为el-scrollbar），默认滚动wraper为内容区，但滚动区域为菜单区域时请传入id
// 当前滚动元素计算均是根据厂服实际项目计算，若不适用请自行扩展
/**
 * @param dataSource pop数据
 * @visible 显示隐藏
 */
// 箭头高度
const arrowH = 16;

export default {
  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
    visible: Boolean,
    top: {
      type: Number,
      default: 60,
    },
    isElScrollBar: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { emit }) {
    const { perTimeout } = useTimeout();
    // 存储步骤
    const { dataSource = [] } = props;
    const index = ref(0);
    const current = ref(dataSource && dataSource.length ? dataSource[index.value] : {})
    // 重置引导
    const resetHandle = () => {
      index.value = 0
      current.value = dataSource[index.value]
    }
    // 获取滚动元素-element-ui滚动容器
    const getElScrollBar = (data) => {
      const { parentId } = data || {}
      let wrap;
      const wraps = document.querySelectorAll(".el-scrollbar__wrap");
      wraps.forEach((item) => {
        if (item.parentNode.id === (parentId ? parentId : "content_view")) wrap = item;
      });
      return wrap;
    };
    const getWraper = (data) => {
      const { parentId } = data
      if(parentId === 'body' || !parentId) return document.body
      else return document.getElementById(parentId)
    }
    // 设置current,并抛出操作
    const setCurrent = (data) => {
      current.value = data;
      const end = index.value === dataSource.length;
      emit("nextHandle", { step: index.value, end });
    };
    // 设置
    const setPos = (data) => {
      const { isElScrollBar, top } = props
      const newData = data ? JSON.parse(JSON.stringify(data)) : {};
      const { clientHeight: bodyH } = document.body;
      const wrap = isElScrollBar ? getElScrollBar(newData) : getWraper(newData);
      const el = document.getElementById(newData.id);
      // 无id表示元素初始状态在屏幕内
      if (!el) {
        setCurrent(newData);
        wrap && wrap.scrollTo({ top: 0 });
      } else {
        const { offsetTop: elT, clientHeight: elH } = el || {};
        // 是否超出屏幕
        if (elT + top + elH > bodyH) {
          // 若元素因不同分辨率可能不在屏幕内请将箭头方向设置为bottom
          wrap && wrap.scrollTo({ top: elT + top + elH - bodyH });
          newData.bottom = newData.direction === "bottom" ? elH + arrowH : 0;
          setCurrent(newData)
        } else {
          wrap && wrap.scrollTo({ top: 0 });
          newData.bottom =
            newData.direction !== "bottom"
              ? bodyH - elT - top - elH
              : bodyH - elT - top + arrowH;
          setCurrent(newData);
        }
      }
    };
    // 下一步
    const nextHandle = () => {
      index.value++;
      const data = dataSource[index.value];
      setPos(data);
    };
    // resize
    window.addEventListener("resize", () => perTimeout(() => setPos(dataSource[index.value]), 0));
    // 初始化-针对菜单数据每次刷新是异步获取（建议菜单、用户等数据存缓存）
    onMounted(() => perTimeout(() => setPos(dataSource[index.value]), 0));
    // watch 菜单栏数据初始化或刷新为异步获取，需监听数据变化更新位置
    // watch(
    //   () => store.state.customMenuList,
    //   (val) => val && perTimeout(() => setPos(dataSource[index.value]), 0)
    // );
    // 获取位置
    const realeStyle = computed(() =>
      current.value
        ? {
            left:
              current.value.left || current.value.left === 0
                ? `${current.value.left}px`
                : "",
            right:
              current.value.right || current.value.right === 0
                ? `${current.value.right}px`
                : "",
            top:
              current.value.top || current.value.top === 0
                ? `${current.value.top}px`
                : "",
            bottom:
              current.value.bottom || current.value.bottom === 0
                ? `${current.value.bottom}px`
                : "",
          }
        : {}
    );

    return {
      current,
      nextHandle,
      realeStyle,
      resetHandle
    };
  },
};
</script>
<style lang="scss" scoped>
.pop_box {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0);
  .pop_card {
    width: 230px;
    min-height: 125px;
    background: #fff;
    position: absolute;
    filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.6));
    box-sizing: border-box;
    padding: 20px;
    .pop_card_arrow_top {
      position: absolute;
      width: 0;
      height: 0;
      top: -14px;
      left: 12px;
      border-right: 14px solid transparent;
      border-left: 14px solid transparent;
      border-bottom: 14px solid #fff;
    }
    .pop_card_arrow_bottom {
      position: absolute;
      width: 0;
      height: 0;
      bottom: -14px;
      left: 12px;
      border-right: 14px solid transparent;
      border-left: 14px solid transparent;
      border-top: 14px solid #fff;
    }
    .pop_card_arrow_left {
      position: absolute;
      width: 0;
      height: 0;
      bottom: 12px;
      left: -14px;
      border-top: 14px solid transparent;
      border-bottom: 14px solid transparent;
      border-right: 14px solid #fff;
    }
    .pop_card_content{
      display: flex;
      margin-bottom: 40px;
      .custom_icon {
        color: #4D7FD5;
        margin-right: 10px;
        font-size: 20px;
        position: relative;
        top: -4px;
      }
      .pop_card_content_txt {
        font-size: 12px;
        color: #494949;
        line-height: 17px;
      }
    }
    .pop_card_sure {
      cursor: pointer;
      text-align: right;
      font-size: 12px;
      font-weight: 500;
      color: #4D7FD5;
    }
  }
}
  
  
</style>
