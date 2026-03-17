import { MoreVertical, Calculator, Target } from 'lucide-react';

interface CarteFormationProps {
    nom: string;
    note: number;
}

export const CarteFormation = ({ nom, note }: CarteFormationProps) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500 w-64">
            <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-gray-800">{nom}</h3>
                <button className="text-gray-400 hover:text-green-600">
                    <MoreVertical size={20}/>
                </button>
            </div>

            <p className="text-3xl font-bold my-3 text-green-600">{note.toFixed(1)}</p>

            <div className="flex gap-2">
                <button className="flex-1 bg-green-100 text-green-700 py-1 rounded text-sm flex items-center justify-center gap-1 hover:bg-green-200">
                    <Calculator size={16}/> Calculer
                </button>
                <button>
                    <Target size={16}/> Objetif
                </button>
            </div>
        </div>
    );
};
