<template>
    <div style="width:150px;margin: 10px 0 0 10px;">
        <el-collapse v-model="activeNames">
        <el-collapse-item v-for="item in nodeList" :title="item.title" :name="item.name" >
          <el-tooltip
              class="box-item"
              effect="dark"
              v-for="(baseNode, index) in item.baseNodes"
              :content="baseNode.content"
              placement="right"
          >
              <Dnd :normal="baseNode.normal" :baseNode="baseNode" @mousedown="startDrag(baseNode)"></Dnd>
          </el-tooltip>
        </el-collapse-item>
      </el-collapse>
    </div>
</template>

<script lang="ts" setup>
    import {Search} from '@element-plus/icons-vue';
    import { endIcon, gatewayIcon, serviceTaskIcon, startIcon, userTaskIcon,selectIcon } from '../icons';
    import LogicFlow from "@logicflow/core"
    import { ref,watch } from 'vue'
    import Dnd from "@/components/dndPanel/dnd.vue"
    const props = defineProps({
        lf: {
            type: LogicFlow,
            required: true,
        }
    })
    const nodeText = ref("")
    const activeNames = ref(['base'])
    const startDrag = (item:any) => {
        const { lf } = props;
        if (item.type == "bpmn:select"){
            lf.extension.selectionSelect.openSelectionSelect();
            lf.on("selection:selected", (data) => {
                lf.extension.selectionSelect.closeSelectionSelect();
            });
        }else {
            lf.dnd.startDrag({
                type: item.type,
                text: item.text
            })
        }
    }

    const nodeList = ref([
      {
         "title": "工具节点",
         "name": "tools",
         "baseNodes": [
            {
              type: 'bpmn:select',
              text: '选框',
              content: "选框工具，点击选框可在右侧画布选择",
              background: 'rgb(166, 187, 207)',
              icon: selectIcon,
              normal: "none",
            },
         ]
        },
      {
        "title": "基础节点",
        "name": "base",
        "baseNodes": [
          {
            type: 'bpmn:startEvent',
            text: '开始',
            content: "这个节点是bpmn:startEvent",
            background: 'rgb(166, 187, 207)',
            icon: startIcon,
            normal: "left",
          },
          {
            type: 'bpmn:endEvent',
            text: '结束',
            content: "这个节点是bpmn:endEvent",
            background: 'rgb(193, 75, 51)',
            icon: endIcon,
            normal: "right",
          },
        ]
      },
      {
        "title": "任务节点",
        "name": "task",
        "baseNodes": [
            {
                type: 'bpmn:userTask',
                text: '用户任务',
                content: "这个节点是bpmn:userTask",
                background: 'rgb(253, 208, 162)',
                icon: userTaskIcon
            },
            {
                type: 'bpmn:serviceTask',
                text: '服务任务',
                content: "这个节点是bpmn:serviceTask",
                background: 'rgb(226, 217, 110)',
                icon: serviceTaskIcon
            },
        ]
      },
      {
          "title": "网关节点",
          "name": "gateway",
          "baseNodes": [
              {
                  type: 'bpmn:exclusiveGateway',
                  text: '网关',
                  content: "这个节点是bpmn:exclusiveGateway",
                  background: 'rgb(32, 174, 137)',
                  icon: gatewayIcon
              }
          ]
      }
    ])
</script>
<style scoped>
    .demo-collapse {
        width: 150px;
    }
    .demo-collapse /deep/ .el-collapse-item__header {
        text-indent: 20px;
    }
    .red-ui-palette-node {
        cursor: move;
        background: #fff;
        margin: 10px auto;
        height: 25px;
        border-radius: 5px;
        border: 1px solid #999;
        background-position: 5% 50%;
        background-repeat: no-repeat;
        width: 120px;
        background-size: contain;
        position: relative;
    }
    .red-ui-palette-label {
        color: #333;
        font-size: 13px;
        margin: 4px 0 4px 32px;
        line-height: 20px;
        overflow: hidden;
        text-align: center;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .red-ui-palette-icon-container {
        position: absolute;
        text-align: center;
        top: 0;
        bottom: 0;
        left: 0;
        width: 30px;
        border-right: 1px solid rgba(0,0,0,.05);
        background-color: rgba(0,0,0,.05);
    }
    .red-ui-palette-icon {
        display: inline-block;
        width: 20px;
        height: 100%;
        background-position: 50% 50%;
        background-size: contain;
        background-repeat: no-repeat;
    }

    .red-ui-palette-port {
        position: absolute;
        top: 8px;
        left: -5px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        background: #d9d9d9;
        border-radius: 3px;
        width: 10px;
        height: 10px;
        border: 1px solid #999;
    }

   .red-ui-palette-port-output {
        left: auto;
        right: -6px;
    }
</style>