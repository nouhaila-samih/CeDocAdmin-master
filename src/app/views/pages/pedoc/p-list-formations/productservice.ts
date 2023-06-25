import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Formation } from './formation';
import {Session} from './formation';
import {ListItem} from '../../../../utilities/models';

@Injectable()
export class ProductServiceP {


    constructor(private http: HttpClient) { }



    getProducts() {
        return this.http.get<any>('./../../../assets/products.json')
            .toPromise()
            .then(res => <Formation[]>res.data)
            .then(data => { return data; });
    }

    /*getDiscipline() {
        return this.http.get<any>('http://127.0.0.1:8000/api/FD')
            .toPromise()
            .then(res => <ListItem[]>res.intitule_formation_fr)
            .then(intitule_formation_fr => { return intitule_formation_fr; });
    }*/

    getFormation() {
        return this.http.get<any>('http://127.0.0.1:8000/api/FormationInternes')
            .toPromise()
            .then(res => <Formation[]>res.formation)
            .then(formation => { return formation; });
    }





}
