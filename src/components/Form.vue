<script lang="ts" setup>
import { ref, reactive, computed, watch } from 'vue';
import moment from 'moment';
import type { User } from '@/types/user';
import { storeToRefs } from 'pinia';

import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useUserStore } from '@/stores/user';
import { useRouter } from "vue-router";
import { useRoute } from "vue-router"

const disabled = ref<boolean>(false);

const props = defineProps({
  title: String,
})
const form = reactive<User>({
  name: null,
  email: null,
  date_of_birth: null,
});

const rules = {
  name: { required },
  email: { required, email },
  date_of_birth: { required },
};
const route = useRoute()
const router = useRouter();
const v$ = useVuelidate(rules, form);
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const date = ref<string | null>(null);
const now = ref<string>(moment().format('YYYY-MM-DD'));

const formattedDate = computed<string>(() => {
  if (date.value) {
    form.date_of_birth = moment(date.value).format('YYYY-MM-DD');
    return moment(date.value).format('DD/MM/YYYY');
  }
  return '';
});

const onDateChange = (newDate: string) => {
  date.value = newDate;
};

const warnDisabled = () => {
  disabled.value = true;
  setTimeout(() => {
    disabled.value = false;
  }, 1500);
};

const handleCreateUser = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    warnDisabled();
    return;
  }

  try {
    if(route.params.id){
      await userStore.updateUser(Number(route.params.id),form)
      await router.push({ name: "Home"});
    }else{
      await userStore.createUser(form)
      await router.push({ name: "Home"});
    }
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
  }
};

watch(user, (newVal)=>{
  Object.assign(form, newVal); 
  date.value = newVal.date_of_birth
})
</script>

<template>
  <v-card class="pa-5 elevation-1 rounded-lg" width="700" :class="{ shake: disabled }">
    <v-row>
      <v-col cols="12" class="text-center">
        <h3 class="text-h4 font-weight-bold">{{ title }}</h3>
      </v-col>
      <v-col cols="7">
        <v-text-field
          v-model="form.name"
          label="Nome"
          variant="outlined"
          :error-messages="v$.name.$errors.map(e => 'Campo obrigatório')"
          :hide-details="!v$.name.$errors.length"
        />
      </v-col>
      <v-col cols="5">
        <v-date-input
            prepend-icon=""
            prepend-inner-icon="$calendar"
            v-model="date"
            label="Data de nascimento"
            variant="outlined"
            :value="formattedDate"
            :max="now"
            cancel-text="Cancelar"
            ok-text="Salvar"
            :error-messages="v$.date_of_birth.$errors.map(e => 'Campo obrigatório')"
            :hide-details="!v$.date_of_birth.$errors.length"
            @update:model-value="onDateChange"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="form.email"
          label="E-mail"
          variant="outlined"
          :error-messages="v$.email.$errors.map(e => e.$message == 'Value is required' ? 'Campo obrigatório' : 'E-mail inválido')"
          :hide-details="!v$.email.$errors.length"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex justify-end">
        <v-btn color="green" class="elevation-0" @click="handleCreateUser">Salvar</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
