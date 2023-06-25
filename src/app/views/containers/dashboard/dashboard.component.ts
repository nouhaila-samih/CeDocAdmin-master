import {  R_DIR_PEDOC, R_DIR_CEDOC, R_ADMIN_CEDOC, R_ADMIN_PEDOC } from './../../../utilities/constants/index';
import { LocalStorageService } from './../../../utilities/services/local-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    isDirPedoc = false;
    isDirCedoc = false;
    isAdminPedoc = false;
    isAdminCedoc = false;
    constructor(private lss: LocalStorageService) { }

    ngOnInit(): void {
        //this.isDirPedoc = this.lss.hasRole(R_DIR_PEDOC);
       // this.isDirCedoc = this.lss.hasRole(R_DIR_CEDOC);
        this.isAdminCedoc = this.lss.hasRole(R_ADMIN_CEDOC);
        this.isAdminPedoc = this.lss.hasRole(R_ADMIN_PEDOC);
    }

}
