<template>
  <div style="width:150px;margin: 10px 0 0 10px">
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
import {delayIcon, fetchIcon, functionIcon, startIcon, switchIcon, swapIcon, zan} from "../icons";
    import LogicFlow from "@logicflow/core"
    import { ref } from 'vue'
import {selectIcon} from "../../bpmn/icons";
    const props = defineProps({
        lf: {
            type: LogicFlow,
            required: true,
        }
    })
    const activeNames = ref(['base'])
    const startDrag = (item:any) => {
      const { lf } = props;
      if (item.type == "select"){
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
            type: 'select',
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
            type: 'start-node',
            text: 'start',
            content: "这个节点是start",
            background: 'rgb(166, 187, 207)',
            icon: startIcon
          },
          {
            type: 'fetch-node',
            text: 'fetch',
            content: "这个节点是fetch",
            background: 'rgb(231, 231, 174)',
            icon: fetchIcon
          },
          {
            type: 'function-node',
            text: 'function',
            content: "这个节点是function",
            background: 'rgb(253, 208, 162)',
            icon: functionIcon
          },
          {
            type: 'switch-node',
            text: 'switch',
            content: "这个节点是switch",
            background: 'rgb(226, 217, 110)',
            icon: switchIcon
          },
          {
            type: 'swap-node',
            text: 'swap',
            content: "这个节点是swap",
            background: 'rgb(226, 217, 110)',
            icon: swapIcon
          },
          {
            type: 'delay-node',
            text: 'delay',
            content: "这个节点是delay",
            background: 'rgb(230, 224, 248)',
            icon: delayIcon
          }
        ]
      },
      {
        "title": "高级节点",
        "name": "expert",
        "baseNodes": [
          {
            type: 'fetch-node',
            text: 'zan',
            content: "这个节点是zan",
            background: 'rgb(231, 231, 174)',
            icon: zan
          },
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