<template>
  <div>
    <el-carousel
      :interval="4000"
      type="card"
      height="300px"
      style="width: 100%"
    >
      <el-carousel-item v-for="item in 6" :key="item" style="height: 100%">
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <el-container style="height: 200px">
      <el-card style="height: 100%; width: 100%">
        <div slot="header" class="clearfix">
          <span>功能分区</span>
        </div>
        <el-button
          type="primary"
          icon="el-icon-edit"
          v-for="(item, key) in items"
          @click="toPage(item)"
          :key="key"
        >
          {{ item.value }}
        </el-button>
      </el-card>
    </el-container>
    <el-container>
      <el-card class="box-card" style="width: 70%">
        <div v-for="o in 10" :key="o" class="text item">
          {{ "列表内容 " + o }}
        </div>
      </el-card>
      <el-card class="box-card" style="width: 30%">
        <div v-for="o in 4" :key="o" class="text item">
          {{ "列表内容 " + o }}
        </div>
      </el-card>
    </el-container>
  </div>
</template>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
</style>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Goods from "./Goods";

export default {
  data() {
    return {
      items: [
          { value: "问题讨论", url: "/discussion" },
          { value: "二手交易", url: "/transaction/goods" },
          { value: "资料共享", url: "" },
          { value: "活动", url: "/activity" },
          { value: "通知",url: "/notice" },
          { value: "技术分享", url: "" }
      ],
    };
  },
  methods: {
      toPage(btn){
          this.$router.push({path: btn.url})
      }
  },
  name: "Home",
  components: {
      Goods,
    HelloWorld,
  },
};
</script>
