import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ListItem, Query} from '../../../utilities/models';
import local from '../../../utilities/constants/local';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {LocalStorageService} from '../../../utilities/services/local-storage.service';

@Component({
  selector: 'app-sujet-filter',
  templateUrl: './sujet-filter.component.html',
  styleUrls: ['./sujet-filter.component.css']
})
export class SujetFilterComponent implements OnInit {


    filterForm: FormGroup;

    statuses: ListItem[] = [];
    bourses: ListItem[] = [];
    inscr_status: ListItem[] = [];
    inscr_etpes: ListItem[] = [];
    reinscr_statuses: ListItem[] = [];

    fds: ListItem[] = [];
    labos: ListItem[] = [];

    profs: ListItem[] = [];
    profs2: ListItem[] = [];
    profs3: ListItem[] = [];
    ex_coencad: ListItem[] = [];
    ex_coencad2: ListItem[] = [];
    annneeUnis: ListItem[] = [];
    cedocs: ListItem[] = [];

    lang = local();
    filterLoading = false;
    showEtatDossier = false;
    showEtatEmploye = false;
    showInscrEtap = false;
    showInscrStatus = false;
    showReinStatuts = false;
    showBourse = false;
    showExport = false;
    showNoConvoque = false;
    showNoResult= false;

    etatEmployeOptions: any[];
    etatDossierOptions: any[];
    etapInscriptionOptions: any[];


    query: Query = {};

    constructor(public ref: DynamicDialogRef,
                private lss: LocalStorageService,
                public config: DynamicDialogConfig) { }

    ngOnInit() {
        //id: this.config.id


        if (this.config.data.fds) {
            this.fds = this.config.data.fds;
        }
        if (this.config.data.labos) {
            this.labos = this.config.data.labos;
        }
        if (this.config.data.cedocs && this.lss.isPedocAdmin()) {
            this.cedocs = this.config.data.cedocs;
        }

        if (this.config.data.statuses) {
            this.statuses = this.config.data.statuses;
        }

        if (this.config.data.showNoConvoque) {
            this.showNoConvoque = this.config.data.showNoConvoque;
        }

        if (this.config.data.showNoResult) {
            this.showNoResult = this.config.data.showNoResult;
        }


        if (this.config.data.profs) {
            this.profs = this.config.data.profs;
            this.profs2 = this.config.data.profs;
            this.profs3 = this.config.data.profs;
        }

        const ob = {
            value: null,
            label: null
        };
        this.filterForm = new FormGroup({
            fd: new FormControl(ob),
            encad: new FormControl(ob),
            labo: new FormControl(ob),
            cedoc: new FormControl(ob),
            keyword_text: new FormControl(null),
            no_convoque: new FormControl(false),
            no_result: new FormControl(false),
            statut: new FormControl(ob),

        });

    }

    filtrer() {


        if (this.filterForm.value.labo.value) {
            this.query.labo_id = this.filterForm.value.labo.value;
        }

        if (this.filterForm.value.fd.value) {
            this.query.fd_id = this.filterForm.value.fd.value;
        }
        if (this.filterForm.value.cedoc.value) {
            this.query.cedoc_id = this.filterForm.value.cedoc.value;
        }



        if (this.filterForm.value.statut.value || this.filterForm.value.statut.value === 0) {
            this.query.statut_id = this.filterForm.value.statut.value;
        }




        if (this.filterForm.value.keyword_text) {
            this.query.keyword_text = this.filterForm.value.keyword_text;
        }

        if (this.filterForm.value.no_result) {
            this.query.no_result = this.filterForm.value.no_result;
        }

        if (this.filterForm.value.no_convoque) {
            this.query.no_convoque = this.filterForm.value.no_convoque;
        }


        if (this.filterForm.value.encad.value) {
            this.query.encad_id = this.filterForm.value.encad.value;
        }



        if (this.filterForm.value.etat) {

            this.query.etat = this.filterForm.value.etat;
        }
        this.ref.close(this.query);

    }

    claire(){

        this.ref.close({});

    }


    search(event, choix) {




        if (choix === 'coencad') {

            this.profs2 = this.profs3.filter(
                (fd) =>
                    fd.label.toLowerCase().search(event.query.toLowerCase()) > -1
            );
            return;
        }
        if (choix === 'encad') {

            this.profs = this.profs3.filter(
                (fd) =>
                    fd.label.toLowerCase().search(event.query.toLowerCase()) > -1
            );
            return;
        }


    }

}
