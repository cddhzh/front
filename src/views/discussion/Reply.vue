<template>
    <el-container>
        <el-main style="width: 70%">
            <el-card class="box-card" style="width: 99%">
                <div slot="header" class="clearfix">
                    <span style="float: left; font-size: 30px">问题</span>
                    <br><br>
                </div>
                <div>
                    <div>
                        <p align="left"><el-avatar size="small" :src="circleUrl"></el-avatar>{{this.discussion.authorID}}</p>
                    </div>
                    <div>
                        <h1 style="font-size: 30px" align="left">{{this.discussion.title}}</h1>
                    </div>
                    <div>
                        <p align="left" style="font-size: 20px">{{this.discussion.content}}</p>
                    </div>
                    <br>
                    <div>
                        <el-button style="float: left" type="primary" round icon="el-icon-edit" @click="changeVisible">写回答</el-button>
                        <br><br>
                    </div>
                </div>
            </el-card>

            <el-card v-show="this.visible">
                <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="form.content">
                </el-input>
                <br><br>
                <el-button round type="primary" style="float: right" @click="handleClick">发布</el-button>
                <br><br>
            </el-card>

            <el-card class="box-card" style="width: 99%">
                <div slot="header" class="clearfix">
                    <span style="float: left; font-size: 25px">所有回复</span>
                    <br><br>
                </div>
                <div v-for="(reply, key) in replys" :key="key" class="text item">
<!--                    {{'列表内容 ' + reply.content }}-->
                    <hr>
                    <div>
                        <p align="left"><el-avatar size="small" :src="circleUrl"></el-avatar>{{reply.authorID}}</p>
                    </div>
                    <div>
                        <p align="left" style="font-size: 18px">&nbsp;&nbsp;{{reply.content}}</p>
                    </div>
                </div>
            </el-card>
        </el-main>
        <el-aside style="width: 30%">
            <el-main>
                <el-card >

                </el-card>
            </el-main>
        </el-aside>
    </el-container>

</template>

<script>
import AddReply from "./AddReply";
export default {
    name: "Reply",
    components: {AddReply},
    data(){
        return{
            visible: false,
            replys:[],
            discussion: null,
            form: {
                id: null,
                discussionid: null,
                content: null,
                authorID: null,
            },
        }
    },
    created() {
        const _this = this
        axios.get("http://localhost:8181/discussion/findByID/"+this.$route.query.discussionid).then(function (resp){
            _this.discussion = resp.data
        })
        axios.get('http://localhost:8181/reply/findByDiscussionid/'+this.$route.query.discussionid).then(function (resp){
            _this.replys = resp.data
        })
    },
    methods: {
        changeVisible(){
            this.visible = !this.visible
        },
        handleClick(){
            const _this = this
            this.form.discussionid = this.$route.query.discussionid
            this.form.authorID = JSON.parse(window.localStorage.getItem('access-admin')).name
            axios.post("http://localhost:8181/reply/save", this.form).then(function (resp){
                if(resp.data != null){
                    alert("发布成功！")
                    window.location.reload()
                }
            })
        }
    }
}
</script>

<style scoped>
/deep/.el-textarea__inner{
    line-height: 2;
    font-size: 20px;
    font-family: "Hiragino Sans GB";
}
</style>