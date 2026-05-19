import api from './axiosConfig';

export const sujetApi = {
//Obtenir tous les sujets    
    getAll: () => api.get('/sujets'),
//Obtenir sujet par id
    getById: (id: string) => api.get(`/sujets/${id}/`),
//Créer un nouveau sujet    
    create: (data: any) => api.post(`/sujets`, data),
//Calculer la note moyenne
    calculerMoyenne: (id: string) => api.put(`/sujets/${id}/calculer`),
//Calcules notes manquantes pour atteindre un objectif
    atteindreObjectif: (id: string, objectif: number) =>
        api.put(`/sujets/${id}/atteindre`, {objectif}),
//Effacer un sujet
    delete: (id: string) => api.delete(`/sujets/${id}`),
//Créer et ajouter un critère
    addCritere: (sujetId: string, critere: any) => api.post(`/sujets/${sujetId}/criteres`, critere), 
//Mettre à jour un Sujet complet
    update: (id: string, data: any) => api.put(`/sujets/${id}`, data), 
//Mettre à jour le nom ou la note d'un Sujet (modification partielle)     
    patch: (id: string, data:any) => api.patch(`/sujets/${id}`, data)
}