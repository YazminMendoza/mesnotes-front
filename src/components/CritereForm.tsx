import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { sujetApi } from '../api/sujetApi';
import { critereApi } from '../api/critereApi';

interface Critere {
    id?: string;
    nom: string;
    note: number;
    poids: number;
}

export const CritereForm = ({ sujetId, initialCriteres, onUpdate }: any) => {
    const [criteres, setCriteres] = useState<Critere[]>(initialCriteres || []);

//Pour ajouter un nouveau critère vide et l'envoyer au backend
    const addRow = async () => {
        try {
            const newCritere = { nom: '', note: 0, poids: 0 };
            const response = await sujetApi.addCritere(sujetId, newCritere);
            const updateSujet = response.data; 
            setCriteres(updateSujet.listeCriteres);
            onUpdate();
        } catch (error){
            console.error("Erreur lors de la création du critère:", error);
        }
    };
    
//Pour effacer un critère
    const handleDelete = async (critereId: string) => {
        if (!window.confirm("Voulez-vous vraiment supprimer ce critère d'évaluation ?")) return;
        try {
            await critereApi.delete(critereId);
            setCriteres((prevCriteres) => prevCriteres.filter(c => c.id !== critereId));
            onUpdate();
        } catch (error){
            console.log("Erreur lors de la suppression :", error);
        }
    };

//Pour sauvegarder automatiquement (PUT)
    const autoSave = async(critere: Critere) => {
        if (!critere.id) return;
        try {
            await critereApi.update(critere.id, critere);
            onUpdate();
        } catch (error) {
            console.error("Erreur lors de l'auto-save:", error);
        }
    };    

//Debounce
    const handleInputChange = (index: number, field: string, value: any) => {
//Mettre à jour l'experience utilisateur immédiatement
        const newCriteres = [...criteres];
        newCriteres[index] = { ...newCriteres[index], [field]: value };
        setCriteres(newCriteres);
//On nettoie des sauvegardes en attente
        const timerId = (newCriteres[index] as any)._timer;
        if (timerId) clearTimeout(timerId);
//Sauvegarde dans les suivants 500ms
        (newCriteres[index] as any)._timer = setTimeout(() => {
            autoSave(newCriteres[index]);
        }, 500);
    }    
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
                            onChange={(e) => handleInputChange(index, 'nom', e.target.value)}
                        />
                        <input
                            type="number"
                            className="w-16 border-b border-gray-300 text-center text-sm"
                            placeholder="Note"
                            value={c.note}
                            onChange={(e) => handleInputChange(index, 'note', parseFloat(e.target.value))}
                        />
                        <input
                            type="number"
                            className="w-16 border-b border-gray-300 text-center text-sm font-bold text-blue-600"
                            placeholder="Poids"
                            value={c.poids}
                            onChange={(e) => handleInputChange(index, 'poids', parseFloat(e.target.value))}
                        />                        
                        <button
                            onClick={() => handleDelete(c.id!)}
                            className="text-red-500 hover:text-red-700"
                            title="Supprimer"
                        >
                            <Trash2 size={18}/>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}