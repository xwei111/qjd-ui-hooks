<template>
  <i :class="'xw-icon-' + name"></i>
</template>
<script>
export default {
  name: "QjdIcon",
  props:{
    name: {
      type: String,
      default: ''
    }
  }
}
</script>