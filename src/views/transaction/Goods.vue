<template>
    <el-container>
        <div v-for="key1 in cardnum" :key="key1" style="width: 100%;" :gutter="20">
            <el-row :span="5" v-for="key2 in Math.ceil(good.names.length/cardnum)" :key="key2">
                <el-col >
                    <el-card v-show="good.names[key1-1+cardnum*(key2-1)]!=null" shadow="never" align="center">
                        <router-link to="/transaction/good">
                            <img style="border-radius: 20px" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                        </router-link>
                        <div style="padding: 14px;">
                            <router-link to="/transaction/good">
                                <span>{{good.names[key1-1+cardnum*(key2-1)]}}</span>
                            </router-link>
                            <div class="bottom clearfix">
                                <time class="time">{{ good.times[key1-1+cardnum*(key2-1)] }}</time>
                            </div>
                        </div>
                    </el-card>
                    <br>
                </el-col>
            </el-row>
        </div>
    </el-container>
</template>

<script>
export default {
    name: "Goods",
    data() {
        return {
            good: {
                id: [],
                names: [],
                prices: [],
                times: [],
                urls: []
            },
            cardnum: 4,
        }
    },
    created() {
        const _this = this
        axios.get('http://localhost:8181/good/findAll').then( function (resp){
            for (let i = 0; i < resp.data.length; i++) {
                _this.good.id.push(resp.data[i].id)
                _this.good.names.push(resp.data[i].goodname)
                _this.good.prices.push(resp.data[i].price)
                _this.good.times.push(resp.data[i].time)
                _this.good.urls.push(resp.data[i].url)
            }
        })
    }
}
</script>

<style scoped>
.image {
    width: 80%;
    display: block;
}
</style>