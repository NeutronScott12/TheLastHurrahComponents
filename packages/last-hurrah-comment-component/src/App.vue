<template>
    <img alt="Vue logo" src="./assets/logo.png" />
    <Comment />
</template>

<script lang="ts">
import Comment from './modules/comments/Comment.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'App',
    components: {
        Comment,
    },
})
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
