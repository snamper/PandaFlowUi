<template>
    <div class="layout">
      <div class="layout-header">
        <toolbar />
      </div>
      <div style="display: block; flex:auto;min-height: 0">
        <div ref="container"
             style="height: 100%; width: 100%;padding: 4px;box-shadow: 0 0 4px rgb(0 0 0 / 30%) inset; background: #fff">
        </div>
      </div>
    </div>
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
   let quere = route.query;
   console.log("quere",quere, quere.type,quere.code)
   return route.query;
 };

 let codeData = {
   "bpmn": {
     "nodes": [
       {
         "id": "Event_0vu9f9k",
         "type": "bpmn:startEvent",
         "x": 250,
         "y": 130,
         "properties": {}
       },
       {
         "id": "Event_23njbc0",
         "type": "bpmn:endEvent",
         "x": 781,
         "y": 130,
         "properties": {}
       },
       {
         "id": "Activity_0fiu8id",
         "type": "bpmn:userTask",
         "x": 410,
         "y": 130,
         "properties": {}
       },
       {
         "id": "Activity_1t0d2vr",
         "type": "bpmn:serviceTask",
         "x": 610,
         "y": 130,
         "properties": {}
       }
     ],
     "edges": [
       {
         "id": "Flow_10c8bo7",
         "type": "bpmn:sequenceFlow",
         "sourceNodeId": "Event_0vu9f9k",
         "targetNodeId": "Activity_0fiu8id",
         "startPoint": {
           "x": 268,
           "y": 130
         },
         "endPoint": {
           "x": 360,
           "y": 130
         },
         "properties": {},
         "pointsList": [
           {
             "x": 268,
             "y": 130
           },
           {
             "x": 360,
             "y": 130
           }
         ]
       },
       {
         "id": "Flow_3gtob6a",
         "type": "bpmn:sequenceFlow",
         "sourceNodeId": "Activity_0fiu8id",
         "targetNodeId": "Activity_1t0d2vr",
         "startPoint": {
           "x": 460,
           "y": 130
         },
         "endPoint": {
           "x": 560,
           "y": 130
         },
         "properties": {},
         "pointsList": [
           {
             "x": 460,
             "y": 130
           },
           {
             "x": 560,
             "y": 130
           }
         ]
       },
       {
         "id": "Flow_0fvq0tq",
         "type": "bpmn:sequenceFlow",
         "sourceNodeId": "Activity_1t0d2vr",
         "targetNodeId": "Event_23njbc0",
         "startPoint": {
           "x": 660,
           "y": 130
         },
         "endPoint": {
           "x": 763,
           "y": 130
         },
         "properties": {},
         "pointsList": [
           {
             "x": 660,
             "y": 130
           },
           {
             "x": 763,
             "y": 130
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
 const existAdapterOut = ref(false)

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

    existAdapterOut.value = !!viewer.lf?.adapterOut
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

  .lf-mini-map {
    padding-top: 0;
    right: 5px;
    bottom: 5px;
    height: 120px;
    box-shadow: 0 1px 4px rgb(0 0 0 / 30%);
    background-color: rgba(255, 255, 255, 0.8);
  }

  .lf-mini-map-header,
  .lf-mini-map-close {
    visibility: hidden;
  }

  .lf-mini-map .lf-graph {
    background: none;
  }

  pre,
  pre code.hljs {
    overflow: visible;
    margin: 0;
    background-color: transparent;
  }
</style>