<template>
  <el-container class="layout" >
    <el-header class="layout-header"><toolbar /></el-header>
    <el-main><div ref="container" class="layout-container"></div></el-main>
  </el-container>
  <el-drawer
          v-model="codeDrawerVisible"
          title="Json代码!"
          size="40%"
          @open="setCode"
  >
    <highlight autodetect :code="code" />
  </el-drawer>

</template>

<script setup lang="ts">
 import {provide, ref, onMounted} from "vue";
 import { useRoute } from "vue-router";
 import highlightjs from "@highlightjs/vue-plugin"
 import { Definition } from '@logicflow/core'
 import { MiniMap } from '@logicflow/extension'
 import hljs from 'highlight.js/lib/core'
 import json from 'highlight.js/lib/languages/json'
 import xml from 'highlight.js/lib/languages/xml'
 import { useViewer } from '../useapi'
 import models from '../models'
 import Toolbar from "./toolbar.vue";

 const route = useRoute();
 const getQuerys = () => {
   return route.query;
 };

 let codeData = {
   "bpmn": {
     "nodes": [
       {
         "id": "Event_3m8r8f6",
         "type": "bpmn:startEvent",
         "x": 260,
         "y": 260,
         "properties": {}
       },
       {
         "id": "Activity_1ioo5if",
         "type": "bpmn:userTask",
         "x": 420,
         "y": 260,
         "properties": {}
       },
       {
         "id": "Activity_1j9h95q",
         "type": "bpmn:serviceTask",
         "x": 620,
         "y": 260,
         "properties": {}
       },
       {
         "id": "Event_340rvte",
         "type": "bpmn:endEvent",
         "x": 780,
         "y": 260,
         "properties": {}
       }
     ],
     "edges": [
       {
         "id": "Flow_098qupl",
         "type": "bpmn:sequenceFlow",
         "sourceNodeId": "Event_3m8r8f6",
         "targetNodeId": "Activity_1ioo5if",
         "startPoint": {
           "x": 278,
           "y": 260
         },
         "endPoint": {
           "x": 370,
           "y": 260
         },
         "properties": {},
         "pointsList": [
           {
             "x": 278,
             "y": 260
           },
           {
             "x": 370,
             "y": 260
           }
         ]
       },
       {
         "id": "Flow_0su6amd",
         "type": "bpmn:sequenceFlow",
         "sourceNodeId": "Activity_1ioo5if",
         "targetNodeId": "Activity_1j9h95q",
         "startPoint": {
           "x": 470,
           "y": 260
         },
         "endPoint": {
           "x": 570,
           "y": 260
         },
         "properties": {},
         "pointsList": [
           {
             "x": 470,
             "y": 260
           },
           {
             "x": 570,
             "y": 260
           }
         ]
       },
       {
         "id": "Flow_2lkq3kj",
         "type": "bpmn:sequenceFlow",
         "sourceNodeId": "Activity_1j9h95q",
         "targetNodeId": "Event_340rvte",
         "startPoint": {
           "x": 670,
           "y": 260
         },
         "endPoint": {
           "x": 763,
           "y": 260
         },
         "properties": {},
         "pointsList": [
           {
             "x": 670,
             "y": 260
           },
           {
             "x": 763,
             "y": 260
           }
         ]
       }
     ]
   },
   "nodeRed": {
     nodes: [
       {
         id: 'node_1',
         type: 'start-node',
         x: 220,
         y: 200,
         text: 'start'
       },
       {
         id: 'node_2',
         type: 'fetch-node',
         x: 420,
         y: 200,
         text: 'fetch data'
       },
       {
         id: 'node_3',
         type: 'function-node',
         x: 620,
         y: 200,
         text: 'function'
       },
       {
         id: 'node_4',
         type: 'delay-node',
         x: 420,
         y: 300,
         text: 'delay'
       },
       {
         id: 'node_5',
         type: 'switch-node',
         x: 820,
         y: 200,
         text: 'switch'
       },
       {
         id: 'node_6',
         type: 'function-node',
         x: 1020,
         y: 200,
         text: 'function'
       },
       {
         id: 'node_7',
         type: 'function-node',
         x: 1020,
         y: 300,
         text: 'function'
       }
     ],
     edges: [
       {
         type: 'flow-link',
         sourceNodeId: 'node_1',
         targetNodeId: 'node_2'
       },
       {
         type: 'flow-link',
         sourceNodeId: 'node_2',
         targetNodeId: 'node_3'
       },
       {
         type: 'flow-link',
         sourceNodeId: 'node_3',
         startPoint: {
           x: 680,
           y: 200
         },
         targetNodeId: 'node_4'
       },
       {
         type: 'flow-link',
         sourceNodeId: 'node_4',
         startPoint: {
           x: 370,
           y: 300
         },
         targetNodeId: 'node_2'
       },
       {
         type: 'flow-link',
         sourceNodeId: 'node_3',
         targetNodeId: 'node_5'
       },
       {
         type: 'flow-link',
         sourceNodeId: 'node_5',
         targetNodeId: 'node_6'
       },
       {
         type: 'flow-link',
         sourceNodeId: 'node_5',
         targetNodeId: 'node_7'
       }
     ]
   }
 }

 const container = ref<HTMLElement>()
 const codeDrawerVisible = ref(false)
 const code = ref('')

 const getModel = () => {
   let model  = models.find(m => m.name === getQuerys().type) || models[0]
   getQuerys().type == "bpmn" ? model.newData = codeData.bpmn : model.newData = codeData.nodeRed
   console.log("model",model)
   return model
 }

 const viewer = useViewer(getModel())

 const setCode = () => {
   let c
   if ( getQuerys().code) {
     c = viewer.lf?.getGraphRawData()
   } else {
     c = viewer.lf?.getGraphData()
   }
   if (typeof c == 'object') c = JSON.stringify(c, null, 2)
   code.value = c
 }

  // codeViewer
  hljs.registerLanguage('json', json);
  hljs.registerLanguage('xml', xml);
  const highlight = highlightjs.component

  provide('viewer_context', Object.assign(viewer, { codeDrawerVisible }))

  onMounted(() => {
    if (!container.value) {
      console.log('error container is null')
      return
    }
    const _logicflow_options: Definition = {
      container: container.value,
      grid: {
        visible: true,
        type: 'mesh',
        size: 20,
        config: {
          color: '#eeeeee'
        }
      },
      isSilentMode: true,
      adjustEdge: false,
      hoverOutline: false,
      edgeSelectedOutline: false,
      plugins: [
        MiniMap
      ]
    }
    viewer.initLogicFlow(_logicflow_options)
  })

</script>

<style scoped>
  .layout{
    height: 100%;
    width: 100%;
    margin: 0;
    overflow: hidden;
  }
  .layout-header{
    background: #fff;
    height: 40px;
    width: 100%;
    line-height: 32px;
    padding: 5px 10px
  }
  .layout-container{
    height: 100%;
    width: 100%;
    padding: 4px;
    box-shadow: 0 0 4px rgb(0 0 0 / 30%) inset;
    background: #fff;
      z-index: 999;
  }

  pre,
  pre code.hljs {
    overflow: visible;
    margin: 0;
    background-color: transparent;
  }
</style>