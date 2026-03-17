import { MoreVertical, Calculator, Target } from 'lucide-react';

interface CartePeriodeProps {
    nom: string;
    note: number;
}

export const CartePeriode = ({ nom, note }: CartePeriodeProps) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500 w-64">
            <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-gray-800">{nom}</h3>
                <button className="text-gray-400 hover:text-orange-600">
                    <MoreVertical size={20}/>
                </button>
            </div>

            <p className="text-3xl font-bold my-3 text-orange-600">{note.toFixed(1)}</p>

            <div className="flex gap-2">
                <button className="flex-1 bg-orange-100 text-orange-700 py-1 rounded text-sm flex items-center justify-center gap-1 hover:bg-orange-200">
                    <Calculator size={16}/> Calculer
                </button>
                <button>
                    <Target size={16}/> Objetif
                </button>
            </div>
        </div>
    );
};
