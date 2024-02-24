import { createApp } from 'vue'
import App from '@/App.vue'
import { registerPlugins } from '@core/utils/plugins'

import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

// Styles
import '@core/scss/template/index.scss'
import '@styles/styles.scss'
import store from './store/index.js'

// Create vue app
const app = createApp(App)


// Register plugins
registerPlugins(app)

// Notification
app.use(useToast)

// Vuex Store
app.use(store)

// Mount vue app
app.mount('#app')
