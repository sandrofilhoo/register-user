<script lang="ts" setup>
import ShowUser from '@/components/ShowUser.vue';
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRoute } from "vue-router"
import ButtonReturn from '@/components/ButtonReturn.vue';

const route = useRoute()
const userStore = useUserStore();

onMounted(async ()=>{
    await userStore.findUser(Number(route.params.id))
})
</script>
<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <ButtonReturn/>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
                <ShowUser/>
            </v-col>
        </v-row>
    </v-container>
</template>