<template>
    <el-container>
        <el-main>
            <el-card>
                <el-input placeholder="请输入帖子标题" v-model="text">
                </el-input>
                <hr>
                <el-input
                    type="textarea"
                    :rows="8"
                    placeholder="请输入帖子内容"
                    v-model="textarea">
                </el-input>
            </el-card>
        </el-main>
        <el-aside>
            <el-main>
                <el-card>
                    <div style="float: left">选择分区：</div>
                    <br><br>
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-card>
            </el-main>
        </el-aside>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            text: '',
            textarea: '',
            value: '',
            form: {
                id:'',
                title: '',
                content: '',
                subjectID: '',
                authorID: '',
                time:''
            }
        }
    },
    methods: {
        onSubmit(formName){
            const _this = this
            var ses = window.sessionStorage
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    _this.form.authorID = ses.getItem('user')
                    _this.form.subjectID = ses.getItem('subjectid')
                    _this.time = new Date()
                    axios.post('http://localhost:8181/discussion/save/', _this.form).then(function (resp){
                        if(resp.data != null){
                            _this.$alert({
                                confirmButtonText: 'OK',
                                callback: action => {
                                    _this.$router.push({path: '/discussion/topic?subjectid='+ses.getItem('subjectid')})
                                }
                            })
                        }
                    })
                    // alert('发布成功！');
                    // _this.$router.push({path: '/discussion/topic?subjectid='+ses.getItem('subjectid')})
                    // window.location.reload()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        cancel(){

        }
    }
}
</script>

<style scoped>
/deep/.el-input__inner{
    height: 60px;
    font-size: 25px;
}
/deep/.el-textarea__inner{
    line-height: 4;
    font-size: 18px;
}
</style>