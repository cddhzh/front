<template>
    <el-container>
        <el-header>
            <div>
                <el-button @click="toSell" type="primary">发布商品</el-button>
            </div>
        </el-header>
        <el-container style="display: flex; align-items: center; justify-content: center">
            <el-card  style="width: 100%;">
                <router-view></router-view>
            </el-card>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    methods: {
        toSell(){
            this.$router.push('/commerce/addGood')
        },
    },
};
</script>

<style scoped>

</style>