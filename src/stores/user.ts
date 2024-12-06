import { defineStore } from "pinia"
import type { User } from "@/types/user";
import type { Variables } from "@/types/variables";
import { getUser, findUser, storeUser, updateUser, deleteUser } from "@/services/modules/user.service"

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
		users: [],
		countUsers: 0,
		user: null,
	}),
  actions:{
    async fetchUser(variables: Variables){
      try {
        const res = await getUser(variables)
        console.log(res.users)
        this.users = res.users
        this.countUsers = Number(res.total)
      } catch (error) {
        
      }
    },
    async findUser(id: number){
      try {
        const res = await findUser(id)
        this.user = res.user
      } catch (error) {
        
      }
    },
    createUser(data: User){
      try {
        const res = storeUser(data)
        this.users.push(res.user)
      } catch (error) {
        
      }
    },
    async updateUser(id: number, data: User) {
      try {
        // Chama o serviço para atualizar o usuário
        const res = await updateUser(id, data);
    
        // Atualiza o usuário na lista local
        const index = this.users.findIndex((user: User) => user.id === id);
        if (index !== -1) {
          this.users[index] = res.user;
        }
      } catch (error) {
        console.error("Erro ao atualizar o usuário:", error);
      }
    },    
    async deleteUser(id: number) {
      try {
        // Chama o serviço para deletar o usuário
        await deleteUser(id);
    
        // Remove o usuário da lista local
        this.users = this.users.filter((user: User) => user.id !== id);
    
        // Atualiza a contagem total de usuários
        this.countUsers -= 1;
      } catch (error) {
        console.error("Erro ao deletar o usuário:", error);
      }
    }
  }
})
