export interface Sujet {
    id: string;
    nom: string;
    note: number;
    poids: number | null;
    listeCriteres: any[];
}

export interface Periode {
    id: string;
    nom: string;
    note: number;
    poids: number | null;
    listeSujets: Sujet[];
}

export interface Formation {
    id: string;
    nom: string;
    note: number;
    listePeriodes: Periode[];
}