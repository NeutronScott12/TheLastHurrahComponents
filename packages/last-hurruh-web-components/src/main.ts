import { createApp } from 'vue'
import App from './App.vue'

const app = createApp({
    setup: {
        provide(ApolloClient, { default: apolloClient }),
    },
    render: () => h(App),
}).mount('#app')
