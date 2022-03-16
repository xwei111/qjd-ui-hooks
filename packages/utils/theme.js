// 动态修改element-ui主题
const version = require("element-ui/package.json").version; // 版本号
const defaultUrl = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;

class ElTheme {
  constructor(url) {
    this.url = url ? url : defaultUrl;
    this.chalk = '';
    this.originalTheme = '#409EFF';
  }
  setTheme(defaultColor) {
    // 设置主题
    if (!this.CheckIsColor(defaultColor)) return
    const themeCluster = this.getThemeCluster(defaultColor.replace("#", ""));
    const originalCluster = this.getThemeCluster(
      this.originalTheme.replace("#", "")
    );
    const getHandler = (variable, id) => {
      return () => {
        const newStyle = this.updateStyle(
          this[variable],
          originalCluster,
          themeCluster
        );
        let styleTag = document.getElementById(id);
        if (!styleTag) {
          styleTag = document.createElement("style");
          styleTag.setAttribute("id", id);
          document.head.appendChild(styleTag);
        }
        styleTag.innerText = newStyle;
      };
    };
    const chalkHandler = getHandler("chalk", "chalk-style");
    if (!this.chalk) {
      this.getCSSString(this.url, chalkHandler, "chalk");
    } else {
      chalkHandler();
    }
  }
  updateStyle(style, oldCluster, newCluster) {
    // 更新主题
    let newStyle = style;
    oldCluster.forEach((color, index) => {
      newStyle = newStyle.replace(new RegExp(color, "ig"), newCluster[index]);
    });
    return newStyle;
  }
  CheckIsColor(bgVal) {
    // 检查是否是颜色
    if (bgVal) {
      var type = "^#[0-9a-fA-F]{6}$";
      var re = new RegExp(type);
      if (bgVal.match(re) == null) {
        type =
          "^[rR][gG][Bb][(]([\\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\\s]*,){2}[\\s]*(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)[\\s]*[)]{1}$";
        re = new RegExp(type);
        if (bgVal.match(re) == null) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    }
  }
  getCSSString(url, callback, variable) {
    // 初始化加载样式
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, "");
        callback();
      }
    };
    xhr.open("GET", url);
    xhr.send();
  }
  getThemeCluster(theme) {
    // 获取系列色
    const tintColor = (color, tint) => {
      let red = parseInt(color.slice(0, 2), 16);
      let green = parseInt(color.slice(2, 4), 16);
      let blue = parseInt(color.slice(4, 6), 16);

      if (tint === 0) {
        return [red, green, blue].join(",");
      } else {
        red += Math.round(tint * (255 - red));
        green += Math.round(tint * (255 - green));
        blue += Math.round(tint * (255 - blue));

        red = red.toString(16);
        green = green.toString(16);
        blue = blue.toString(16);

        return `#${red}${green}${blue}`;
      }
    };

    const shadeColor = (color, shade) => {
      let red = parseInt(color.slice(0, 2), 16);
      let green = parseInt(color.slice(2, 4), 16);
      let blue = parseInt(color.slice(4, 6), 16);

      red = Math.round((1 - shade) * red);
      green = Math.round((1 - shade) * green);
      blue = Math.round((1 - shade) * blue);

      red = red.toString(16);
      green = green.toString(16);
      blue = blue.toString(16);

      return `#${red}${green}${blue}`;
    };

    const clusters = [theme];
    for (let i = 0; i <= 9; i++) {
      clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
    }
    clusters.push(shadeColor(theme, 0.1));
    return clusters;
  }
}

export default ElTheme