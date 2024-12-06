<script setup lang="ts">
const props = defineProps({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    date_of_birth: {
        type: String,
    }
})  
</script>
<template>
    <v-expansion-panel
        :title="name"
        :text="email"
    >
    </v-expansion-panel>
</template>