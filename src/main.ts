import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@logicflow/extension/lib/style/index.css'
import '@logicflow/core/dist/style/index.css'
import 'highlight.js/styles/stackoverflow-light.css'
import 'splitpanes/dist/splitpanes.css'

import * as svg from '@element-plus/icons-vue';
import SvgIcon from '@/components/svgIcon/index.vue';


import router from './router/index'

const app = createApp(App);

const icons = svg as any;
for (const i in icons) {
    app.component(`element${icons[i].name}`, icons[i]);
}
app.component('SvgIcon', SvgIcon);

app
    .use(router)
    .use(ElementPlus, {size: "default" })
    .mount('#app')

