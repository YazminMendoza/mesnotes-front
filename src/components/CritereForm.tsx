import { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import api from '../api/axiosConfig';

interface Critere {
    id?: string;
    nom: string;
    note: number;
    poids: number;
}

export const CritereForm = ({ sujetId, initialCriteres, onUpdate }: any) => {
    const [criteres, setCriteres] = useState<Critere[]>(initialCriteres || []);

//Pour ajouter un nouveau critère vide à l'interface utilisateur
    const addRow = () => {
        setCriteres([...criteres, { nom: '', note: 0, poids: 0 }]);
    };
    
//Pour envoyer le nouveau critére à l'API Spring Boot 
    const handleSave = async (critere: Critere, index: number) => {
        try {
//S'il n'as pas d'ID, c'est un nouveau critère, on le crée avec un POST
            if (!critere.id) {
                const response = await api.post(`/sujets/${sujetId}/criteres`, critere);
//On met à jour la liste locale avec l'ID retourné par l'API
                const updatedSujet = response.data;
                setCriteres(updatedSujet.listeCriteres);
                onUpdate(); // On notifie le parent pour rafraîchir les données
            } else {
//ICI LA LOGIGUE DE MISE À JOUR D'UN CRITÈRE EXISTANT AVEC UN PUT
                console.log("En train de mettre à jour...");
            }            
        } catch (error) {
            console.error("Erreur lors de la sauvegarde du critèere :", error);
        }
    };

    return (
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 mt-4">
            <h4 className="font-bold text-gray-700 mb-4 flex justify-between items-center">
                Critères d'évaluation
                <button onClick={addRow} className="bg-blue-600 text-white p-1 rounded-full hover:bg-blue-700">
                    <Plus size={18}/>
                </button>
            </h4>

            <div className="space-y-3">
                {criteres.map((c, index) => (
                    <div key={c.id || index} className="flex gap-2 items-center bg-white p-2 rounded shadow-sm">
                        <input
                            className="flex-1 border-b border-gray-300 focus:online-none focus:border-blue-500 text-sm"
                            placeholder="Nom (ex: contrôle continu)"
                            value={c.nom}
                            onChange={(e) => {
                                const newC = [...criteres];
                                newC[index].nom = e.target.value;
                                setCriteres(newC);
                            }}
                        />
                        <input
                            type="number"
                            className="w-16 border-b border-gray-300 text-center text-sm"
                            placeholder="Note"
                            value={c.note}
                            onChange={(e) => {
                                const newC = [...criteres];
                                newC[index].note = parseFloat(e.target.value);
                                setCriteres(newC);
                            }}
                        />
                        <input
                            type="number"
                            className="w-16 border-b border-gray-300 text-center text-sm font-bold text-blue-600"
                            placeholder="Poids"
                            value={c.poids}
                            onChange={(e) => {
                                const newC = [...criteres];
                                newC[index].poids = parseFloat(e.target.value);
                                setCriteres(newC);
                            }}
                        />
                        <button
                            onClick={() => handleSave(c, index)}
                            className="text-green-600 hover:text-green-800"
                            title="Enregistrer"                        
                        >
                            <Save size={18}/>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}