<template>
    <el-container>
        <el-aside style="width: 10%"></el-aside>
        <el-main style="width: 80%">
            <el-card style="width: 99%">
                <el-container>
                    <el-main style="width: 60%">
                        <div class="block">
                            <el-carousel trigger="click" height="300px">
                                <el-carousel-item v-for="item in 4" :key="item">
                                    <h3 class="small">{{ item }}</h3>
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </el-main>
                    <el-aside style="width: 40%;">
                        <el-main style="height: 99%">
                            <el-card style="height: 99%" shadow="never">
                                <div slot="header" class="clearfix">
                                    <span style="float: left; font-size: 30px">xx商品</span>
                                    <br><br>
                                </div>
                                <div>
                                    <span style="float: left; font-size: 25px">Price: $99</span>
                                </div>
                                <br><br><br>
                                <div>
                                    <span style="float: left; font-size: 16px">发布者：xxx</span>
                                </div>
                                <br><br>
                                <div>
                                    <span style="float: left; font-size: 16px">发布时间：xxx</span>
                                </div>
                                <br><br><br>
                                <div>
                                    <el-button style="float: left" type="primary" icon="el-icon-thumb"></el-button>
                                    &nbsp;&nbsp;
                                    <el-button style="float: left" type="primary" icon="el-icon-star-off" ></el-button>
                                </div>
                            </el-card>
                        </el-main>
                    </el-aside>
                </el-container>
            </el-card>
            <el-card style="width: 99%">
                <el-main>
                    <el-collapse v-model="activeNames" @change="handleChange">
                        <el-collapse-item title="商品详情" name="1">
                            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                        </el-collapse-item>
                        <el-collapse-item title="商品链接" name="2">
                        </el-collapse-item>
                    </el-collapse>
                    <el-card class="box-card" style="width: 99%" shadow="never">
                        <div slot="header" class="clearfix">
                            <span style="float: left; font-size: 25px">所有回复</span>
                            <br><br>
                        </div>
                        <div v-for="(reply, key) in replys" :key="key" class="text item">
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
                <el-aside>

                </el-aside>
            </el-card>
        </el-main>
        <el-aside style="width: 10%"></el-aside>
    </el-container>
</template>

<script>
export default {
    name: "Good",
    data() {
        return {
            activeNames: ['1','2']
        };
    },
    methods: {
        handleChange(val) {
            console.log(val);
        }
    }
}
</script>

<style scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
</style>