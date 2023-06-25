export interface User {
    id?: number;
    email?: string;
    email_institu?: string;
    nom?: string;
    prenom?: string;
    nom_fr?: string;
    prenom_fr?: string;
    nom_ar?: string;
    prenom_ar?: string;
    cin?: string;
    tel?: string;
    photo?: string;
    genre?: string;
    cedoc_id?: number;
    ppr?: string;
    enseignant_grade?: string;
    enseignant_nbr_sujets?: number;
    enseignant_labo_id?: number;
    enseignant_etab_id?: number;
    enseignant_cedoc_id?: number;
    enseignant_fd_id?: number;
    labo?: Labo;
    etab?: Etab;
    cedoc?: Cedoc;
    fd?: Fd;
    date_naissance?: string;
    lieu_naissance_fr?: string;
    lieu_naissance_ar?: string;

    adresse_fr?: string;
    adresse_ar?: string;
    ville_fr?: string;
    ville_ar?: string;
    pays_fr?: string;
    pays_ar?: string;
    nationalite_fr?: string;
    nationalite_ar?: string;
    is_dir_labo?: boolean;
    is_dir_fd?: boolean;
    roles?: string[];
    permissions?: string[];
    specialites?: Specialite[];
    encourssujets?: Sujet[];
    encourscosujets?: Sujet[];
    created_at?: string;
    updated_at?: string;
}

export interface Sujet {
    id?: number;
    langue?: string;
    intitule_fr?: string;
    intitule_ar?: string;
    resume_fr?: string;
    resume_ar?: string;
    keywords_fr?: string;
    keywords_ar?: string;
    code_sujet?: string;
    statut?: number;
    document?: string;
    specialite_id?: number;
    fd_id?: number;
    directeur_id?: number;
    codirecteur_id?: number;
    codirecteur_type?: string;
    labo_id?: number;
    specialite?: Specialite;

    annee_universitaire?: string;
    directeur?: User;
    codirecteur?: User;

    candidats?: Doctorant[];
    is_externe_codirecteur?: boolean;
    is_cotutelle?: boolean;
    is_projet?: boolean;
    is_etudiant?: boolean;
    conv_projet?: any;
    conv_contutelle?: any;

    created_at?: string;
    updated_at?: string;
}

export interface ListItem {
    value?: number | string;
    label?: string;
}

export interface AnneeUniv {
    id?: number;
    annee_universitaire?: string;
    annee_debut?: number;
    annee_fin?: number;
    observation?: any;
    created_at?: string;
    updated_at?: string;
}

export interface Cedoc {
    id?: number;
    intitule?: string;
    nbr_sujets_PH?: string;
    nbr_sujets_PES?: string;
    encad_PA?: string;
    has_ecrit?: string;
    directeur_id?: number;
    created_at?: string;
    updated_at?: string;
    sujet_par_enseignant?: any;
    intitule_fr?: string;
    intitule_ar?: string;
}

export interface Etab {
    id?: number;
    code_etab?: string;
    intitule_fr?: string;
    intitule_ar?: string;
    acronyme?: string;
    logo?: number;
    ville?: string;
    photo?: string;
    adresse?: number;
    doyen_id?: number;
    type?: string;
    cedoc_id?: number;
    created_at?: string;
    updated_at?: string;
}

export interface Labo {
    id?: number;
    designation_labo_fr?: string;
    designation_labo_ar?: string;
    specialite_id?: number;
    acronyme?: string;
    domaine_id?: number;
    photo?: string;
    date_accreditation?: string;
    directeur_id?: number;
    etab_id?: number;
    created_at?: string;
    updated_at?: string;
}

export interface Query {
    page?: number;
    fd_id?: number;
    etab_id?: number;
    cedoc_id?: number;
    sp_id?: number;
    bourse_id?: number;
    statut_id?: number;
    reinscr_statut_id?: number;
    keyword_id?: number;
    encad_id?: number;
    coencad_id?: number;
    ex_coencad_id?: number;
    annee_uni?: any;
    not_annee_uni?: any;
    labo_id?: number;
    inscr_statut_id?: number;
    inscr_etape?: number;
    is_etudiant?: string;
    no_convoque?: boolean;
    no_result?: boolean;
    type?: string;
    keyword_text?: string;
    etat?: string;
    etat_dossier?: string;
    has_normal_bourse?: boolean;
    has_reinscri?: boolean;
    hasnt_reinscri?: boolean;
    enseignant_grade?: string;
}

export interface RendezVous {
    id?: number;
    objet?: string;
    dates?: dateRdv[];
    horaires?: horaireRdv[];
    statut?: number;
    id_doc?: number;
}

export interface dateRdv {
    date?: string;
    statut?: number;
}

export interface horaireRdv {
    heureDebut?: string;
    heureFin?: string;
    statut?: number;
}

//----------------------------------------------------

export interface Doctorant {
    id?: number;
    email?: string;
    email_institu?: string;
    nom_fr?: string;
    prenom_fr?: string;
    nom_ar?: string;
    prenom_ar?: string;
    cin?: string;
    cin_url?: any;
    tel?: string;
    photo?: string;
    genre?: string;
    is_handicape?: boolean;
    situation_matrimonial?: string;
    qr_id_url?: string;
    code_apogee?: number;
    massar_cne?: string;
    statut?: number;
    inscr_statut?: number;
    check_personal_info?: boolean;
    check_parcours?: boolean;
    check_exp?: boolean;
    check_sujet?: boolean;
    check_register?: boolean;
    reinscr_statut?: number;
    inscr_date?: any;
    attestation_emploi?: string;
    etat?: string;
    etat_url?: string;
    note_oral?: number;
    note_bourse?: any;
    note_selection?: any;
    note_sps?: any;
    etat_dossier?: boolean;
    session?: any;
    bourse?: Bourse;
    dossiers?: any[];
    bac?: any;
    parcours?: any[];
    labo?: Labo;
    cedoc?: Cedoc;
    etab?: Etab;
    sujet?: Sujet;
    fd?: Fd;
    date_naissance?: string;
    adresse_fr?: string;
    adresse_ar?: string;
    ville_naissance?: Ville;
    autre_lieu_naissance_fr?: any;
    autre_lieu_naissance_ar?: any;
    ville?: Ville;
    autre_ville_fr?: any;
    autre_ville_ar?: any;
    pays?: Pays;
    autre_pays_fr?: any;
    autre_pays_ar?: any;
    nationalite?: Pays;
    autre_nationalite_fr?: any;
    autre_nationalite_ar?: any;
    is_reinsc_date?: boolean;
    reinsc?: Reinsc;
    reinscs?: Reinsc[];
    articles?: any[];
    communications?: Communication[];
    brevets?: Brevet[];
    fts?: Ft[];
    obs?: any[];
    logs?: any[];
    created_at?: string;
    updated_at?: string;
}

export interface Bourse {
    id?: number;
    intitule?: string;
}

export interface Specialite {
    id?: number;
    specialite_fr?: string;
    specialite_ar?: any;
    intitule?: string;
}

export interface Fd {
    id?: number;
    intitule_formation_fr?: string;
    intitule_formation_ar?: string;
    description?: any;
}

export interface Ville {
    id?: number;
    intitule_fr?: string;
    intitule_ar?: string;
    region_id?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export interface Pays {
    id?: number;
    intitule_fr?: string;
    intitule_ar?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export interface Reinsc {
    id?: number;
    date_soutenance?: string;
    financement?: string;
    rapport?: string;
    rapport_pdf?: any;
    rapport_url?: any;
    dero_motif?: string;
    dero_pdf?: any;
    dero_url?: any;
    anneeUniv?: AnneeUniv;
    nbr_annee?: number;
    nbr_annee_text?: string;
    statut?: number;
    etat?: any;
    attestation_emploi?: any;
    observation?: any;
}

export interface Communication {
    id?: number;
    titre?: string;
    doi?: any;
    resume?: string;
    preceding?: string;
    attestation?: string;
    att_url?: string;
    statut?: string;
    paper_type?: string;
    nbr_heures?: any;
    date_publication?: any;
    date_presentation?: string;
    premiere_page?: any;
    derniere_page?: any;
    is_indexe?: boolean;
    base_indexation?: any;
    link?: any;
    paper?: string;
    paper_url?: string;
    auteurs?: Auteur[];
}

export interface Auteur {
    id?: number;
    nom_fr?: string;
    prenom_fr?: string;
    genre?: string;
    email?: string;
    tel?: string;
    auteur_ordre?: number;
    user_type?: string;
    photo?: string;
}

export interface Brevet {
    id?: number;
    titre?: string;
    code?: string;
    date_depot?: string;
    titre_projet?: string;
    statut?: string;
    auteurs?: any[];
}

export interface Ft {
    id?: number;
    intitule?: string;
    type?: string;
    participation_type?: string;
    presentation_type?: string;
    pfe_type?: string;
    sp?: specialite;
    vacation_type?: string;
    vacation_cat?: string;
    module?: any;
    vacation_niveau?: string;
    certified?: boolean;
    presentiel?: boolean;
    attestation?: string;
    date_debut?: string;
    date_fin?: string;
    duree?: number;
    prix?: number;
    autre_pays?: any;
    autre_specialite?: any;
    att_url?: string;
    lieu?: string;
    formateur_type?: string;
    coordonnateur_type?: string;
    responsable_type?: string;
    formateur_extern?: FormateurExtern;
}

export interface FormateurExtern {
    formateur_nom_fr?: string;
    formateur_prenom_fr?: string;
    formateur_email?: string;
    formateur_tel?: any;
}
export interface specialite {
    id?: number;
    label?: string;
}
