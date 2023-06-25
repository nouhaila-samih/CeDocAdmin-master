import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ListItem, Query } from 'src/app/utilities/models';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import local from 'src/app/utilities/constants/local';
import {LocalStorageService} from '../../../utilities/services/local-storage.service';

@Component({
  selector: 'app-doc-filter',
  templateUrl: './doc-filter.component.html',
  styleUrls: ['./doc-filter.component.css']
})

export class DocFilterComponent implements OnInit {

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
    annees_unis: ListItem[] = [];
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

    etatEmployeOptions: any[];
    etatDossierOptions: any[];
    etapInscriptionOptions: any[];


    query: Query = {};

    constructor(public ref: DynamicDialogRef,
                private lss: LocalStorageService,
                public config: DynamicDialogConfig) { }

    ngOnInit() {
        //id: this.config.id


        this.etatDossierOptions = [{ label: this.lang.doc_statut_dossier_nc, value: 'no' },
        { label: this.lang.doc_statut_dossier_c, value: 'yes' }];


        this.etatEmployeOptions = [{ label: this.lang.v126, value: 'Etudiant' },
        { label: this.lang.v125, value: 'Employee' }];

        this.etapInscriptionOptions = [{ label: this.lang.filter_termine, value: 'yes' },
        { label: this.lang.filter_non_termine, value: 'no' }];


        if (this.config.data.showReinStatuts) {
            this.showReinStatuts = this.config.data.showReinStatuts;
        }
        if (this.config.data.showBourse) {
            this.showBourse = this.config.data.showBourse;
        }
        if (this.config.data.showExport) {
            this.showExport = this.config.data.showExport;
        }

        if (this.config.data.showInscrStatus) {
            this.showInscrStatus = this.config.data.showInscrStatus;
        }

        if (this.config.data.showInscrEtap) {
            this.showInscrEtap = true;
        }
        if (this.config.data.showEtatDossier) {
            this.showEtatDossier = true;
        }
        if (this.config.data.showEtatEmploye) {
            this.showEtatEmploye = true;
        }
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
        if (this.config.data.inscr_status) {
            this.inscr_status = this.config.data.inscr_status;
        }

        if (this.config.data.annees_unis) {
            this.annees_unis = this.config.data.annees_unis;
        }


        if (this.config.data.reinscr_statuses) {
            this.reinscr_statuses = this.config.data.reinscr_statuses;
        }
        if (this.config.data.bourses) {
            this.bourses = this.config.data.bourses;
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
            statut: new FormControl(ob),
            inscr_statut: new FormControl(ob),
            etat_dossier: new FormControl(null),
            etat: new FormControl(null),
            inscr_etape: new FormControl(null),
            reinscr_statut: new FormControl(ob),
            annee_uni: new FormControl(ob),
            bourse: new FormControl(ob),

        });

    }

    filtrer() {

        if (this.filterForm.value.bourse.value) {
            this.query.bourse_id = this.filterForm.value.bourse.value;
        }
        if (this.filterForm.value.labo.value) {
            this.query.labo_id = this.filterForm.value.labo.value;
        }

        if (this.filterForm.value.annee_uni.value) {
            this.query.annee_uni = this.filterForm.value.annee_uni.value;
        }

        if (this.filterForm.value.fd.value) {
            this.query.fd_id = this.filterForm.value.fd.value;
        }

        if (this.filterForm.value.cedoc.value) {
            this.query.cedoc_id = this.filterForm.value.cedoc.value;
        }

        if (this.filterForm.value.reinscr_statut.value) {
            this.query.reinscr_statut_id = this.filterForm.value.reinscr_statut.value;
        }

        if (this.filterForm.value.statut.value || this.filterForm.value.statut.value === 0) {
            this.query.statut_id = this.filterForm.value.statut.value;
        }
        if (this.filterForm.value.inscr_statut.value) {
            this.query.inscr_statut_id = this.filterForm.value.inscr_statut.value;
        }

        if (this.filterForm.value.inscr_etape) {
            this.query.inscr_etape = this.filterForm.value.inscr_etape;
        }


        if (this.filterForm.value.keyword_text) {
            this.query.keyword_text = this.filterForm.value.keyword_text;
        }


        if (this.filterForm.value.encad.value) {
            this.query.encad_id = this.filterForm.value.encad.value;
        }

        if (this.filterForm.value.etat_dossier) {
            this.query.etat_dossier = this.filterForm.value.etat_dossier;
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
