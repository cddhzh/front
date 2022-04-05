<template>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题" prop="title">
            <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
            <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="form.content">
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">立即发布</el-button>
            <el-button @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
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

</style>