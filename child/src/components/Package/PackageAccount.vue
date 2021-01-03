<template>
  <div class="right-main">
    <ve-histogram :data="chartData1" :extend="extend"></ve-histogram>
    <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>
    <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>
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
        columns: ['食材种类', '数量'],
        rows: [
          { 食材种类: '蔬菜', 数量: 20 },
          { 食材种类: '豆制品', 数量: 12 },
          { 食材种类: '猪肉类', 数量: 20 },
          { 食材种类: '粗粮', 数量: 8 },
          { 食材种类: '鱼类', 数量: 15 },
          { 食材种类: '面食', 数量: 23 },
          { 食材种类: '瓜果', 数量: 20 }
        ]
      },
      chartData: {
        columns: ['种类', '采购量'],
        rows: [
          { 种类: '蔬菜类', 采购量: 1393 },
          { 种类: '豆制品', 采购量: 3530 },
          { 种类: '粗粮', 采购量: 2923 },
          { 种类: '鱼类', 采购量: 1723 },
          { 种类: '肉类', 采购量: 3792 },
          { 种类: '其他', 采购量: 4593 }
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
