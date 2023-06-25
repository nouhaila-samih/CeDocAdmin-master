import {ListItem, User} from '../../../../utilities/models';
import {Time} from '@angular/common';



export interface Demande {
    id?:number
    etat?:string
    id_formation?:number
    doctorant?:any
}
export interface Session {
        id?:number
        intitule?:string
        mode?:string
        lieu?:string
        lien?:string
        nombre_places?:number
        nombreHeureSession?:number
        date?:Date
        heure_debut?:string
        heure_fin?:string
        id_formation?:number

}

export interface Formation {
    id?:number;
    titre?:string;
    formateur?:string | number
    description?:string;
    nombre_heures?:number
    image?:string;
    type?:string|number;
    etat?:string;
    participation?:string
    discipline?:any[]
    niveau?:any[]
    date_debut?:Date
    date_fin?:Date
    session_formations?:Session[]
    demandes?:Demande[]
}


export interface Requette {
    titre?:string
    formateur?: string
    participation?:string
    discipline?:any[]
    niveau?:any[]
    type?:string[]
}
