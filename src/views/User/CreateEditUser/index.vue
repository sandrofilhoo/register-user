<script lang="ts" setup>
import Form from '@/components/Form.vue';
import ButtonReturn from '@/components/ButtonReturn.vue';
import { useUserStore } from '@/stores/user';
import { onMounted, ref } from 'vue';
import { useRoute } from "vue-router"

const route = useRoute()
const userStore = useUserStore();
const title = ref("")

onMounted(async ()=>{
    if(route.params.id){
        title.value = "Editar pessoa"
        await userStore.findUser(Number(route.params.id))
    }else{
        title.value = "Cadastrar pessoa"
    }
})
</script>
<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <ButtonReturn/>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
                <Form :title="title"/>
            </v-col>
        </v-row>
    </v-container>
</template>
<style scoped>
</style>