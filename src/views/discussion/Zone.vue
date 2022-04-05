<template>
    <el-container>
        <el-main>
            <el-card v-for="index in pagesize" shadow="false" v-show="titles[index-1]!=null">
                <el-container>
                    <el-aside style="width: 10%" >
                        <div style="height: 100%" >
                            <el-avatar size="large" :src="circleUrl" style="margin-top: 30%"></el-avatar>
                            <br>
                            <span>{{authorIDs[index-1] | ellipsis}}</span>
                        </div>
                    </el-aside>
                    <el-main style="width: 90%">
                        <div style="font-size: 30px;" align="left">
                            <span><router-link :to="'/reply?discussionid='+ids[index-1]">{{titles[index-1]}}</router-link></span>
                        </div>
                        <div align="left">{{contents[index-1]}}</div>
                    </el-main>
                </el-container>
            </el-card>
<!--            <el-table :data="tableData" :stripe="true" style="width: 100%" @row-click="handleClick" :cell-style="cellStyle">-->
<!--                <el-table-column ><el-avatar size="small" :src="circleUrl"></el-avatar></el-table-column>-->
<!--                <el-table-column prop="authorID" label="提问者" width="180">-->
<!--                </el-table-column>-->
<!--                <el-table-column prop="title" label="标题"> </el-table-column>-->
<!--                <el-table-column prop="time" label="时间" width="180">-->
<!--                </el-table-column>-->
<!--            </el-table>-->
        </el-main>
        <el-footer>
            <el-pagination
                background
                layout="prev, pager, next"
                :page-size="pagesize"
                @current-change="page"
                :total="total">
            </el-pagination>
        </el-footer>
    </el-container>
</template>

<script>
export default {
    props: {
        id: String
    },
    data() {
        return{
            total: null,
            pagesize: 3,
            tableData: [],
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            cellStyle: {
                'height': '100px'
            },
            ids: [],
            titles: [],
            contents: [],
            times: [],
            authorIDs: [],
        }
    },
    methods: {
        page(currentPage){
            const _this = this
            let id = this.id
            axios.get("http://localhost:8181/discussion/findBySubjectID/"+id+"/"+currentPage+"/"+this.pagesize).then(function (resp){
                _this.tableData = resp.data.content
                _this.ids = []
                _this.titles = []
                _this.contents = []
                _this.times = []
                _this.authorIDs = []
                for (let i = 0; i < resp.data.content.length; i++) {
                    _this.ids.push(resp.data.content[i].id)
                    _this.titles.push(resp.data.content[i].title)
                    _this.contents.push(resp.data.content[i].content)
                    _this.times.push(resp.data.content[i].time)
                    _this.authorIDs.push(resp.data.content[i].authorID)
                }
                _this.total = resp.data.totalElements
            })
        },
        handleClick(row, event){
            this.$router.push({
                path: '/reply',
                query: {
                    discussionid: row.id
                }
            })
        }
    },
    created() {
        const _this = this
        let id = this.id
        axios.get("http://localhost:8181/discussion/findBySubjectID/"+id+"/1/"+this.pagesize).then( function(resp){
            _this.tableData = resp.data.content
            _this.total = resp.data.totalElements
            for (let i = 0; i < resp.data.content.length; i++) {
                _this.ids.push(resp.data.content[i].id)
                _this.titles.push(resp.data.content[i].title)
                _this.contents.push(resp.data.content[i].content)
                _this.times.push(resp.data.content[i].time)
                _this.authorIDs.push(resp.data.content[i].authorID)
            }
        })
    },
    filters:{
        ellipsis(value){
            if (!value) return '';
            if (value.length > 5) {
                return value.slice(0,5) + '...'
            }
            return value
        }
    }
};
</script>

<style scoped>

</style>