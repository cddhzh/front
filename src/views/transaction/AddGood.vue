<template>
    <el-container align="center">
        <el-aside style="width: 10%"></el-aside>
        <el-main style="width: 80%">
            <el-card style="width: 99%" >
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="商品名称" prop="goodname">
                        <el-input v-model="form.goodname" placeholder="请输入商品名称"></el-input>
                    </el-form-item>
                    <el-form-item label="商品描述" prop="description">
                        <el-input
                            type="textarea"
                            :rows="10"
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
            </el-card>
        </el-main>
        <el-aside style="width: 10%"></el-aside>
    </el-container>
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
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    _this.form.ownerid = JSON.parse(window.localStorage.getItem('access-admin')).name
                    _this.form.time = new Date();
                    axios.post('http://localhost:8181/good/save/', _this.form).then(function (resp){
                        console.log(resp)
                    })
                    alert('发布成功！');
                    _this.$router.push({path: '/transaction/goods'})
                    window.location.reload()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        cancel(){
            this.$router.push({path: "/transaction/goods"})
        }
    }
}
</script>

<style scoped>

</style>