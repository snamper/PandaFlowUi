import { createApp, getCurrentInstance } from 'vue';
import ElementPlus from 'element-plus';

import Palette from './Palette.vue';

class BpmnExtension {
  static pluginName = 'BpmnExtension'
  constructor ({ lf }:any) {
    const { proxy } = getCurrentInstance() as any
    proxy.app = createApp(Palette, {
      lf
    })
  }
  render(lf:any, domOverlay:any) {
    const { proxy } = getCurrentInstance() as any
    const node = document.createElement('div')
    node.className = 'bpmn-palette'
    domOverlay.appendChild(node)
    proxy.app.use(ElementPlus).mount(node)
  }
}

export default BpmnExtension