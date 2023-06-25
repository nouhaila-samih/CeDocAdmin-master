import { LocalStorageService } from "./local-storage.service";
import { ApiService } from "./api.service";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: "root",
})
export class DocsService {
    constructor(
        private http: HttpClient,
        private router: Router,
        private api: ApiService,
        private lss: LocalStorageService
    ) {}

    changePDF(file: any, id) {
        const formData = new FormData();

        // Store form name as "file" with file data
        formData.append("photo", file, file.name);

        return this.http.post<any>(
            `${environment.api_url}/administration/doctorants/changePDF/${id}`,
            formData
        );
    }

    putSujetProfile(data: any, id, type) {
        return this.http.post<any>(
            `${environment.api_url}/administration/doctorants/putSujetProfile/${id}/${type}`,
            data
        );
    }
    putPwd(data: any, id) {
        return this.http.post<any>(
            `${environment.api_url}/administration/doctorants/putPwd/${id}`,
            data
        );
    }

    putProfile(data: any, id) {
        return this.http.post<any>(
            `${environment.api_url}/administration/doctorants/putProfile/${id}`,
            data
        );
    }

    setLog(data: any, id, statut) {
        return this.http.post<any>(
            `${environment.api_url}/administration/doctorants/setLog/${id}/${statut}`,
            data
        );
    }

    setBourse(data: any, id, statut) {
        return this.http.post<any>(
            `${environment.api_url}/administration/bourses/setBourse/${id}/${statut}`,
            data
        );
    }

    statistiquesPreinscription() {
        return this.http.get<any>(
            `${environment.api_url}/administration/doctorants/statistiquesPreinscription`
        );
    }

    setAdmisDossier(data, id: number) {
        return this.http.post<any>(
            `${environment.api_url}/administration/doctorants/setAdmisDossier/${id}`,
            data
        );
    }

    setDossier(data, id: number) {
        return this.http.post<any>(
            `${environment.api_url}/administration/doctorants/setDossier/${id}`,
            data
        );
    }
    setOralNote(data, id: number) {
        return this.http.post<any>(
            `${environment.api_url}/administration/doctorants/setOralNote/${id}`,
            data
        );
    }
    changeStatus(data, id: number, statut: number) {
        return this.http.post<any>(
            `${environment.api_url}/administration/doctorants/changeStatus/${id}/${statut}`,
            data
        );
    }

    changeInscriptionStatus(data, id: number, statut: number) {
        return this.http.post<any>(
            `${environment.api_url}/administration/doctorants/changeInscriptionStatus/${id}/${statut}`,
            data
        );
    }
    confirmAll() {
        return this.http.get<any>(
            `${environment.api_url}/administration/doctorants/confirmAllPreinscriptions`
        );
    }

    getDoc(id: number, options: any = {}) {
        return this.http.get<any>(
            `${environment.api_url}/administration/doctorants/getDoc/${id}`,
            {
                params: {
                    ...options,
                },
            }
        );
    }
    getPreinscriptions(query: any, options: any) {
        return this.http.get<any>(
            `${environment.api_url}/administration/doctorants/getPreinscriptions`,
            {
                params: {
                    ...query,
                    ...options,
                },
            }
        );
    }

    getDocs(query: any, options: any = {}) {
        return this.http.get<any>(
            `${environment.api_url}/administration/doctorants/getDocs`,
            {
                params: {
                    ...query,
                    ...options,
                },
            }
        );
    }
    getDocLivret(id: number, options: any = {}) {
        return this.http.get<any>(
            `${environment.api_url}/administration/livret/getDocLivret/${id}`,
            {
                params: {
                    ...options,
                },
            }
        );
    }
    changeForm(ID: number, docID: number, duree: number, st: number) {
        return this.http.get<any>(
            `${environment.api_url}/administration/livret/validerFormation/${ID}/${docID}/${duree}/${st}`,
            {}
        );
    }
    changeFt(ID: number, duree: number, st: number) {
        return this.http.get<any>(
            `${environment.api_url}/administration/livret/validerFt/${ID}/${duree}/${st}`,
            {}
        );
    }
    changeArt(ID: number, st: number) {
        return this.http.get<any>(
            `${environment.api_url}/administration/livret/validerArticle/${ID}/${st}`,
            {}
        );
    }
    changeProc(ID: number, duree: number, st: number) {
        return this.http.get<any>(
            `${environment.api_url}/administration/livret/validerCmx/${ID}/${duree}/${st}`,
            {}
        );
    }
    changeBrv(ID: number, st: number) {
        return this.http.get<any>(
            `${environment.api_url}/administration/livret/validerBrevet/${ID}/${st}`,
            {}
        );
    }
    changeLivret(docID: number, st: number, duree:number) {
        return this.http.get<any>(
            `${environment.api_url}/administration/livret/valider/${docID}/${st}/${duree}`,
            {}
        );
    }
    
    exporterDocs(query: any, exportedData: any = {}, isLoading: any) {
        return this.http
            .get<any>(
                `${environment.api_url}/administration/doctorants/exporterDocs`,
                {
                    responseType: "blob" as "json",
                    params: {
                        ...query,
                        ...exportedData,
                    },
                }
            )
            .subscribe(
                (res) => {
                    console.log(res);
                    let dataType = res.type;
                    let binaryData = [];
                    binaryData.push(res);
                    let downloadLink = document.createElement("a");
                    downloadLink.href = window.URL.createObjectURL(
                        new Blob(binaryData, { type: dataType })
                    );

                    downloadLink.setAttribute(
                        "download",
                        "Doctorants Export.xlsx"
                    );
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    isLoading.isExporting = false;
                },
                (err) => {
                    console.log(err);
                    // this.apps.showErrorMessages(err, this.messageService);
                    isLoading.isExporting = false;
                }
            );
    }

    isOld(statut) {
        return statut == 0 || statut == 1 || statut == 2 || statut == 15;
    }
}
