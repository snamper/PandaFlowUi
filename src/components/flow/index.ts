import { App } from 'vue'
import FlowModeler from './modeler'
import FlowViewer from './viewer'

const components = [FlowModeler,FlowViewer]

export default {
    /**
     * 让组件可以通过 app.use() 的形式使用
     * @param app
     */
    install(app: App) {
        components.map(item => {
            app.use(item)
        })
    }
}
