<template>
    <el-container>
        <el-main>
            <el-card>
                <el-header>
                    <h1 style="font-size: 30px" align="left">发布问题</h1>
                </el-header>
                <el-main>
                    <el-input placeholder="请输入问题标题" v-model="form.title">
                    </el-input>
                    <hr>
                    <el-input
                        type="textarea"
                        :rows="6"
                        placeholder="请输入问题内容"
                        v-model="form.content">
                    </el-input>
                    <hr>
                </el-main>
                <el-footer>
                    <el-row :gutter="20">
                        <el-col :span="16">
                            <el-select v-model="form.subjectID" placeholder="选择分区" style="float: left">
                                <el-option
                                    v-for="item in options"
                                    :key="item.id"
                                    :label="item.subject"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="8">
                            <el-button type="primary" style="width: 150px" @click="handleClick">
                                发布
                            </el-button>
                            <el-button style="float: right; width: 150px" @click="cancel">
                                取消
                            </el-button>
                        </el-col>
                    </el-row>
                </el-footer>
            </el-card>
        </el-main>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            form: {
                id:'',
                title: '',
                content: '',
                subjectID: '',
                authorID: '',
                time:''
            },
            options: []
        }
    },
    methods: {
        handleClick(){
            this.form.time = new Date();
            this.form.authorID = JSON.parse(window.localStorage.getItem('access-admin')).name
            const _this = this;
            axios.post("http://localhost:8181/discussion/save", this.form).then(function (resp){
                if (resp.data!=null){
                    alert("发布成功！")
                    _this.$router.push({path: "/discussion"})
                }
                else {
                    alert("发布失败！")
                }
            })
        },
        cancel(){
            this.$router.push({path: '/discussion'})
        }
    },
    created() {
        const _this = this
        axios.get("http://localhost:8181/subject/findAll").then(function (resp){
            _this.options = resp.data
        })
    }
}
</script>

<style scoped>
/deep/.el-input__inner{
    height: 60px;
    font-size: 25px;
}
/deep/.el-textarea__inner{
    line-height: 3;
    font-size: 20px;
}
/deep/.el-button{
    line-height: 2;
    font-size: 18px;
}
</style>