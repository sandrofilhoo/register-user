<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();
const handlerGoBack = () =>{
    router.push({ name: "Home"});
}
</script>
<template>
    <v-btn variant="outlined" icon="mdi-chevron-left" @click="handlerGoBack"></v-btn>
</template>