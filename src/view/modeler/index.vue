<template>
  <el-dialog fullscreen center>
    <template #header>
      <div style="font-size: large">编辑</div>
    </template>
    <div>
      此处放编辑{{code}}
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
  import {defineProps, onMounted, reactive, ref,} from "vue";

  const props = defineProps({
    type: String,
    code: String,
  })

  const codeRef = ref();
  const state = reactive({

  });
  onMounted(() => {
    console.log("剪辑")
  })

</script>

<style scoped>

</style>