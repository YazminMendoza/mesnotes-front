import { CarteSujet } from "../components/carteSujet";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

export const Sujets = () => {
  const [sujets, setSujets] = useState([]);

  useEffect(() => {
    api.get("/sujets")
    .then(response => {
        setSujets(response.data);
    })
    .catch(error => {
        console.error("Error lors de la récuperation des sujets:", error);
    });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Mes Sujets</h2>
      <div className="flex gap-4">        
        {sujets.length > 0 ? (
            sujets.map((s: any) => (
                <CarteSujet key={s.id} nom={s.nom} note={s.note} />
            ))
        ) : (
            <p>Téléchargement en cours ou il n'y a aucun sujet disponible.</p>
        )}        
      </div>
    </div>
  );
};
