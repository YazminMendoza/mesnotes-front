import { MoreVertical, Calculator, Target, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CritereForm } from './CritereForm';
import { sujetApi } from '../api/sujetApi';

interface CarteSujetProps {
    id: string;
    nom: string;
    note: number;
    listeCriteres: any[];
    onRefresh: () => void;
}

export const CarteSujet = ({ id, nom: initialNom, note: initialNote, listeCriteres, onRefresh }: CarteSujetProps) => {
    const [showDetails, setShowDetails] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

//États locaux pour la modification immédiate
    const [localNom, setLocalNom] = useState(initialNom);
    const [localNote, setLocalNote] = useState(initialNote);
    const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
//Pour mettre à jour automatiquement les donées sur l'interface utilisateur 
    useEffect(() => {
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }
        setLocalNom(initialNom);
        setLocalNote(initialNote);
    }, [initialNom, initialNote]);

    const autoSaveSujet = (updateNom: string, updateNote: number) => {
        if (timer) clearTimeout(timer);

        const newTimer = setTimeout(async () => {
            try {
                await sujetApi.patch(id, {
                    nom: updateNom,
                    note: updateNote
                });
            } catch (error) {
                console.error("Erreur lors de l'auto-sauve du Sujet: ", error);
            }
        }, 800);
        setTimer(newTimer);
    };

    const handleNomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setLocalNom(val);
        autoSaveSujet(val, localNote);
    };

    const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value) || 0;
        setLocalNote(val);
        autoSaveSujet(localNom, val);
    };

    const handleCalculer = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            const response = await sujetApi.calculerMoyenne(id);
            setLocalNote(response.data.note);
            onRefresh();
        } catch (error) {
            console.error("Erreur lors du calcul :", error);
        }
    };

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!window.confirm(`Voulez-vous vraiment supprimer le sujet "${localNom}" ?`)) {
            setMenuOpen(false);
            return;
        }
        try {
            await sujetApi.delete(id);
            onRefresh();
        } catch (error) {
            console.error("Erreur lors de la suppression: ", error)
        }
    };

    return (
        <div 
            onClick={() => !showDetails && setShowDetails(true)} //Ouvrir la carte juste si elle est fermée
            className={`bg-white p-5 rounded-xl shadow-md border-l-4 border-blue-500 w-80 h-fit transition-all hover:shadow-lg ${showDetails ? "ring-1 ring-blue-300" : "cursor-pointer"}`}
        >
            <div className="flex justify-between items-start relative">
{/*Pour le nom, input si la carte est ouverte, texte si elle est fermée*/}
                {showDetails ? (
                    <input
                        value={localNom}
                        onChange={handleNomChange}
                        onClick={(e) => e.stopPropagation()}
                        className="text-lg font-bold text-gray-800 border-b border-blue-200 focus:outline-none focus:border-blue-500 w-full mr-4"
                    />
                ) : (
                    <h3 className="text-lg font-bold text-gray-800">{localNom}</h3>
                )}
                

{/*Conteneur du menu*/}
                <div className="relative">
                   <button
                        onClick={(e) => { 
                            e.stopPropagation();
                            setMenuOpen(!menuOpen); 
                        }} 
                        className="text-gray-400 hover:text-blue-600 p-1 rounded-full hover:bg-gray-100"
                    >
                        <MoreVertical size={20}/>
                    </button>
{/*Dropdown des options*/}
                    {menuOpen && (
                        <div
                            className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-xl z-20 py-1 animate-in zoom-in-95 duration-100"
                            onMouseLeave={() => setMenuOpen(false)}
                        >
                            <button
                                onClick={handleDelete}
                                className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                                <Trash2 size={16}/> Supprimer le Sujet
                            </button>
                        </div>
                    )}
                </div>   
            </div>

{/*Pour la note, input si la carte est ouverte, texte si elle est fermée*/}            
            {showDetails ? (
                <div className="flex items-center gap-2 my-4" onClick={(e) => e.stopPropagation()}>
                    <input
                        type="number"
                        step="0.1"
                        value={localNote}
                        onChange={handleNoteChange}
                        className="text-3xl font-black text-blue-600 border-b border-blue-200 focus:outline-none focus:border-blue-500 w-24"
                    />
                    
                </div>
            ) : (
                <p className="text-4xl font-black my-4 text-blue-600">
                    {localNote ? localNote.toFixed(2) : "0.0"}
                </p>
            )}
            
               
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

                    {/*Bouton pour fermer la carte*/}
                    <button
                        onClick={() => setShowDetails(false)}
                        className="text-xs text-gray-400 hover:text-gray-600 mb-4 block underline"
                    >
                        Fermer ce Sujet
                    </button>
                </div>                  
            )}
        </div>
        
    );
};
