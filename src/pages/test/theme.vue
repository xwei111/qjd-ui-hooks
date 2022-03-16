<template lang="pug">
  //- <div>
  //-   <qjd-theme :size="'small'" :defaultColor="'#000000'"></qjd-theme>
  //-   <div>
  //-     <el-button>默认按钮</el-button>
  //-     <el-button type="primary">主要按钮</el-button>
  //-     <el-radio>radio</el-radio>
  //-     <el-switch v-model="value"></el-switch>
  //-     <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
  //-   </div>
  //- </div>
  div
    qjd-theme(:size="'small'"  :defaultColor="'#000000'")
    div
      el-button 默认按钮
      el-button(type="primary") 主要按钮
      el-radio radio
      el-switch(v-model="value")
      el-pagination(background layout="prev, pager, next" :total="1000")
</template>
<script>
export default {
  data() {
    return {
      value: true,
    };
  },
};
</script>
