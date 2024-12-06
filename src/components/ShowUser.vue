<script lang="ts" setup>
import moment from 'moment';
import type { User } from '@/types/user';
import { useUserStore } from '@/stores/user';
import { useRouter } from "vue-router"
import { storeToRefs } from 'pinia';

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const handleEditUser = () =>{
    router.push({ name: "CreateUser"});
}
const truncateNotDot = (str: String, length: Number) => {
	if (str && str.length > length) {
		return str.substring(0, length) 
	} else {
		return str
	}
}
</script>

<template>
  <v-card class="pa-5 elevation-1 rounded-lg" width="600">
    <v-row v-if="user">
        <v-col cols="12" class="d-flex justify-center">
            <div>
                <v-avatar
                    class="d-flex rounded-lg mx-auto"
                    color="grey"
                    rounded="0"
                    size="150"
                >
                    <span class="text-h6">{{ truncateNotDot(user?.name, 7).toUpperCase() }}</span>
                </v-avatar>
                <v-btn color="blue" variant="outlined" @click="$router.push({ name: 'EditUser', params:{ id: user.id } })" class="d-flex align-center mt-2" x-small>
                    <v-icon class="text-c2 icon">mdi-square-edit-outline</v-icon>
                    Editar Pessoa
                </v-btn>
            </div>
        </v-col>
        <v-col cols="12">
            <v-list density="compact" nav>
                <v-list-title class="text-h6 font-weight-bold text-center">Informações da Pessoa</v-list-title>
                <v-list-item >
                <v-list-item-title><b>Nome:</b> {{ user?.name }}</v-list-item-title>
                </v-list-item>
                <v-list-item >
                <v-list-item-title><b>E-mail:</b> {{ user?.email ?? '-' }}</v-list-item-title>
                </v-list-item>
                <v-list-item >
                <v-list-item-title><b>Data de nascimento:</b> {{ moment(user?.date_of_birth).format('DD/MM/YYYY') ?? '-' }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-col>
      
    </v-row>
    <v-skeleton-loader v-else type="card"></v-skeleton-loader>
  </v-card>
</template>