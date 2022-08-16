import { App } from 'vue'
import FlowViewer from './index.vue'

// 让组件可以通过 app.use() 的形式使用
export default {
    install(app: App) {
        app.component('flow-view', FlowViewer)
    }
}
