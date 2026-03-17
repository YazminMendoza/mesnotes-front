import { CartePeriode } from "../components/CartePeriode";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

export const Periodes = () => {
  const [periodes, setPeriodes] = useState([]);

  useEffect(() => {
    api.get("/periodes")
    .then(response => {
        setPeriodes(response.data);
    })
    .catch(error => {
        console.error("Error lors de la récuperation des périodes:", error);
    });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Mes Périodes</h2>
      <div className="flex gap-4">        
        {periodes.length > 0 ? (
            periodes.map((p: any) => (
                <CartePeriode key={p.id} nom={p.nom} note={p.note} />
            ))
        ) : (
            <p>Téléchargement en cours ou il n'y a aucune période disponible.</p>
        )}        
      </div>
    </div>
  );
};
