<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card" shadow="always">
            <el-row>
              <el-col :span="12">
                <h1 class="el-icon-s-custom" style="color: #40c9c6"></h1>
              </el-col>
              <el-col :span="12">
                <h4 style="color: #8c8c8c">平台用户量</h4>
                <h5 style="color: #666666">{{ data1 }}</h5>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card" shadow="always">
            <el-row>
              <el-col :span="12">
                <h1 class="el-icon-food" style="color: #36a3f7"></h1>
              </el-col>
              <el-col :span="12">
                <h4 style="color: #8c8c8c">食物库存</h4>
                <h5 style="color: #666666">{{ data2 }}</h5>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card" shadow="always">
            <el-row>
              <el-col :span="12">
                <h1 class="el-icon-shopping-cart-2" style="color: #34bfa3"></h1>
              </el-col>
              <el-col :span="12">
                <h4 style="color: #8c8c8c">食材库存</h4>
                <h5 style="color: #666666">{{ data3 }}</h5>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card" shadow="always">
            <el-row>
              <el-col :span="12">
                <h1 class="el-icon-collection" style="color: #f4516c"></h1>
              </el-col>
              <el-col :span="12">
                <h4 style="color: #8c8c8c">总计配餐量</h4>
                <h5 style="color: #666666">{{ data4 }}</h5>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <!--数据统计部分-->
    <el-row>
      <ve-line :data="chartData"></ve-line>
    </el-row>
    <!--图片渲染-->
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-card :body-style="{ padding: '0px' }">
            <div style="max-height: 350px; postion: relative">
              <div
                @mouseenter="isshow()"
                @mouseleave="noshow()"
                style="z-index: 2"
              >
                <img
                  src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1087464797,922554398&fm=15&gp=0.jpg"
                  class="image"
                />
              </div>
              <div
                class="mask"
                v-show="mask"
                @mouseenter="isshow()"
                @mouseleave="noshow()"
              >
                <h3>彩色馒头</h3>
                <p>
                  彩色馒头主要通过面粉和水果混合制作而成，味道甜软，适合所有餐次，美丽的彩色深受喜爱
                </p>
              </div>
            </div>
            <div style="padding: 14px">
              <span>彩色馒头</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <!--图片2-->
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-card :body-style="{ padding: '0px' }">
            <div style="max-height: 350px; postion: relative">
              <div
                id="box1"
                @mouseenter="isshow1()"
                @mouseleave="noshow1()"
                style="z-index: 2"
              >
                <img
                  src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1604968746&di=49421e22ca8bd0aadcc0bf9ee3719988&src=http://photocdn.sohu.com/20160209/mp58427114_1454964920221_14.jpeg"
                  class="image"
                />
              </div>
              <div
                id="pi2"
                class="mask1"
                v-show="mask1"
                @mouseenter="isshow1()"
                @mouseleave="noshow1()"
              >
                <h3>可乐鸡翅</h3>
                <p>鸡翅肉质鲜嫩，适合儿童食用，味美色香</p>
              </div>
            </div>
            <div style="padding: 14px">
              <span>可乐鸡翅</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-card :body-style="{ padding: '0px' }">
            <div style="max-height: 350px; postion: relative">
              <div
                id="box1"
                @mouseenter="isshow2()"
                @mouseleave="noshow2()"
                style="z-index: 2"
              >
                <img
                  src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2834037920,419808426&fm=26&gp=0.jpg"
                  class="image"
                />
              </div>
              <div
                id="pi2"
                class="mask1"
                v-show="mask2"
                @mouseenter="isshow2()"
                @mouseleave="noshow2()"
              >
                <h3>排骨山药</h3>
                <p>排骨鲜嫩美味，山药丝滑，营养价值很高</p>
              </div>
            </div>
            <div style="padding: 14px">
              <span>可乐鸡翅</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      chartData: {
        columns: ['月份', '食物平均评分', '食材平均评分', '套餐平均评分'],
        rows: [
          { 月份: '1月', 食物平均评分: 15, 食材平均评分: 34, 套餐平均评分: 23 },
          { 月份: '2月', 食物平均评分: 25, 食材平均评分: 23, 套餐平均评分: 45 },
          { 月份: '3月', 食物平均评分: 27, 食材平均评分: 43, 套餐平均评分: 12 },
          { 月份: '4月', 食物平均评分: 15, 食材平均评分: 15, 套餐平均评分: 34 },
          { 月份: '5月', 食物平均评分: 23, 食材平均评分: 24, 套餐平均评分: 56 },
          { 月份: '6月', 食物平均评分: 34, 食材平均评分: 19, 套餐平均评分: 23 }
        ]
      },
      currentDate: new Date(),
      data1: '',
      data2: '',
      data3: '',
      data4: '',
      mask: false,
      mask1: false,
      mask2: false
    }
  },
  methods: {
    isshow() {
      this.mask = true
      console.log('鼠标划入')
    },
    noshow() {
      this.mask = false
      console.log('鼠标划出')
    },
    isshow1() {
      this.mask1 = true
      console.log('鼠标划入1')
    },
    noshow1() {
      this.mask1 = false
      console.log('鼠标划出1')
    },
    isshow2() {
      this.mask2 = true
      console.log('鼠标划入1')
    },
    noshow2() {
      this.mask2 = false
      console.log('鼠标划出1')
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  mounted() {
    axios
      .get('http://114.55.141.250:8181/home/statistics')
      .then((res) => {
        console.log(res.data.data)
        var temp = JSON.parse(res.data.data)
        console.log(temp)
        this.data1 = temp.data[0]
        this.data2 = temp.data[1]
        this.data3 = temp.data[2]
        this.data4 = temp.data[3]
      })
      .catch((err) => {
        console.log(err.data)
      })
  }
}
</script>

<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 100%;
  height: 100%;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 100px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 32.5%;
  min-height: 2.5rem;
  background: rgba(0, 0, 0, 0.7);
  color: #ffffff;
}
.mask1 {
  position: absolute;
  top: 0;

  width: 32.5%;
  min-height: 2.5rem;
  background: rgba(0, 0, 0, 0.7);
  color: #ffffff;
}
</style>
