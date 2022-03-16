<template>
  <div class="slider-box">
    <div v-for="item in sliderData" :key="item.id">
      <p
        :class="[
          item.children ? 'slider-parentTitle' : 'slider-title',
          { 'slider-selectCss': $route.name == item.key },
        ]"
        @click="selectSlider(item)"
      >
        {{ item.title }}
      </p>
      <div v-if="item.children">
        <p
          :class="[
            'slder-childTitle',
            { 'slider-selectCss': $route.name == e.key },
          ]"
          v-for="e in item.children"
          :key="e.key"
          @click="selectSlider(e)"
        >
          {{ e.title }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import sliderData from '@/consts/slider';
export default {
  name: "Slider",
  data() {
    return {
      sliderData: sliderData,
    };
  },
  methods: {
    selectSlider(e) {
      if (e && !e.children && e.key !== this.$route.name) {
        this.$router.push({ path: `/main/${e.key}` });
      }
    },
  },
};
</script>