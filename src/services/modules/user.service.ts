import { api } from "../api";
import type { User } from "@/types/user";
import type { Variables } from "@/types/variables";

// Define um tipo para a resposta da API (ajuste conforme a estrutura de retorno)
type ApiResponse<T> = {
  data: T;
  message?: string;
  status?: number;
};

// Função para obter todos os usuários
export const getUser = async (variables: Variables): Promise<User[] | undefined> => {
  try {
    const res = await api.get<ApiResponse<User[]>>(`/pessoas`, { params: variables});
    return res.data;
  } catch (err) {
    handleApiError(err);
  }
};

// Função para encontrar um usuário pelo ID
export const findUser = async (id: Number): Promise<User | undefined> => {
  try {
    const res = await api.get<ApiResponse<User>>(`/pessoa/${id}`);
    return res.data;
  } catch (err) {
    handleApiError(err);
  }
};

// Função para criar um novo usuário
export const storeUser = async (data: User): Promise<User | undefined> => {
  try {
    const res = await api.post<ApiResponse<User>>(`/pessoa`, data);
    return res.data;
  } catch (err) {
    handleApiError(err);
  }
};

// Função para atualizar um usuário existente
export const updateUser = async (id: Number, data: User): Promise<User | undefined> => {
  try {
    const res = await api.put<ApiResponse<User>>(`/pessoa/${id}`, data);
    return res.data;
  } catch (err) {
    handleApiError(err);
  }
};

// Função para excluir um usuário
export const deleteUser = async (id: Number): Promise<void> => {
  try {
    await api.delete(`/pessoa/${id}`);
  } catch (err) {
    handleApiError(err);
  }
};

// Função para tratar erros da API
const handleApiError = (err: unknown): never => {
  if (err instanceof Error) {
    console.error(`API Error: ${err.message}`);
    throw err;
  }
  throw new Error("An unknown error occurred.");
};
