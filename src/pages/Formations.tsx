import { CarteFormation } from "../components/CarteFormation";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

export const Formations = () => {
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    api.get("/formations")
    .then(response => {
        setFormations(response.data);
    })
    .catch(error => {
        console.error("Error lors de la récuperation des formations:", error);
    });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Mes Formations</h2>
      <div className="flex gap-4">        
        {formations.length > 0 ? (
            formations.map((f: any) => (
                <CarteFormation key={f.id} nom={f.nom} note={f.note} />
            ))
        ) : (
            <p>Téléchargement en cours ou il n'y a aucune formation disponible.</p>
        )}        
      </div>
    </div>
  );
};
