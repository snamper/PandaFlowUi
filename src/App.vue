<template>
  <div>
  <el-row :gutter="24" class="index">
    <el-col :span="12">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>流程</span>
            <div>
              <el-button  type="primary" :icon="View" @click="onViewFun('bpmn')">查看</el-button>
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
    <EditModule v-model="state.isShowEdit" ref="editRef" :type="state.type" :code="state.code"/>
    <ViewModule v-model="state.isShowView" ref="viewRef" :type="state.type" :code="state.code"/>
  </div>
</template>

<script setup lang="ts">
  import {
    computed,
    ref,
    getCurrentInstance,
    onMounted,
    reactive,
  } from "vue";
  import {
    View,
    Edit,
  } from '@element-plus/icons-vue'
  import EditModule from "./view/edit.vue";
  import ViewModule from "./view/view.vue";

  const viewRef = ref();
  const editRef = ref();

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

  const state: any = reactive({
    type: "bpmn",
    code: "",
    isShowView: false,
    isShowEdit: false,
  });

  const onViewFun = (type:string) => {
    if (type === "bpmn") {
      state.type = "bpmn"
      state.code = codeData.bpmn
    }
    if (type === "nodeRed") {
      state.type = "nodeRed"
      state.code = codeData.nodeRed
    }
    state.isShowView = true
  }

  const onEditFun = (type:string) => {
    if (type === "bpmn") {
      state.type = "bpmn"
      state.code = codeData.bpmn
    }
    if (type === "nodeRed") {
      state.type = "nodeRed"
      state.code = codeData.nodeRed
    }
    state.isShowEdit = true
  }

</script>

<style scoped>

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
