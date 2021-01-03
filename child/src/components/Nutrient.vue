<template>
  <div>
    <ve-line :data="chartData" :settings="chartSettings"></ve-line>
    <ve-scatter :data="chartData1" theme-name="男生营养标准"></ve-scatter>
    <ve-scatter :data="chartData2" theme-name="女生营养标准"></ve-scatter>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    this.chartSettings = {
      axisSite: { right: ['男生体重', '女生体重'] },
      yAxisType: ['normal', 'normal'],
      yAxisName: ['身高(厘米)', '体重(千克)']
    }
    return {
      tempdata: [],
      chartData: {
        columns: ['年龄', '男生身高', '女生身高', '男生体重', '女生体重'],
        rows: []
      },
      chartData1: {
        columns: [
          '年龄',
          '碳水化合物',
          '能量',
          '蛋白质',
          '钙',
          '脂质',
          '钠',
          '镁',
          '维生素A',
          '维生素B1',
          '维生素B2',
          '维生素B6'
        ],
        rows: []
      },
      chartData2: {
        columns: [
          '年龄',
          '碳水化合物',
          '能量',
          '蛋白质',
          '钙',
          '脂质',
          '钠',
          '镁',
          '维生素A',
          '维生素B1',
          '维生素B2',
          '维生素B6'
        ],
        rows: []
      }
    }
  },
  methods: {
    getdata() {
      var self = this
      axios
        .get('http://114.55.141.250:8181/student/avghw')
        .then(function (res) {
          console.log(res.data)
          for (var i = 0; i < res.data.data.length; i++) {
            var obj = {}
            obj.年龄 = res.data.data[i].age + '岁'
            obj.男生身高 = res.data.data[i].heightM
            obj.女生身高 = res.data.data[i].heightF
            obj.男生体重 = res.data.data[i].weightM
            obj.女生体重 = res.data.data[i].weightF
            self.chartData.rows.push(obj)
          }
          console.log(self.chartData.rows)
        })
        .catch(function (err) {
          console.log(err.data)
        })
    },
    getdata1() {
      var self = this
      axios
        .get('http://114.55.141.250:8181/student/boystandard')
        .then(function (res) {
          console.log(res.data)
          for (var i = 0; i < res.data.data.length; i++) {
            var obj = {}
            obj.年龄 = res.data.data[i].age + '岁男'
            obj.碳水化合物 = res.data.data[i].carbohydrates
            obj.能量 = res.data.data[i].energy
            obj.蛋白质 = res.data.data[i].protein
            obj.钙 = res.data.data[i].ca
            obj.钠 = res.data.data[i].na
            obj.脂质 = res.data.data[i].fat
            obj.镁 = res.data.data[i].mg
            obj.维生素A = res.data.data[i].vitaminA
            obj.维生素B = res.data.data[i].vitaminB
            obj.维生素B2 = res.data.data[i].vitaminB2
            obj.维生素B6 = res.data.data[i].vitaminB6
            self.chartData1.rows.push(obj)
          }
          console.log(self.chartData1.rows)
        })
        .catch(function (err) {
          console.log(err.data)
        })
    },
    getdata2() {
      var self = this
      axios
        .get('http://114.55.141.250:8181/student/girlstandard')
        .then(function (res) {
          console.log(res.data)
          for (var i = 0; i < res.data.data.length; i++) {
            var obj = {}
            obj.年龄 = res.data.data[i].age + '岁女'
            obj.碳水化合物 = res.data.data[i].carbohydrates
            obj.能量 = res.data.data[i].energy
            obj.蛋白质 = res.data.data[i].protein
            obj.钙 = res.data.data[i].ca
            obj.钠 = res.data.data[i].na
            obj.脂质 = res.data.data[i].fat
            obj.镁 = res.data.data[i].mg
            obj.维生素A = res.data.data[i].vitaminA
            obj.维生素B = res.data.data[i].vitaminB
            obj.维生素B2 = res.data.data[i].vitaminB2
            obj.维生素B6 = res.data.data[i].vitaminB6
            self.chartData2.rows.push(obj)
          }
          console.log(self.chartData2.rows)
        })
        .catch(function (err) {
          console.log(err.data)
        })
    }
  },
  mounted() {
    this.getdata1()
    this.getdata2()
    this.getdata()
  }
}
</script>
<style  scoped>
</style>
