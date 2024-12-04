import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDateInput } from 'vuetify/labs/VDateInput'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const vuetify = createVuetify({
    components:{
        ...components,
        VDateInput
    },
    directives,
})

app.use(createPinia())
app.use(vuetify)
app.use(router)

app.mount('#app')
