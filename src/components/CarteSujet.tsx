import { MoreVertical, Calculator, Target } from 'lucide-react';
import { useState } from 'react';
import { CritereForm } from './CritereForm';
import api from '../api/axiosConfig';

interface CarteSujetProps {
    id: string;
    nom: string;
    note: number;
    listeCriteres: any[];
    onRefresh: () => void;
}

export const CarteSujet = ({ id, nom, note, listeCriteres, onRefresh }: CarteSujetProps) => {
    const [showDetails, setShowDetails] = useState(false);
        
    const handleCalculer = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await api.put(`/sujets/${id}/calculer`);
            onRefresh();
            alert("Moyenne mise à jour avec succès !");
        } catch (error) {
            console.error("Erreur lors du calcul :", error);
        }
    };

    return (
        <div 
            onClick={() => setShowDetails(!showDetails)}
            className={'bg-white p-5 rounded-xl shadow-md border-l-4 border-blue-500 w-80 h-fit cursor-pointer transition-all hover:shadow-lg ${showDetails ? "ring-1 ring-blue-300" : ""}'}
        >
            <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-gray-800">{nom}</h3>
                <button
                    onClick={(e) => { e.stopPropagation(); console.log("Menu options"); }} 
                    className="text-gray-400 hover:text-blue-600 p-1"
                >
                    <MoreVertical size={20}/>
                </button>
            </div>

            <p className="text-4xl font-black my-4 text-blue-600">
                {note ? note.toFixed(1) : "0.0"}
            </p>
               
            {/*Formulaire déroulant pour consulter/modifier les critères */}
            {showDetails && (
                <div
                    className="mt-4 border-t pt-4 animate-in fade-in duration-300"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex gap-2 mb-4">
                        <button 
                            onClick={handleCalculer}
                            className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-blue-700 shadow-sm">
                            <Calculator size={16}/> Calculer
                        </button>
                        <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-gray-200">
                            <Target size={16}/> Objectif
                        </button>
                    </div>

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
