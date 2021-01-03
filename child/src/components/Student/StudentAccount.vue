  <template>
  <div class="right-main">
    <ve-line :data="chartData" :settings="chartSettings"></ve-line>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'StudentInformation',
  data() {
    this.chartSettings = {
      stack: { 学生: ['平均身高(cm)', '平均体重(g)'] },
      area: true
    }
    return {
      chartData: {
        columns: ['年龄', '平均身高', '平均体重'],
        rows: []
      }
    }
  },
  methods: {
    getdata() {
      var self = this
      axios
        .get('http://114.55.141.250:8181/student/account')
        .then(function (res) {
          console.log(res.data.data)
          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i] !== null) {
              var obj = {}
              obj.年龄 = res.data.data[i].age + '岁'
              obj.平均身高 = res.data.data[i].avgHeight
              obj.平均体重 = res.data.data[i].avgWeight
              self.chartData.rows.push(obj)
            } else continue
          }
          console.log(self.chartData.rows)
        })
        .catch(function (err) {
          console.log(err.data)
        })
    }
  },
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
<style scoped>
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {
  .right-main {
    min-height: 12.031rem;
  }
}
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
  .right-main {
    min-height: 6.1rem;
  }
}
@media screen and (min-width: 1500px) {
  .right-main {
    min-height: 7.1rem;
  }
}
@media screen and (min-width: 1270px) and (max-width: 1500px) and (min-height: 650px) {
  .right-main {
    min-height: 4.5rem;
  }
}
@media screen and (min-width: 1270px) and (max-width: 1500px) {
  .right-main {
    min-height: 3.5rem;
  }
}
</style>
