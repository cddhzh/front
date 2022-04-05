<template>
    <div>
        <h1>活动</h1>
        <div class="manip-header" style="margin-left: 10px">
            <el-form
                :inline="true"
                :model="formInline"
                class="demo-form-inline"
                size="small"
            >
                <el-form-item
                    label="范围"
                    prop="cid"
                >
                    <el-select
                        v-model="formInline.range"
                        filterable
                        placeholder="请选择活动范围"
                        clearable
                        size="medium"
                    >
                        <el-option
                            v-for="item in rangeOptions"
                            :key="item.name"
                            :label="item.name"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="tid">
                    <el-select
                        v-model="formInline.state"
                        filterable
                        placeholder="请选择活动状态"
                        clearable
                        size="medium"
                    >
                        <el-option
                            v-for="item in timeOptions"
                            :key="item.name"
                            :label="item.name"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button size="medium" type="primary" @click="Search" icon="el-icon-search">查询</el-button>
                </el-form-item>
            </el-form>
            <el-row>
                <el-col>
                    <el-button @click="showDialog" type="primary" round>添加</el-button>
                    &nbsp;&nbsp;
                    <el-button @click="myact" type="primary" round>我的活动</el-button>
                </el-col>
            </el-row>
        </div>
        <br>
        <el-table
            :data="tableData"
            border
            style="width: 98%"
            :row-style=rowstyle>
            <el-table-column
                fixed
                prop="id"
                label="编号"
                width="100%">
            </el-table-column>
            <el-table-column
                prop="title"
                label="标题"
                width="200%">
            </el-table-column>
            <el-table-column
                prop="location"
                label="活动地点"
                width="200%">
            </el-table-column>
            <el-table-column
                prop="postname"
                label="发布人"
                width="100%">
            </el-table-column>
            <el-table-column
                prop="amount"
                label="活动人数"
                width="100%">
            </el-table-column>
            <el-table-column
                prop="max_amount"
                label="最大人数"
                width="100%">
            </el-table-column>
            <el-table-column
                type="datetime"
                prop="join_start"
                label="报名开始时间"
                :formatter="formatDate"
                width="200%">
            </el-table-column>
            <el-table-column
                prop="join_end"
                label="报名结束时间"
                :formatter="formatDate"
                width="200%">
            </el-table-column>
            <el-table-column
                prop="state"
                label="状态"
                width="150%">
            </el-table-column>
            <el-table-column
                prop="look"
                label="状态"
                width="100%"
            >
                <template slot-scope="scope">
                    <el-button @click="look(scope.row)" type="text" size="small">加入</el-button>
                </template>
            </el-table-column>

        </el-table>
        <br>
        <el-pagination
            background
            layout="prev, pager, next"
            :page-size=this.pagesize
            :total="total"
            :page-count="total"
            @current-change="page">
        </el-pagination>

        <!-- 增改表单1 -->
        <el-dialog title="新增活动" :visible.sync="dialogFormVisible">
            <el-form
                :model="form"
                ref="form"
                label-suffix=" : "
            >
                <el-form-item label="活动标题" prop="title">
                    <el-input type="text"
                              v-model="form.title"
                              placeholder="活动标题"
                              style="width:40%"
                    ></el-input>
                </el-form-item>
                <el-form-item label="活动内容" prop="content">
                    <el-input type="textarea"
                              v-model="form.content"
                              placeholder="活动内容"
                              style="width:100%"
                              resize="none"
                              :rows="2"
                    ></el-input>
                </el-form-item>
                <el-form-item label="最大人数" prop="content">
                    <el-input type="number"
                              oninput="value=value.replace(/[^0-9]/g,'')"
                              v-model="form.amount"
                              placeholder="最大人数"
                              style="width:40%"
                    ></el-input>
                </el-form-item>
                <el-form-item label="活动地点" prop="content">
                    <el-input type="text"
                              v-model="form.location"
                              placeholder="活动地点"
                              style="width:40%"
                    ></el-input>
                </el-form-item>
                <el-form-item label="活动范围" prop="range">
                    <el-select v-model="form.range"
                               filterable
                               placeholder="请选择活动范围"
                               clearable
                    >
                        <el-option v-for="item in rangeOptions"
                                   :label="item.name"
                                   :value="item.value">
                        </el-option>
                    </el-select>

                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="Reset">重 置</el-button>
                <el-button type="primary" @click="showDialog1">下一步</el-button>
            </div>
        </el-dialog>

        <!-- 增改表单2 -->
        <el-dialog title="新增活动" :visible.sync="dialogFormVisible1">

            <el-form
                :model="form1"
                ref="form"
                label-suffix=" : "
            >
                <el-form-item label="活动类型" prop="type">
                    <el-select v-model="form1.acttype"
                               filterable
                               placeholder="请选择活动类型"
                               clearable
                    >
                        <el-option v-for="item in actOptions"
                                   :label="item.type"
                                   :value="item.type">
                        </el-option>
                    </el-select>

                </el-form-item>
                <el-form-item label="报名开始时间" prop="datetime">
                    <el-date-picker type="datetime"
                                    ref="datetime"
                                    v-model="form1.join_start"
                                    placeholder="活动时间"
                                    style="width:40%"
                                    :picker-options="joinOptionsStart">
                        ></el-date-picker>
                </el-form-item>
                <el-form-item label="报名结束时间" prop="datetime">
                    <el-date-picker type="datetime"
                                    ref="datetime"
                                    v-model="form1.join_end"
                                    placeholder="活动时间"
                                    style="width:40%"
                                    :picker-options="joinOptionsEnd"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="活动开始时间" prop="time">
                    <el-date-picker type="datetime"
                                    v-model="form1.act_start"
                                    placeholder="活动开始时间"
                                    style="width:40%"
                                    :picker-options="actOptionsStart"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="活动结束时间" prop="time">
                    <el-date-picker type="datetime"
                                    v-model="form1.act_end"
                                    placeholder="活动结束时间"
                                    style="width:40%"
                                    :picker-options="actOptionsEnd"
                    ></el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="Reset1">重 置</el-button>
                <el-button @click="back">上一步</el-button>
                <el-button type="primary" @click="Submit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "activity",
    created(){
        const _this = this
        axios.get('http://localhost:8181/activity/findAll/1/'+this.pagesize).then(function (resp) {
            console.log(resp)
            _this.tableData = resp.data.content
            _this.total = resp.data.totalElements
        })
        axios.get('http://localhost:8181/acttype/findAll').then(function (response) {
            // console.log(response.data)
            _this.actOptions = response.data
            // _this.total = response.data.totalElements
        })
    },
    methods:{
        Search(){
            const _this = this
            console.log(_this.formInline.range+_this.formInline.state)
            if(_this.formInline.range==undefined)alert("请选择范围");
            if(_this.formInline.state==undefined)alert("请选择状态");
            axios.get('http://localhost:8181/activity/findAll/1/'+this.pagesize+'/'+_this.formInline.range+'/'
                +_this.formInline.state).then(function (resp) {
                // console.log(resp)
                _this.tableData = resp.data.content
                _this.total = resp.data.totalElements
            })
        },
        page(currentPage){
            const _this = this
            axios.get('http://localhost:8181/activity/findAll/'+currentPage+'/'+this.pagesize).then(function (resp) {
                // console.log(resp)
                _this.tableData = resp.data.content
                _this.total = resp.data.totalElements
            })
        },
        look(row){
            if(row.state=="报名中"){
                const _this = this;
                const _uid = JSON.parse(window.localStorage.getItem('access-admin')).uid;
                axios.get('http://localhost:8181/actuser/findByUidAndActId/'+_uid+'/'+row.id).then(function (resp) {
                    console.log(resp)
                    if(resp.data=='不存在'){
                        _this.$router.push({
                            path:'/joinAct',
                            query:{
                                id:row.id,
                            }
                        })
                    }
                    else{
                        _this.$router.push({
                            path:'/quitAct',
                            query:{
                                id:row.id,
                            }
                        })
                    }
                })
            }
            else if(row.state=="已结束") alert("报名已结束")
            else if(row.state=="规划中") alert("报名未开始")

        },
        showDialog(){
            this.dialogFormVisible=true;
            this.form={};
            this.form1={};
        },
        myact(){
            this.$router.replace({
                path:'/myact',
                query:{
                    id:JSON.parse(window.localStorage.getItem('access-admin')).uid,
                }
            })
        },
        back(){
            this.dialogFormVisible1=false;
            this.dialogFormVisible=true;
        },
        showDialog1(){
            this.dialogFormVisible1=true;
            this.dialogFormVisible=false;
        },
        Reset(){
            this.form = {};
        },
        Reset1(){
            this.form1 = {};
        },
        Submit(){
            const _this = this
            const _uname = JSON.parse(window.localStorage.getItem('access-admin')).name;
            if(_this.form.title==null||_this.form.content==null||_this.form.location==null||_this.form.amount==null
                ||_this.form.title==null||_this.form1.acttype==null||_this.form1.join_start==null||_this.form1.join_end==null
                ||_this.form1.act_start==null||_this.form1.act_end==null){
                alert("请完善活动")
            }
            else{
                axios.get('http://localhost:8181/activity/addAct/'+_this.form.title+'/'+_this.form.content+'/'+_uname+
                    '/'+_this.form.location+'/'+_this.form.range+'/'+_this.form.amount+'/'+_this.form1.acttype+'/'+
                    _this.form1.join_start+'/'+_this.form1.join_end+'/'+_this.form1.act_start+'/'+
                    _this.form1.act_end).then(function (resp) {
                    console.log(resp)
                    if(resp.data == 'success'){
                        _this.$message("创建成功")
                        _this.$alert('活动'+_this.form.title+'创建成功！',"消息",{
                            confirmButtonText:'确定',
                        })
                        _this.dialogFormVisible = false
                        window.location.reload()
                    }else{
                        alert('失败')
                    }
                })
            }
            // axios.get('http://localhost:8181/activity/addAct/'+_this.form.title+'/'+_this.form.content+'/'+_uname+
            // '/'+_this.form.location+'/'+_this.form.time+'/'+_this.form.amount).then(function (resp) {
            //     console.log(resp)
            //     if(resp.data == 'success'){
            //         _this.$message("创建成功")
            //         _this.$alert('活动'+_this.form.title+'创建成功！',"消息",{
            //             confirmButtonText:'确定',
            //         })
            //         _this.dialogFormVisible = false
            //         window.location.reload()
            //     }else{
            //         alert('失败')
            //     }
            // })
            alert(_this.form.title+_this.form.content+_uname+_this.form.location+_this.form.range)
            alert(_this.form1.acttype+_this.form1.join_start+_this.form1.join_end+_this.form1.act_start+_this.form1.act_end)
        },
        jos(){
            let _this = this
            return {
                disabledDate(time) {
                    // return time.getTime() > Date.now() - 8.64e7; //选择时不包含当前日期
                    if (_this.form1.join_end != "") {
                        return time.getTime() < Date.now() || time.getTime() > _this.form1.join_end;
                    } else {
                        return time.getTime() < Date.now()
                    }
                }
            }
        },
        joe(){
            let _this = this
            return {
                disabledDate(time) {
                    // return time.getTime() > Date.now() - 8.64e7; //选择时不包含当前日期
                    if (_this.form1.join_start != "" && _this.form1.act_start != "") {
                        // alert("left")
                        return time.getTime() < Date.now() || time.getTime() < _this.form1.join_start || time.getTime() > _this.form1.act_start;
                    } else  if (_this.form1.act_start == "" && _this.form1.act_start != "") {
                        // alert("mid")
                        return time.getTime() < Date.now() || time.getTime() < _this.form1.join_start;
                    }else  if (_this.form1.act_start != "" && _this.form1.act_start == "") {
                        // alert("mid")
                        return time.getTime() < Date.now() || time.getTime() > _this.form1.act_start;
                    } else{
                        // alert("right")
                        return time.getTime() < Date.now()
                    }
                }
            }
        },
        aos(){
            let _this = this
            return {
                disabledDate(time) {
                    // return time.getTime() > Date.now() - 8.64e7; //选择时不包含当前日期
                    if (_this.form1.join_end != "" && _this.form1.act_end == "") {
                        return time.getTime() < Date.now() || time.getTime() < _this.form1.join_end;
                    } else if (_this.form1.join_end != "" && _this.form1.act_end != "") {
                        return time.getTime() < Date.now() || time.getTime() > _this.form1.act_end || time.getTime() < _this.form1.join_end;
                    } else if (_this.form1.join_end == "" && _this.form1.act_end != "") {
                        return time.getTime() < Date.now() || time.getTime() > _this.form1.act_end ;
                    }else {
                        return time.getTime() < Date.now()
                    }
                }
            }
        },
        aoe(){
            let _this = this
            return {
                disabledDate(time) {
                    // return time.getTime() > Date.now() - 8.64e7; //选择时不包含当前日期
                    if (_this.form1.act_start != "") {
                        return time.getTime() <= Date.now() || time.getTime() < _this.form1.act_start;
                    } else {
                        return time.getTime() <= Date.now()
                    }
                }
            }
        },
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
        return {
            total: null,
            tableData: [],
            total_page: null,
            dialogFormVisible: false,
            formInline: {},
            form: {},
            dialogFormVisible1: false,
            formInline1: {},
            form1: {},
            pagesize: 4,
            rangeOptions:[
                {
                    name:"全市",
                    value:"*"
                },
                {
                    name:"全校",
                    value:JSON.parse(window.localStorage.getItem('access-admin')).school,
                }
            ],
            timeOptions:[
                {
                    name:"已结束",
                    value:"已结束"
                },
                {
                    name:"报名中",
                    value:"报名中",
                },
                {
                    name:"规划中",
                    value:"规划中",
                }
            ],
            actOptions:[],
            joinOptionsStart: this.jos(),
            joinOptionsEnd: this.joe(),
            actOptionsStart: this.aos(),
            actOptionsEnd: this.aoe(),
            rowstyle: {
                height: '100px'
            }
        };
    }
}
</script>

<style scoped>

</style>