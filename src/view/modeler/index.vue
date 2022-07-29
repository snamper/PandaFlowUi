<template>
  <div class="layout">
    <div class="layout-header">
      <toolbar />
    </div>
    <div>
      <splitpanes class="default-theme" @resized="onResize" :dbl-click-splitter="false" :push-other-panes="false">
        <pane :size="propertiesPanel.collapsed ? 100 - paneSize / 100 : 100 - paneSize">
          <div ref="container" class="layout-container"></div>
        </pane>
        <pane :size="propertiesPanel.collapsed ? paneSize / 100 : paneSize" v-show="!propertiesPanel.collapsed"
              style="padding: 10px;background-color: #f8f8f8;overflow: hidden auto">
          <keep-alive>
            <component :is="propertiesPanel.component" />
          </keep-alive>
        </pane>
      </splitpanes>
    </div>
  </div>

</template>

<script setup lang="ts">
  import { Definition } from '@logicflow/core'
  import '@logicflow/core/dist/style/index.css'
  import { DndPanel, InsertNodeInPolyline, Menu, MiniMap, SelectionSelect, Snapshot } from '@logicflow/extension'
  import '@logicflow/extension/lib/style/index.css'
  import 'highlight.js/styles/stackoverflow-light.css'
  import { PropertiesPanelConfig, useModeler } from '../useapi'
  import { addListener } from 'resize-detector'
  import { Pane, Splitpanes } from 'splitpanes'
  import 'splitpanes/dist/splitpanes.css'
  import { nextTick, onMounted, provide, ref } from 'vue'
  import models from '../models'
  import propertiesPanelConfigs from '../models/propertiesPanel'
  import Toolbar from './toolbar.vue'
  import {useRoute} from "vue-router";

  const route = useRoute();
  const getQuerys = () => {
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
  const paneSize = ref(30)

  const getModel = () => {
    let model  = models.find(m => m.name === getQuerys().type) || models[0]
    getQuerys().type == "bpmn" ? model.newData = codeData.bpmn : model.newData = codeData.nodeRed
    console.log("model",model)
    return model
  }

  const propertiesPanelConfig: PropertiesPanelConfig = propertiesPanelConfigs[getModel().name]

  // Modeler
  const modeler = useModeler(getModel(), propertiesPanelConfig)
  const { propertiesPanel } = modeler

  function containerResize() {
    if (container.value && modeler.lf) {
      const { width, height } = container.value.getBoundingClientRect()
      modeler.lf.resize(width - 8, height - 8)
    }
  }

  async function onResize(e: any) {
    if (!container.value || !modeler.lf) return
    // console.log('onResize', e, modeler.lf.graphModel.width)
    if (e[1] && e[1].size) {
      const size = e[1].size
      propertiesPanel.collapsed = (size < 5)
      paneSize.value = size
    }
  }

  // provide context
  provide('modeler_context', modeler)

  // init
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
      adjustEdgeStartAndEnd: true,
      adjustEdge: false,
      hoverOutline: false,
      edgeSelectedOutline: false,
      // nodeTextDraggable: true,
      edgeTextDraggable: true,
      multipleSelectKey: 'meta',
      style: {
        nodeText: {
          overflowMode: 'autoWrap'
        },
      },
      keyboard: {
        enabled: true,
      },
      plugins: [
        DndPanel, InsertNodeInPolyline, Menu, MiniMap, SelectionSelect, Snapshot
      ]
    }
    modeler.initLogicFlow(_logicflow_options)

    // 探测 container 大小改变
    let _listenerRunning = false
    addListener(container.value, () => {
      if (_listenerRunning) return
      _listenerRunning = true
      // 减少短时间重复调用
      setTimeout(async () => {
        _listenerRunning = false
        await nextTick()
        containerResize()
      }, 500)
    })
  })
</script>

<style>
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
</style>