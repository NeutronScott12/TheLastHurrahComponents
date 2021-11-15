<template></template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const comments = ref()

export default defineComponent({
    name: 'CommentList',
    setup() {
        const { result } = useQuery(gql`
            query {
                fetch_comments {
                    comments {
                        edited
                        plain_text_body
                        created_at
                        updated_at
                    }
                }
            }
        `)

        console.log(result)
    },
})
</script>
