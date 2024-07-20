import './assets/main.css'
import 'virtual:uno.css'
import 'uno.css'
import 'virtual:unocss-devtools'
import "@milkdown/theme-nord/style.css"

import { createApp } from 'vue'
import { createPinia } from "pinia"
import App from './App.vue'

const pinia = createPinia()
createApp(App).use(pinia).mount('#app')
