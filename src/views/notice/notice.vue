<template>
    <div>
        <h1>通知</h1>
        <div class="manip-header" style="margin-left: 10px">
            <el-form
                :inline="true"
                :model="formInline"
                class="demo-form-inline"
                size="small"
            >
                <el-form-item
                    label="学校"
                    prop="cid"
                >
                    <el-select
                        v-model="formInline.name"
                        filterable
                        placeholder="请选择学校"
                        clearable
                        size="medium"
                    >
                        <el-option
                            v-for="item in schoolOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="Search" icon="el-icon-search" size="medium"
                    >查询</el-button
                    >
                </el-form-item>
            </el-form>
        </div>
        <el-table
            :data="tableData"
            border
            style="width: 85%; margin: auto;"
            :row-style="rowstyle">
            <el-table-column
                fixed
                prop="id"
                label="编号"
                width="150">
            </el-table-column>
            <el-table-column
                prop="name"
                label="标题"
                width="650">
            </el-table-column>
            <el-table-column
                prop="school"
                label="学校"
                width="150">
            </el-table-column>
            <el-table-column
                prop="time"
                label="时间"
                width="150">
            </el-table-column>
            <el-table-column
                prop="url"
                label="跳转"
                width="150"
            >
                <template slot-scope="scope">
                    <el-button @click="jump(scope.row)" type="text" size="small">详情</el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            :page-size=pagesize
            :total="total"
            :page-count="total"
            @current-change="page">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: "notice",
    created(){
        const _this = this
        axios.get('http://localhost:8181/notice/findAll/1/'+this.pagesize).then(function (resp) {
            console.log(resp)
            _this.tableData = resp.data.content
            _this.total = resp.data.totalElements
        })
        axios.get('http://localhost:8181/school/findAll').then(function (response) {
            // console.log(response.data)
            _this.schoolOptions = response.data
            // _this.total = response.data.totalElements
        })
    },

    methods:{
        page(currentPage){
            const _this = this
            axios.get('http://localhost:8181/notice/findById/'+currentPage+'/'+_thid.pagesize,{params:_this.formInline}).then(function (resp) {
                // console.log(resp)
                _this.tableData = resp.data.content
                _this.total = resp.data.totalElements
            })
        },
        jump(row){
            //alert(row.url)
            window.open(row.url,'_blank')
        },
        Search(){
            const _this=this
            console.log(_this.formInline)
            axios.get('http://localhost:8181/notice/findById/1/'+this.pagesize,{params:_this.formInline}).then(function (response) {
                console.log(_this.formInline)
                console.log(response.data)
                _this.tableData = response.data.content
                _this.total=response.data.totalElements
                // _this.total = response.data.totalElements
            })
        },
    },
    data() {
        return {
            total: null,
            tableData: null,
            total_page: null,
            formInline: {},
            form: {},
            schoolOptions:[],
            pagesize: 4,
            rowstyle: {
                height: '100px'
            }
        }
    },
}

</script>

<style scoped>

</style>