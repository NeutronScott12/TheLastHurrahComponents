import { DefaultApolloClient } from '@vue/apollo-composable'
import { createApp, provide, h } from 'vue'
import { apolloClient } from './apollo'
import App from './App.vue'
import store from './store'

createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App),
})
    .use(store)
    .mount('#app')
