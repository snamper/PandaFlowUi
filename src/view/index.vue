<template>
    <div>
        <el-row :gutter="24" class="index">
            <el-col :span="12">
                <el-card class="box-card">
                    <template #header>
                        <div class="card-header">
                            <span>流程</span>
                            <div>
                                <el-button  type="primary" :icon="View"  @click="onViewFun('bpmn')">查看</el-button>
                                <el-button  type="success" :icon="Edit" @click="onEditFun('bpmn')">编辑</el-button>
                            </div>
                        </div>
                    </template>
                    <img alt="bpmn" src="/img/bpmn.png" />
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card">
                    <template #header>
                        <div class="card-header">
                            <span>规则</span>
                            <div>
                                <el-button type="primary" :icon="View" @click="onViewFun('nodeRed')">查看</el-button>
                                <el-button type="success" size="" :icon="Edit" @click="onEditFun('nodeRed')">编辑</el-button>
                            </div>
                        </div>
                    </template>
                    <img alt="bpmn" src="/img/nodeRed.png" />
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
    import {
        computed,
        ref,
        onMounted,
        reactive,
    } from "vue";
    import { useRouter } from 'vue-router'
    import {
        View,
        Edit,
    } from '@element-plus/icons-vue'

    const router = useRouter()

    const state: any = reactive({
        type: "bpmn",
        code: "",
    });

    const onViewFun = (type:string) => {
        if (type === "bpmn") {
            state.type = "bpmn"
            //state.code = codeData.bpmn
        }
        if (type === "nodeRed") {
            state.type = "nodeRed"
            //state.code = codeData.nodeRed
        }
        router.push({ path: '/view',query: state})

    }

    const onEditFun = (type:string) => {
        if (type === "bpmn") {
            state.type = "bpmn"
            //state.code = codeData.bpmn
        }
        if (type === "nodeRed") {
            state.type = "nodeRed"
            //state.code = codeData.nodeRed
        }
        router.push({ path: '/edit',query: {
                type: state.type,
                code: state.code
            }
        })
    }

</script>

<style scoped>

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
