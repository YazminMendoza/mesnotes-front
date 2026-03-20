import { CarteSujet } from "../components/CarteSujet";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

export const Sujets = () => {
  const [sujets, setSujets] = useState([]);

  const fetchData = () => {
    api.get("/sujets")
    .then(response => {
      setSujets(response.data);
    })
    .catch(error =>{
      console.error("Erreur lors de la récuperation des syjets:", error);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Mes Sujets</h2>
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
