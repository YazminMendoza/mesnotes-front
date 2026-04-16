import { CarteSujet } from "../components/CarteSujet";
import { useEffect, useState } from "react";
import { Plus, Trash2 } from 'lucide-react';
import { sujetApi } from "../api/sujetApi";

export const Sujets = () => {
  const [sujets, setSujets] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const response = await sujetApi.getAll();
      setSujets(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des sujets:", error);      
    }    
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateSujet = async () => {
    try {
      const newSujetData = {
        nom: "Nouveau Sujet",
        note: 0.0,
        listeCriteres: []
      };
      const response = await sujetApi.create(newSujetData);
      setSujets(prev => [response.data, ...prev]);
    } catch (error) {
      console.error("Erreur lors de la création du sujet:");
    }
  };

  return (
    <div>
      <div className='flex items-center justify-between mb-8'>
        <h1 className="text-3xl font-bold text-gray-800">Mes Sujets</h1>
        <button
          onClick={handleCreateSujet}
          className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md'
        >
          <Plus size={20}/>
          <span className='hidden sm:inline'>Nouveau Sujet</span>
        </button>
      </div>
      
      <div className="flex flex-wrap gap-4">        
        {sujets.length > 0 ? (
            sujets.map((s: any) => (
                <CarteSujet 
                  key={s.id} 
                  id={s.id}
                  nom={s.nom} 
                  note={s.note} 
                  listeCriteres={s.listeCriteres}
                  onRefresh={fetchData}
                />
            ))
        ) : (
            <p>Téléchargement en cours ou il n'y a aucun sujet disponible.</p>
        )}        
      </div>
    </div>
  );
};
