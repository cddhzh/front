<template>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品名称" prop="goodname">
            <el-input v-model="form.goodname" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="description">
            <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="form.description">
            </el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
            <el-input v-model="form.price" placeholder="请输入价格" ></el-input>
        </el-form-item>
        <el-form-item label="商品链接（可选）" prop="url">
            <el-input v-model="form.url" placeholder="请输入商品链接"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">立即发布</el-button>
            <el-button @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    data(){
        return{
            form: {
                id: '',
                goodname: '',
                description: '',
                price: '',
                ownerid: '',
                url: '',
                time: ''
            }
        }
    },
    methods: {
        onSubmit(formName){
            const _this = this
            var ses = window.sessionStorage
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    _this.form.ownerid = ses.getItem('user');
                    _this.form.time = new Date();
                    axios.post('http://localhost:8181/good/save/', _this.form).then(function (resp){
                        console.log(resp)
                    })
                    alert('发布成功！');
                    _this.$router.push({path: '/commerce/goods'})
                    window.location.reload()
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