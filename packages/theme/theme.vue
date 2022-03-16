
<template>
  <el-color-picker
    :size="size"
    v-model="theme"
    class="theme-picker"
    @change="onChange"
    :predefine="predefineColors"
    popper-class="theme-picker-dropdown"
  >
  </el-color-picker>
</template>
 
<script>
import ElTheme from "../utils/theme";

export default {
  name: "QjdTheme",
  data() {
    return {
      theme: "",
      predefineColors: Object.freeze([
        "#409EFF",
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
        "#c71585",
        "rgba(255, 69, 0, 0.68)",
        "rgb(255, 120, 0)",
        "hsv(51, 100, 98)",
        "hsva(120, 40, 94, 0.5)",
        "hsl(181, 100%, 37%)",
        "hsla(209, 100%, 56%, 0.73)",
        "#c7158577",
      ]),
      elTheme: null,
    };
  },
  props: {
    size: {
      type: String,
      default() {
        return "";
      },
    },
    defaultColor: {
      type: String,
    },
    isCache: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      default: '',
    },
  },
  mounted() {
    this.elTheme = new ElTheme(this.url);
    const colorPicker = localStorage.getItem("colorPicker");
    const { defaultColor } = this;
    this.theme = colorPicker
      ? colorPicker
      : defaultColor
      ? defaultColor
      : this.elTheme.originalTheme;
  },
  watch: {
    theme(val) {
      if (typeof val !== "string" || !val) return;
      this.isCache && localStorage.setItem("colorPicker", val);
      this.elTheme.setTheme(val);
    },
  },
  methods: {
    clearCache() {
      localStorage.removeItem("colorPicker");
    },
    onChange(e) {
      if (e) {
        this.theme = e;
      }
    },
  },
  beforeDestroy() {
    this.elTheme = null
  }
};
</script>