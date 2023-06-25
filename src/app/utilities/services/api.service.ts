import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Formation} from '../../views/pages/pedoc/p-list-formations/formation';

@Injectable({
    providedIn: "root",
})
export class ApiService {
    constructor(private http: HttpClient) {}

    getOptionsData(query: any) {

        return this.http.get<any>(

                `${environment.api_url}/getOptionsData`
            , { params:  query });
    }



    executeDecision(
        data: any,
        decision
    ) {
        return this.http.post<any>(
            `${environment.api_url}/administration/bourses/executeDecision/${decision}`, data
        );
    }

    getFormateur() {
        return this.http.get<any>('http://127.0.0.1:8000/api/admin/pedoc/getFormateur')
    }

    sendF(formation:Formation) {
        return this.http.post<any>('http://127.0.0.1:8000/api/admin/pedoc/sendF', {formation})
    }
    gererD(id : number , etat:string) {
        return this.http.post<any>('http://127.0.0.1:8000/api/admin/pedoc/gerD', {id,etat})
    }
    acceptTous(id:number) {
        console.log("2",id)
        return this.http.put<any>(`http://127.0.0.1:8000/api/admin/pedoc/accAll/${id}`,id)
    }

    setBourse(data: any, idDoc, statut, choix = 'pedoc') {
        return this.http.post<any>(
            choix === 'pedoc' ?
                `${environment.api_url}/admin/pedoc/bourses/setBourse/${idDoc}/${statut}` :
                `${environment.api_url}/admin/bourses/setBourse/${idDoc}/${statut}`, data
        );
    }


    setInscEtape(
        data: any,
        idDoc,
        statut,
        choix = 'pedoc'
    ) {
        return this.http.post<any>(
            choix === 'pedoc' ?
                `${environment.api_url}/admin/pedoc/doctorants/setInscEtape/${idDoc}/${statut}` :
                `${environment.api_url}/admin/doctorants/setInscEtape/${idDoc}/${statut}`, data
        );
    }
    setInscStatut(
        data: any,
        idDoc,
        statut,
        choix = 'pedoc'
    ) {
        return this.http.post<any>(
            choix === 'pedoc' ?
                `${environment.api_url}/admin/pedoc/doctorants/setInscStatut/${idDoc}/${statut}` :
                `${environment.api_url}/admin/doctorants/setInscStatut/${idDoc}/${statut}`, data
        );
    }










    setLog(data: any, idDoc, statut, choix = "pedoc") {
        return this.http.post<any>(
            choix === "pedoc"
                ? `${environment.api_url}/admin/pedoc/doctorants/setLog/${idDoc}/${statut}`
                : `${environment.api_url}/admin/doctorants/setLog/${idDoc}/${statut}`,
            data
        );
    }

    setStatut(data: any, idDoc, statut, choix = "pedoc") {
        return this.http.post<any>(
            choix === "pedoc"
                ? `${environment.api_url}/admin/pedoc/doctorants/setStatut/${idDoc}/${statut}`
                : `${environment.api_url}/admin/doctorants/setStatut/${idDoc}/${statut}`,
            data
        );
    }
    setReinsStatut(data: any, idDoc, statut, choix = "pedoc") {
        return this.http.post<any>(
            choix === "pedoc"
                ? `${environment.api_url}/admin/pedoc/doctorants/setReinsStatut/${idDoc}/${statut}`
                : `${environment.api_url}/admin/doctorants/setReinsStatut/${idDoc}/${statut}`,
            data
        );
    }

    setAdmis(data: any, idDoc, statut, choix = "pedoc") {
        return this.http.post<any>(
            choix === "pedoc"
                ? `${environment.api_url}/admin/pedoc/doctorants/setAdmis/${idDoc}/${statut}`
                : `${environment.api_url}/admin/doctorants/setAdmis/${idDoc}/${statut}`,
            data
        );
    }

    addDossier(data: any, idDoc, choix = "pedoc") {
        return this.http.post<any>(
            choix === "pedoc"
                ? `${environment.api_url}/admin/pedoc/doctorants/dossiers/${idDoc}`
                : `${environment.api_url}/admin/doctorants/dossiers/${idDoc}`,
            data
        );
    }
    confirmeAllPreinsc(choix = "pedoc") {
        return this.http.put<any>(
            choix === "pedoc"
                ? `${environment.api_url}/admin/pedoc/doctorants/confirmeAllPreinsc`
                : `${environment.api_url}/admin/doctorants/confirmeAllPreinsc`,
            {}
        );
    }
    changePreinsc(id, data: any, choix = "pedoc") {
        return this.http.put<any>(
            choix === "pedoc"
                ? `${environment.api_url}/admin/pedoc/doctorants/changePreinsc/${id}`
                : `${environment.api_url}/admin/doctorants/changePreinsc/${id}`,
            data
        );
    }

    getReinscritBoursier(query: any, choix = "pedoc") {
        return this.http.get<any>(
            choix === "pedoc"
                ? `${environment.api_url}/admin/pedoc/bourses/getReinscritBoursier`
                : `${environment.api_url}/admin/bourses/getReinscritBoursier`,
            {
                params: {
                    ...query,
                    etatPro: 1,
                    reinscrStatut: 1,
                    etatDossier: 1,
                    globalStatut: 1,
                },
            }
        );
    }

    getNouveauBoursier(choix = "pedoc") {
        return this.http.get<any>(
            choix === "pedoc"
                ? `${environment.api_url}/admin/pedoc/bourses/getNouveau?noteBourse=1`
                : `${environment.api_url}/admin/bourses/getNouveau?noteBourse=1`
        );
    }


    getDemandes(query: any,choix = "pedoc") {
        return this.http.get<any>(
            choix === "pedoc"
                ? `${environment.api_url}/admin/pedoc/doctorants/demandes`
                : `${environment.api_url}/admin/doctorants/demandes`,
                {
                    params: {
                        ...query
                    },
                }
        );
    }

    changeDemandeStatus(id, statut, observation, choix = "pedoc") {

        return this.http.put<any>(
            choix === "pedoc"
                ? `${environment.api_url}/admin/pedoc/doctorants/changeDemandeStatus/${id}/${statut}`
                : `${environment.api_url}/admin/doctorants/changeDemandeStatus/${id}/${statut}`,  { observation }
        );


    }

    getFullDoc(id: number, choix = "pedoc") {
        return this.http.get<any>(
            choix === "pedoc"
                ? `${environment.api_url}/admin/pedoc/doctorants/getFullDoc/${id}`
                : `${environment.api_url}/admin/doctorants/getFullDoc/${id}`
        );
    }

    getDocs(query: any, choix = "pedoc") {
        return this.http.get<any>(
            choix === "pedoc"
                ? `${environment.api_url}/admin/pedoc/doctorants`
                : `${environment.api_url}/admin/doctorants`,
            {
                params: {
                    ...query,
                    inscrEtape: 1,
                    etatDossier: 1,
                    globalStatut: 1,
                    inscrStatut: 1,
                },
            }
        );
    }
    getReinsc(query: any, choix = "pedoc") {
        return this.http.get<any>(
            choix === "pedoc"
                ? `${environment.api_url}/admin/pedoc/doctorants/getReinsc`
                : `${environment.api_url}/admin/doctorants/getReinsc`,
            {
                params: {
                    ...query,
                    reinscrStatut: 1,
                    etatDossier: 1,
                    globalStatut: 1,
                },
            }
        );
    }
    getNotReinsc(query: any, choix = "pedoc") {
        return this.http.get<any>(
            choix === "pedoc"
                ? `${environment.api_url}/admin/pedoc/doctorants/getNotReinsc`
                : `${environment.api_url}/admin/doctorants/getNotReinsc`,
            {
                params: {
                    ...query,
                    reinscrStatut: 1,
                    etatDossier: 1,
                    globalStatut: 1,
                },
            }
        );
    }
    getEncours(query: any, choix = "pedoc") {
        return this.http.get<any>(
            choix === "pedoc"
                ? `${environment.api_url}/admin/pedoc/doctorants/getEncours`
                : `${environment.api_url}/admin/doctorants/getEncours`,
            {
                params: {
                    ...query,
                    reinscrStatut: 1,
                    etatDossier: 1,
                    globalStatut: 1,
                },
            }
        );
    }
    getSoutenu(query: any, choix = "pedoc") {
        return this.http.get<any>(
            choix === "pedoc"
                ? `${environment.api_url}/admin/pedoc/doctorants/getSoutenu`
                : `${environment.api_url}/admin/doctorants/getSoutenu`,
            { params: { ...query, globalStatut: 1 } }
        );
    }
    getInsc(query: any, choix = "pedoc") {
        return this.http.get<any>(
            choix === "pedoc"
                ? `${environment.api_url}/admin/pedoc/doctorants/getInsc`
                : `${environment.api_url}/admin/doctorants/getInsc`,
            {
                params: {
                    ...query,
                    inscrEtape: 1,
                    etatDossier: 1,
                    globalStatut: 1,
                    inscrStatut: 1,
                },
            }
        );
    }
    getPreinsc(query: any, choix = "pedoc") {
        return this.http.get<any>(
            choix === "pedoc"
                ? `${environment.api_url}/admin/pedoc/doctorants/getPreinsc`
                : `${environment.api_url}/admin/doctorants/getPreinsc`,
            {
                params: {
                    ...query,
                    inscrEtape: 1,
                    etatDossier: 1,
                    globalStatut: 1,
                    inscrStatut: 1,
                },
            }
        );
    }
    getSps(choix = "pedoc") {
        return this.http.get<any>(
            choix === "pedoc"
                ? `${environment.api_url}/admin/pedoc/getSps`
                : `${environment.api_url}/admin/getSps`
        );
    }

    getPedocData(query: any) {
        const params = new HttpParams({
            fromObject: query,
        });

        return this.http.get<any>(
            `${environment.api_url}/admin/pedoc/getPedocData`,
            { params: query }
        );
    }

    getCedocData(query: any) {
        return this.http.get<any>(`${environment.api_url}/admin/getCedocData`, {
            params: query,
        });
    }

    changeConfigCedoc(
        nbr_sujets_ph,
        nbr_sujets_pes,
        nbr_coencad_pa,
        encad_pa,
        has_ecrit
    ) {
        return this.http.put<any>(
            `${environment.api_url}/admin/changeConfigCedoc`,
            {
                nbr_sujets_ph,
                nbr_sujets_pes,
                nbr_coencad_pa,
                encad_pa,
                has_ecrit,
            }
        );
    }
    changeReinscriptionDate(date_debut, date_fin) {
        return this.http.put<any>(
            `${environment.api_url}/admin/pedoc/changeReinscriptionDate`,
            { date_debut, date_fin }
        );
    }
    changePropositionDate(date_debut_proposition, date_fin_proposition) {
        return this.http.put<any>(
            `${environment.api_url}/admin/pedoc/changePropositionDate`,
            { date_debut_proposition, date_fin_proposition }
        );
    }
    changeInscriptionDate(date_debut_inscription, date_fin_inscription) {
        return this.http.put<any>(
            `${environment.api_url}/admin/pedoc/changeInscriptionDate`,
            { date_debut_inscription, date_fin_inscription }
        );
    }
    changePercent(percent) {
        return this.http.put<any>(
            `${environment.api_url}/admin/pedoc/changePercent`,
            { percent }
        );
    }
    getConfigData() {
        return this.http.get<any>(`${environment.api_url}/admin/getConfigData`);
    }
    getPedocDashData() {
        return this.http.get<any>(
            `${environment.api_url}/admin/pedoc/getPedocDashData`
        );
    }
    getCedocDashData() {
        return this.http.get<any>(
            `${environment.api_url}/admin/getCedocDashData`
        );
    }

    getSujetsAttente(query, level = "pedoc") {
        if (level === "pedoc") {
            return this.http.get<any>(
                `${environment.api_url}/admin/pedoc/sujets/getSujetAttente`,
                { params: query }
            );
        }
        return this.http.get<any>(
            `${environment.api_url}/admin/sujets/getSujetAttente`,
            { params: query }
        );
    }
    getSujets(query, level = "pedoc") {
        if (level === "pedoc") {
            return this.http.get<any>(
                `${environment.api_url}/admin/pedoc/sujets/getSujets`,
                { params: query }
            );
        }
        return this.http.get<any>(
            `${environment.api_url}/admin/sujets/getSujets`,
            { params: query }
        );
    }
    getAttentSujetsPeDoc(query) {
        return this.http.get<any>(
            `${environment.api_url}/pedoc/sujets/getSujetAttente`,
            { params: query }
        );
    }
    changeStatut(sujet_id, statut, observation, level = "pedoc") {
        if (level === "pedoc") {
            return this.http.put<any>(
                `${environment.api_url}/admin/pedoc/sujets/changeStatut/${sujet_id}/${statut}`,
                { observation }
            );
        }
        return this.http.put<any>(
            `${environment.api_url}/admin/sujets/changeStatut/${sujet_id}/${statut}`,
            { observation }
        );
    }

    getAdminsTutorials() {
        return this.http.get<any>(
            `${environment.api_url}/enseignants/getAdminsTutorials`
        );
    }

    sendResetPasswordLink(email) {
        return this.http.post<any>(
            `${environment.api_url}/auth/sendProfsPasswordResetEmail`,
            { email }
        );
    }
    passwordResetProcess(data) {
        return this.http.post<any>(
            `${environment.api_url}/auth/passwordResetProcess`,
            data
        );
    }

    ficheEncad() {
        return this.http.get<any>(
            `${environment.api_url}/enseignants/ficheEncad`
        );
    }
    addSujet(data: any) {
        return this.http.post<any>(
            `${environment.api_url}/enseignants/sujets`,
            data
        );
    }
    updateSujet(data: any, id) {
        return this.http.post<any>(
            `${environment.api_url}/enseignants/sujets/${id}`,
            data
        );
    }
    addOg(name, email, site, national) {
        return this.http.post<any>(`${environment.api_url}/orgas/addOg`, {
            name,
            email,
            site,
            national,
        });
    }
    addEtab(etab_name, etab_email, etab_site, etab_national) {
        return this.http.post<any>(`${environment.api_url}/orgas/addEtab`, {
            etab_name,
            etab_email,
            etab_site,
            etab_national,
        });
    }
    getDataForUpdateSujet(id) {
        return this.http.get<any>(
            `${environment.api_url}/enseignants/sujets/getDataForUpdateSujet/${id}`
        );
    }
    getDataForAddSujet() {
        return this.http.get<any>(
            `${environment.api_url}/enseignants/sujets/getDataForAddSujet`
        );
    }
    getFullLaboInfo() {
        return this.http.get<any>(
            `${environment.api_url}/enseignants/laboratoires/getFullLaboInfo`
        );
    }
    publicProfile(id) {
        return this.http.get<any>(
            `${environment.api_url}/enseignants/publicProfile/${id}`
        );
    }

    public deleteSujet(id) {
        return this.http.delete<any>(
            `${environment.api_url}/enseignants/sujets/${id}`
        );
    }
    public getMySujetsFd() {
        return this.http.get<any>(
            `${environment.api_url}/enseignants/sujets/getMySujetsFd`
        );
    }
    public getMySujetsLabo() {
        return this.http.get<any>(
            `${environment.api_url}/enseignants/sujets/getMySujetsLabo`
        );
    }
    public getMySujetsCeDoc() {
        return this.http.get<any>(
            `${environment.api_url}/enseignants/sujets/getMySujetsCeDoc`
        );
    }
    public getSujetAttente() {
        return this.http.get<any>(
            `${environment.api_url}/enseignants/sujets/getSujetAttente`
        );
    }
    public getMySujets() {
        return this.http.get<any>(
            `${environment.api_url}/enseignants/sujets/getMySujets`
        );
    }
    changePDF(data: any) {
        return this.http.post<any>(
            `${environment.api_url}/users/changePDF`,
            data
        );
    }
    changePassword(data: any) {
        return this.http.put<any>(
            `${environment.api_url}/users/changePassword`,
            data
        );
    }
    updateProfile(data: any) {
        return this.http.put<any>(
            `${environment.api_url}/enseignants/updateProfile`,
            data
        );
    }
    me() {
        return this.http.get<any>(`${environment.api_url}/admin/me`);
    }

    login(cin: string, password: string) {
        return this.http.post<any>(`${environment.api_url}/auth/adminLogin`, {
            cin,
            password,
        });
    }

    /************************* //* 12-06-2022 */ /*******************************************************/
    //Pedoc Rdvs methods
    /************************* */

    public getListeRendezvousPedoc(query) {
        return this.http.get<any>(
            `${environment.api_url}/admin/pedoc/getRendezVous`,
            { params: query }
        );
    }

    public getListeRendezvousFiltrePedoc(query, statut: number) {
        return this.http.get<any>(
            `${environment.api_url}/admin/pedoc/getListRendezVousFiltre/${statut}`,
            { params: query }
        );
    }

    public getEvenementsPedoc() {
        return this.http.get<any>(
            `${environment.api_url}/admin/pedoc/getEvents`
        );
    }

    //Cedoc Rdvs methods
    /************************* */

    public getListRendezVousCedoc(query) {
        return this.http.get<any>(
            `${environment.api_url}/admin/getCedocRendezVous`,
            { params: query }
        );
    }

    public getListeRendezvousFiltreCedoc(query, statut: number) {
        return this.http.get<any>(
            `${environment.api_url}/admin/getListRendezVousCedocFiltre/${statut}`,
            { params: query }
        );
    }

    public getEvenementsCedoc() {
        return this.http.get<any>(
            `${environment.api_url}/admin/getCedocEvents`
        );
    }

    //Cedoc and Pedoc Rdvs methods
    /************************* */

    public validerRendezVous(idRdv: number) {
        return this.http.get<any>(
            `${environment.api_url}/admin/validerRendezVous/${idRdv}`
        );
    }

    public reprogrammerRendezVous(idRdv: number, data: any) {
        return this.http.put<any>(
            `${environment.api_url}/admin/reprogrammerRendezVous`,
            {
                idRdv,
                data,
            }
        );
    }
}
