import { MoreVertical, Calculator, Target } from 'lucide-react';
import { useState } from 'react';
import { CritereForm } from './CritereForm';

interface CarteSujetProps {
    id: string;
    nom: string;
    note: number;
    listeCriteres: any[];
    onRefresh: () => void;
}

export const CarteSujet = ({ id, nom, note, listeCriteres, onRefresh }: CarteSujetProps) => {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500 w-80 h-fit">
            <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-gray-800">{nom}</h3>
                <button className="text-gray-400 hover:text-blue-600">
                    <MoreVertical size={20}/>
                </button>
            </div>

            <p className="text-3xl font-bold my-3 text-blue-600">
                {note ? note.toFixed(1) : "0.0"}
            </p>

            <div className="flex gap-2 mb-2">          
                 <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex-1 bg-blue-100 text-blue-700 py-1 rounded text-sm flex items-center justify-center gap-1 hover:bg-blue-200"
                >
                    <Calculator size={16}/> {showForm ? 'Fermer' : 'Calculer'}                
                </button>
                <button className="felx-1 bg-gray-100 text-gray-700 py-1 rounded text-sm flex items-center justify-center gap-1 hover:bg-gray-200">
                    <Target size={16}/> Objetif
                </button>
            </div>
                
            {/*Formulaire juste si l'utilisateur clique sur Calculer */}
            {showForm && (
                <div>
                    <CritereForm
                        sujetId={id}
                        initialCriteres={listeCriteres}
                        onUpdate={onRefresh}
                    />
                </div>                  
            )}
        </div>
        
    );
};
