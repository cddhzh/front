<template>
    <div align="center">
        <el-card class="box-card">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="account">
                    <el-input v-model="ruleForm.account" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="ruleForm.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" prop="name">
                    <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学校" prop="school">
                    <el-select v-model="ruleForm.school" placeholder="请选择" style="min-width: 340px" @change="getAcademys('ruleForm')">
                        <el-option
                            v-for="item in schools"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学院" prop="academy">
                    <el-select v-model="ruleForm.academy" placeholder="请选择" style="min-width: 340px" >
                        <el-option
                            v-for="item in academys"
                            :key="item.id"
                            :label="item.academy"
                            :value="item.academy">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学号" prop="stuID">
                    <el-input v-model="ruleForm.stuID" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="专业" prop="major">
                    <el-input v-model="ruleForm.major" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        var validatePhone = (rule, value, callback) => {
            this.flag1 = false
            for(let i=0; i < this.phones.length; i++){
                if(value == this.phones[i]){
                    this.flag1 = true
                }
            }
            if(this.flag1){
                callback(new Error('该手机号已被注册！'))
            }else{
                callback();
            }
        };
        var validateAccount = (rule, value, callback) => {
            this.flag2 = false
            for(let i=0; i < this.accounts.length; i++){
                if(value == this.accounts[i]){
                    this.flag2 = true
                }
            }
            if(this.flag2){
                callback(new Error('该用户名已被注册！'))
            }else{
                callback();
            }
        };
        var validateStuID = (rule, value, callback) => {
            this.flag3 = false
            for(let i=0; i < this.stuIDs.length; i++){
                if(value == this.stuIDs[i]){
                    this.flag3 = true
                }
            }
            if(this.flag3){
                callback(new Error('该学号已被注册！'))
            }else{
                callback();
            }
        };
        return {
            ruleForm: {
                name: '',
                phone: '',
                password: '',
                school: '',
                stuID: '',
                major: '',
                account: '',
                academy: '',
                checkPass:'',
            },

            schools: [],
            academys: [],
            accounts: [],
            stuIDs: [],
            rules: {
                phone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { min: 11, max: 11, message: '长度应为11', trigger: 'blur' },
                    { validator: validatePhone}
                ],
                account: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { validator: validateAccount}
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { validator: validatePass}
                ],
                name: [
                    { required: true, message: '请输入真实姓名', trigger: 'blur' }
                ],
                checkPass: [
                    { required: true, message: '请再次确认密码', trigger: 'blur' },
                    { validator: validatePass2}
                ],
                school: [
                    { required: true, message: '请输入学校名称', trigger: 'blur' }
                ],
                major: [
                    { required: true, message: '请输入专业名称', trigger: 'blur' }
                ],
                stuID: [
                    { required: true, message: '请输入学号', trigger: 'blur' },
                    { validator: validateStuID}
                ],
                academy: [
                    { required: true, message: '请输入学校名称', trigger: 'blur' }
                ],
            }
        };
    },
    created() {
        const _this = this
        axios.get('http://localhost:8181/school/findAll').then( function (resp){
            _this.schools = resp.data;
        })
        axios.get('http://localhost:8181/user/findAllPhone').then(function (resp){
            _this.phones = resp.data
        })
        axios.get('http://localhost:8181/user/findAllAccount').then(function (resp){
            _this.accounts = resp.data
        })
        axios.get('http://localhost:8181/user/findAllStuID').then(function (resp){
            _this.stuIDs = resp.data
        })
    },
    methods: {
        submitForm(formName) {
            const _this = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios.post('http://localhost:8181/user/save/', _this.ruleForm).then(function (resp){
                        _this.$router.push({path: "/login"})
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        getAcademys(formName) {
            const _this = this
            axios.get('http://localhost:8181/academy/findBySchool/'+this.ruleForm.school).then(function (resp){
                _this.academys = resp.data
            })
        }
    }
}
</script>

<style scoped>
    .box-card {
        width: 480px;
    }
</style>