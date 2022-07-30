<template>
    <div style="margin: 10px 0 0 10px">
        <el-input
            v-model="nodeText"
            placeholder="名称搜索节点"
            clearable
        >
        </el-input>
        <el-collapse v-model="activeNames">
        <el-collapse-item v-for="item in nodeList" :title="item.title" :name="item.name" >
          <el-tooltip
              class="box-item"
              effect="dark"
              v-for="(baseNode, index) in item.baseNodes"
              :content="baseNode.content"
              placement="right"
          >
            <div
                class="red-ui-palette-node ui-draggable ui-draggable-handle"
                @mousedown="startDrag(baseNode)"
                :key="index"
                :style="{ backgroundColor: baseNode.background }"
            >
              <div class="red-ui-palette-label">{{baseNode.text}}</div>
              <div class="red-ui-palette-icon-container">
                <div class="red-ui-palette-icon" :style="{ backgroundImage: `url(${baseNode.icon})`}"></div>
              </div>
              <div class="red-ui-palette-port red-ui-palette-port-input"></div>
              <div class="red-ui-palette-port red-ui-palette-port-output"></div>
            </div>
          </el-tooltip>
        </el-collapse-item>
      </el-collapse>
    </div>
</template>

<script lang="ts" setup>
    import {Search} from '@element-plus/icons-vue';
    import { endIcon, gatewayIcon, serviceTaskIcon, startIcon, userTaskIcon,search } from '../icons';
    import LogicFlow from "@logicflow/core"
    import { ref } from 'vue'
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
        lf.dnd.startDrag({
            type: item.type,
            text: item.text
        })
    }
    const handleChange = (val: string[]) => {
        console.log(val)
    }
    const nodeList = ref([
      {
        "title": "基础节点",
        "name": "base",
        "baseNodes": [
          {
            type: 'bpmn:startEvent',
            text: '开始',
            content: "这个节点是bpmn:startEvent",
            background: 'rgb(166, 187, 207)',
            icon: startIcon
          },
          {
            type: 'bpmn:endEvent',
            text: '结束',
            content: "这个节点是bpmn:endEvent",
            background: 'rgb(231, 231, 174)',
            icon: endIcon
          },
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
          {
            type: 'bpmn:exclusiveGateway',
            text: '网关',
            content: "这个节点是bpmn:exclusiveGateway",
            background: 'rgb(226, 217, 110)',
            icon: gatewayIcon
          }
        ]
      }
    ])

    const baseNodes = ref([
        {
            type: 'bpmn:startEvent',
            text: '开始',
            background: 'rgb(166, 187, 207)',
            icon: startIcon
        },
        {
            type: 'bpmn:endEvent',
            text: '结束',
            background: 'rgb(231, 231, 174)',
            icon: endIcon
        },
        {
            type: 'bpmn:userTask',
            text: '用户任务',
            background: 'rgb(253, 208, 162)',
            icon: userTaskIcon
        },
        {
            type: 'bpmn:serviceTask',
            text: '服务任务',
            background: 'rgb(226, 217, 110)',
            icon: serviceTaskIcon
        },
        {
            type: 'bpmn:exclusiveGateway',
            text: '网关',
            background: 'rgb(226, 217, 110)',
            icon: gatewayIcon
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
    .red-ui-palette-port-output {
        left: auto;
        right: -6px;
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