import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ApiService} from './api.service';
import {LocalStorageService} from './local-storage.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnseignantsService {

    constructor(
        private http: HttpClient,
        private router: Router,
        private api: ApiService,
        private lss: LocalStorageService
    ) {}

    putSujetProfile(data: any, id, type) {
        return this.http.post<any>(`${environment.api_url}/administration/enseignants/putCedocProfile/${id}/${type}`,
            data
        );
    }

    create(data: any) {
        return this.http.post<any>(`${environment.api_url}/administration/enseignants/create`,
            data
        );
    }

    putProfile(data: any, id) {
        return this.http.post<any>(`${environment.api_url}/administration/enseignants/putProfile/${id}`,
            data
        );
    }


    putPwd(data: any, id) {
        return this.http.post<any>(`${environment.api_url}/administration/enseignants/putPwd/${id}`,
            data
        );
    }

    changePDP(file: any, id) {
        const formData = new FormData();

        // Store form name as "file" with file data
        formData.append("photo", file, file.name);

        return this.http.post<any>(
            `${environment.api_url}/administration/enseignants/changePDP/${id}`,
            formData
        );

    }

    getEns(id : number,options: any = {}) {
        return this.http.get<any>( `${environment.api_url}/administration/enseignants/getEns/${id}`,
            {
                params: {
                    ...options,
                },
            }
        );
    }

    delete(id : number) {
        return this.http.delete<any>( `${environment.api_url}/administration/enseignants/delete/${id}` );
    }


    getEnss(query: any,options: any = {}) {
        return this.http.get<any>( `${environment.api_url}/administration/enseignants/getEns`,
            {
                params: {
                    ...query,
                    ...options,
                },
            }
        );
    }
}
