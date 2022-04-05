<template>
  <el-container>
    <el-container>
      <el-table :data="tableData" style="width: 100%">
          <el-table-column><el-avatar size="small" :src="circleUrl"></el-avatar></el-table-column>
        <el-table-column prop="authorID" label="作者" width="180">
        </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column prop="time" label="时间" width="180">
        </el-table-column>
      </el-table>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
      ],
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    };
  },
  created(){
      const _this = this
      let id = this.$route.query.subjectid
      console.log(id)
      axios.get('http://localhost:8181/discussion/findBySubjectID/'+id).then( function(resp){
          _this.tableData = resp.data
      })
  }
};
</script>

<style scoped></style>
