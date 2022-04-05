<template>
    <el-container>
        <el-card style="width: 100%; ">
            <div>
                <el-input style="width: 50%"></el-input>&nbsp;
                <el-button type="primary">搜索</el-button>
                <el-button type="primary" @click="handleClick">发布商品</el-button>
            </div>
            <br>
            <div>

            </div>
            <br>
            <div>
                <router-view></router-view>
            </div>
        </el-card>
    </el-container>
</template>

<script>
import Goods from "./Goods";
export default {
    name: "Transaction",
    components: {Goods},
    data(){
        return{

        }
    },
    methods:{
        handleClick(){
            this.$router.push({path: "/transaction/addGood"})
        }
    }
}
</script>

<style scoped>

</style>