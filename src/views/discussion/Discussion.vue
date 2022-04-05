<template>
    <el-container>
        <el-main style="width: 70%; height: 100%">
            <el-card class="box-card" style="width: 99%; ">
                <div>
                    <el-input style="width: 50%"></el-input>&nbsp;
                    <el-button type="primary">搜索</el-button>
                    <el-button type="primary" @click="toAdd">发布问题</el-button>
                </div>
                <div>
                    <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true" style="margin: 10px">
                        <el-tab-pane name="all" >
                            <span slot="label" class="fontClass">全部</span>
                            <all></all>
                        </el-tab-pane>
                        <el-tab-pane v-for="(item, key) in items" :name="item.id.toString()" :key="key" >
                            <span slot="label" class="fontClass">{{ item.subject }}</span>
                            <zone :id="item.id.toString()"></zone>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-card>
        </el-main>
        <el-aside style="width: 30%">
            <el-main>
                <el-card class="box-card" style="width: 99%">
                    <div slot="header" class="clearfix">
                        <span>卡片名称</span>
                        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                    </div>
                    <div v-for="o in 4" :key="o" class="text item">
                        {{'列表内容 ' + o }}
                    </div>
                </el-card>
            </el-main>
        </el-aside>
    </el-container>

</template>

<script>
import All from "./All";
import Zone from "./Zone";
export default {
    name: "Discussion",
    components: {Zone, All},
    data() {
        return {
            activeName: 'all',
            items: [],
            divstyle: {
                'height': '100%',
                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'center',
                'width': '100%'
            }
        };
    },
    methods: {
        handleClick(tab, event) {
            // const _this = this
            // this.$router.push({path: '/discussion/zone?subjectid='+tab.name})
            // this.$router.push({
            //     path: '/discussion/zone',
            //     query: {
            //         subjectid: tab.name
            //     }
            // })
        },
        toAdd(){
            this.$router.push({path: "/addDiscussion"})
        }
    },
    created() {
        const _this = this
        axios.get('http://localhost:8181/subject/findAll').then(function (resp){
            _this.items = resp.data
            _this.items.reverse()
        })
    }
}
</script>

<style scoped>
    .box-card {
        width: 480px;
    }
    .fontClass{
        font-size:16px;
        /*font-family: Microsoft Yahei;*/
    }
</style>