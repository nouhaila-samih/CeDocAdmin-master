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
export class SujetsService {
    constructor(
        private http: HttpClient,
        private router: Router,
        private api: ApiService,
        private lss: LocalStorageService
    ) {}

    changeInscriptionStatus(data, id : number, statut: number) {
        return this.http.post<any>
        ( `${environment.api_url}/administration/doctorants/changeInscriptionStatus/${id}/${statut}`, data
        );
    }
    getDoc(id : number) {
        return this.http.get<any>( `${environment.api_url}/administration/doctorants/getDoc/${id}`

        );
    }

    getSujets(query: any,options: any = {}) {
        return this.http.get<any>( `${environment.api_url}/administration/sujets/getSujets`,
            {
                params: {
                    ...query,
                    ...options,
                },
            }
        );
    }


}
