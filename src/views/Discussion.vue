<template>
  <div align="center">
    <el-header>
      <el-image>
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
    </el-header>
    <div>
      <el-button type="primary" @click="post">发布</el-button>
      <el-button @click="back">返回</el-button>
    </div>
    <el-card class="box-card" style="width: 100%">
      <el-tabs v-model="activeName" @tab-click="handleClick" router>
        <el-tab-pane label="最新" name="new" index="/topic">
          <router-view></router-view>
        </el-tab-pane>
        <el-tab-pane label="最热" name="hot">最热</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "new",
    };
  },
  methods: {
      handleClick(tab, event) {},
      post() {
          this.$router.push('/discussion/addDiscussion')
      },
      back(){
          this.$router.push('/zone')
      }
  },
};
</script>

<style scoped>
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
