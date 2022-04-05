<template>
    <el-row>
        <el-col :span="8" v-for="(o, index) in this.names.length" :key="o" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }">
                <img :src=urls[index] class="image">
                <div style="padding: 14px;">
                    <span>{{ names[index] }}</span>
                    <div class="bottom clearfix">
                        <time class="time">{{ currentDate[index] }}</time>
                        <el-button type="text" class="button">操作按钮</el-button>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
export default {
    data(){
        return {
            names:[],
            currentDate: [],
            urls: [
                "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
                "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
                "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
                "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
                "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
                "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
                "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
            ]
        };
    },
    created() {
        const _this = this
        axios.get('http://localhost:8181/good/findAll').then( function (resp){
            for (let i = 0; i < resp.data.length; i++) {
                _this.names.push(resp.data[i].goodname)
            }
            for (let i = 0; i < resp.data.length; i++) {
                _this.currentDate.push(resp.data[i].time)
            }
        })
    }
}
</script>

<style scoped>

</style>