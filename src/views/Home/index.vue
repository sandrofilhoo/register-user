<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useRouter } from "vue-router";
import gsap from 'gsap'
import { onMounted, reactive, ref, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import type { Variables } from '@/types/variables';
import moment from 'moment';
import type { User } from '@/types/user';

const router = useRouter();
const userStore = useUserStore();
const { users, countUsers } = storeToRefs(userStore);
const loading = ref(false)
const search = ref('')

const options = reactive<Variables>({
    search: null,
    limit: 1,
    offset: 0
})
const headers = [
        {
          title: 'id',
          align: 'start',
          sortable: false,
          key: 'id',
        },
        {
          title: 'Nome',
          align: 'center',
          sortable: false,
          key: 'name',
        },
        { title: 'Emai', key: 'email', align: 'end' },
        { title: 'Data de nascimento', key: 'date_of_birth', align: 'end' },
        { title: 'Criado em', key: 'created_at', align: 'end' },
        { title: 'Controle', key: 'options', align: 'end' },
      ]
const handleCreateUser = () =>{
    router.push({ name: "CreateUser"});
}
const handleDeleteUser = async (e: User) =>{
    try {
        loading.value = true
        await userStore.deleteUser(e.id)
        await userStore.fetchUser(options)
        loading.value = false
    } catch (error) {
        console.log(error)
    }
}
const updateOptions = async ({ page, itemsPerPage }) =>{
    try {
        loading.value = true
        if(itemsPerPage !== options.limit ||
        itemsPerPage * page - itemsPerPage !== options.offset){

            options.offset = itemsPerPage * page - itemsPerPage;
            options.limit = itemsPerPage;
            window.scrollTo({ top: 0, behavior: "smooth" });
            await userStore.fetchUser(options)
        }
        loading.value = false
    } catch (error) {
        console.log(error)
    }
}
const handleSearch = (e: String) =>{
    try {
        loading.value = true
        options.search = e
        userStore.fetchUser(options)
        loading.value = false
    } catch (error) {
        console.log(error)
    }
}

onMounted(async ()=>{
    await userStore.fetchUser(options)
})
</script>
<template>
    <v-container>
        <v-row>
            <v-col cols="9">
                <h3 class="d-flex align-center text-h5 font-weight-bold">Listagem de pessoas</h3>
            </v-col>
            <v-col cols="3">
                <v-btn color="green" class="elevation-0" width="100%" @click="handleCreateUser" prepend-icon="mdi-plus">Adicionar pessoa</v-btn>
            </v-col>
            
            <v-col cols="12">
                <v-card class="pa-3 elevation-0 rounded-lg">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field @update:modelValue="handleSearch" v-model="search" hide-details label="Pesquisar" append-inner-icon="mdi-magnify" variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-data-table-server
                                :loading="loading"
                                :headers="headers"
                                :items="users"
                                :items-per-page="options.limit"
                                :items-length="countUsers"
                                @update:options="updateOptions"
                            >
                                <template v-slot:item.id="{ item }">
                                    <span class="cursor-pointer" @click="router.push({name: 'ShowUser', params:{ id: item.id }})">
                                        {{  item.id }}
                                    </span>
                                </template>
                                <template v-slot:item.name="{ item }">
                                    <span class="cursor-pointer" @click="router.push({name: 'ShowUser', params:{ id: item.id }})">
                                        {{  item.name }}
                                    </span>
                                </template>
                                <template v-slot:item.date_of_birth="{ item }">
                                    {{ item?.date_of_birth ? moment(item?.date_of_birth).format('DD/MM/YYYY') : '-' }}
                                </template>
                                <template v-slot:item.created_at="{ item }">
                                    {{ item?.created_at ? moment(item?.created_at).format('DD/MM/YYYY') : '-' }}
                                </template>
                                <template v-slot:item.options="{ item }">
                                    <div>
                                        <v-btn @click="$router.push({ name: 'EditUser', params:{ id: item.id } })" class="elevation-0" density="compact" icon="mdi-square-edit-outline"></v-btn>
                                        <v-btn @click="handleDeleteUser(item)" variant="text" color="red" class="elevation-0" density="compact" icon="mdi-delete"></v-btn>
                                    </div>
                                </template>
                            </v-data-table-server>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>