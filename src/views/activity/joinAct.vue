<template>
    <el-main>
        <div style="width: 60%; margin: auto">
            <el-form style="width:100%;" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="活动id" prop="id">
                    <el-input v-model="ruleForm.id" readonly=""></el-input>
                </el-form-item>
                <el-form-item label="活动类型" prop="type">
                    <el-input v-model="ruleForm.type" readonly=""></el-input>
                </el-form-item>
                <el-form-item label="发起人" prop="title">
                    <el-input v-model="ruleForm.postname" readonly=""></el-input>
                </el-form-item>
                <el-form-item label="活动名" prop="title">
                    <el-input v-model="ruleForm.title" readonly=""></el-input>
                </el-form-item>
                <el-form-item label="活动开始时间" prop="time">
                    <el-input v-model="ruleForm.act_start" readonly=""></el-input>
                </el-form-item>
                <el-form-item label="活动结束时间" prop="time">
                    <el-input v-model="ruleForm.act_end" readonly=""></el-input>
                </el-form-item>
                <el-form-item label="最大人数" prop="title">
                    <el-input v-model="ruleForm.max_amount" readonly=""></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <el-input v-model="ruleForm.content"
                              readonly=""
                              type="textarea"
                              resize="none"
                              :rows="8"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="joinact">加入</el-button>
                    <el-button @click="backa">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-aside width="20%"></el-aside>
    </el-main>
</template>

<script>
export default {
    name: "joinAct",
    data(){
        return{
            ruleForm:[],
        }
    },
    created(){
        const _this=this
        axios.get('http://localhost:8181/activity/findById/'+this.$route.query.id).then(function (resp) {
            console.log(resp.data)
            _this.ruleForm = resp.data
        })
    },
    methods:{
        backa(){
            this.$router.push("/activity")
        },
        joinact(){
            const _this=this
            const _uid = JSON.parse(window.localStorage.getItem('access-admin')).uid
            // console.log(_uid+this.$route.query.id)
            axios.get('http://localhost:8181/actuser/join/'+_uid+'/'+this.$route.query.id,{params:_this.ruleForm}).then(function (resp) {
                console.log(resp.data)
                if(resp.data == 'success'){
                    _this.$message("加入成功")
                    _this.$alert('活动'+_this.ruleForm.title+'加入成功！',"消息",{
                        confirmButtonText:'确定',
                        callback: action => {
                            _this.$router.push('/activity')
                        }
                    })
                }else{
                    alert('失败')
                }
            })
        }
    }
}
</script>

<style scoped>

</style>