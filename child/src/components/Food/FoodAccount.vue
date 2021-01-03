<template>
  <div class="right-main">
    <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>
    <ve-waterfall :data="chartData1"></ve-waterfall>
  </div>
</template>
<script>
export default {
  data() {
    this.chartSettings = {
      roseType: 'radius'
    }
    this.extend = {
      series: {
        label: { show: true, position: 'top' }
      }
    }
    return {
      chartData1: {
        columns: ['适宜餐次', '食物'],
        rows: [
          { 适宜餐次: '早餐', 食物: 10 },
          { 适宜餐次: '午餐', 食物: 10 },
          { 适宜餐次: '晚餐', 食物: 20 },
          { 适宜餐次: '早午餐', 食物: 8 },
          { 适宜餐次: '早晚餐', 食物: 15 },
          { 适宜餐次: '午晚餐', 食物: 23 },
          { 适宜餐次: '全部餐次', 食物: 20 }
        ]
      },
      chartData: {
        columns: ['口感', '食用量'],
        rows: [
          { 口感: '香辣', 食用量: 1393 },
          { 口感: '甜辣', 食用量: 3530 },
          { 口感: '鲜香', 食用量: 2923 },
          { 口感: '糯香', 食用量: 1723 },
          { 口感: '酸甜', 食用量: 3792 },
          { 口感: '酸辣', 食用量: 4593 }
        ]
      }
    }
  },
  methods: {},
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  mounted() {
    this.getdata()
  }
}
</script>

<style  scoped>
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {
  .right-main {
    min-height: 12.031rem; /*no*/
  }
}
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
  .right-main {
    min-height: 6.1rem; /*no*/
  }
}
@media screen and (min-width: 1500px) {
  .right-main {
    min-height: 7.1rem; /*no*/
  }
}
@media screen and (min-width: 1270px) and (max-width: 1500px) and (min-height: 650px) {
  .right-main {
    min-height: 4.5rem; /*no*/
  }
}
@media screen and (min-width: 1270px) and (max-width: 1500px) {
  .right-main {
    min-height: 3.5rem; /*no*/
  }
}
</style>
