import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'

import piniaPluginPersistedstate, {createPersistedState} from 'pinia-plugin-persistedstate';

const pinia = createPinia();

const persistedStateConfig = createPersistedState({
	auto: true
})

pinia.use(piniaPluginPersistedstate);
pinia.use(persistedStateConfig)

const app = createApp(App)
	app.use(pinia)
	app.mount('#app')
