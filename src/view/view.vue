<template>
    <el-dialog fullscreen center>
        <template #header>
            <div style="font-size: large">视图查看</div>
        </template>
        <div>
            此处放视图{{code}}
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
    import {defineProps, reactive, ref,onMounted} from "vue";

    const props = defineProps({
        type: String,
        code: String,
    })

    const codeRef = ref();
    const state = reactive({

    });
    onMounted(() => {
        console.log("视图")
    })

</script>

<style scoped>

</style>