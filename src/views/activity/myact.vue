<template>
    <div>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                fixed
                prop="id"
                label="编号"
                width="50">
            </el-table-column>
            <el-table-column
                prop="title"
                label="标题"
                width="150">
            </el-table-column>
            <el-table-column
                prop="location"
                label="活动地点"
                width="200">
            </el-table-column>
            <el-table-column
                prop="postname"
                label="发布人"
                width="150">
            </el-table-column>
            <el-table-column
                prop="amount"
                label="活动人数"
                width="50">
            </el-table-column>
            <el-table-column
                prop="max_amount"
                label="最大人数"
                width="50">
            </el-table-column>
            <el-table-column
                type="datetime"
                prop="join_start"
                label="报名开始时间"
                :formatter="formatDate"
                width="150">
            </el-table-column>
            <el-table-column
                prop="join_end"
                label="报名结束时间"
                :formatter="formatDate"
                width="150">
            </el-table-column>
            <el-table-column
                prop="state"
                label="状态"
                width="100">
            </el-table-column>
<!--            <el-table-column-->
<!--                prop="look"-->
<!--                label="状态"-->
<!--                width="150"-->
<!--            >-->
<!--                <template slot-scope="scope">-->
<!--                    <el-button @click="look(scope.row)" type="text" size="small">加入</el-button>-->
<!--                </template>-->
<!--            </el-table-column>-->
        </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            :page-size=3
            :total="total"
            :page-count="total"
            @current-change="page">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: "myact",
    created(){
        const _this=this
        axios.get('http://localhost:8181/activity/findByUser/'+_this.uid+'/1/3/').then(function (resp) {
            // console.log(resp)
            _this.tableData = resp.data.content
            _this.total = resp.data.totalElements
        })
    },
    page(currentPage){
        const _this = this
        axios.get('http://localhost:8181/activity/findByUser/'+uid+'/'+currentPage+'/3/').then(function (resp) {
            // console.log(resp)
            _this.tableData = resp.data.content
            _this.total = resp.data.totalElements
        })
    },
    methods:{
        //方法区
        formatDate(row, column) {
            // 获取单元格数据
            let data = row[column.property]
            if(data == null) {
                return null
            }
            let dt = new Date(data)
            return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
        },
    },
    data(){
        return{
            total: null,
            tableData: [],
            total_page: null,
            uid:this.$route.query.id
        }
    }
}
</script>

<style scoped>

</style>