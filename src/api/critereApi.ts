import api from "./axiosConfig";

export const critereApi = {
//Mettre à jour un critère (PUT)
    update: (id: string, data: any) => api.put(`/criteres/${id}`, data),
//Effacer un critère
    delete: (id: string) => api.delete(`/criteres/${id}`)        
};