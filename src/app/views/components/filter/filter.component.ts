import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import local from 'src/app/utilities/constants/local';
import { ListItem, Query } from 'src/app/utilities/models';

@Component({
    selector: 'app-filter-m',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

    filterForm: FormGroup;


    statuses: ListItem[] = [];
    reinscr_statuses: ListItem[] = [];
    specialites: ListItem[] = [];
    specialites2: ListItem[] = [];
    fds: ListItem[] = [];
    labos: ListItem[] = [];
    keywords: ListItem[] = [];
    keywords2: ListItem[] = [];
    enseignents: ListItem[] = [];
    enseignents2: ListItem[] = [];
    enseignents3: ListItem[] = [];
    ex_coencad: ListItem[] = [];
    ex_coencad2: ListItem[] = [];
    annneeUnis: ListItem[] = [];
    cedocs: ListItem[] = [];

    lang = local();
    filterLoading = false;
    showEncad = false;
    showCoEncad = false;
    showCedocs = false;
    showLabos = false;
    showSps = false;
    showFds = false;
    showStatuts = false;
    showReinStatuts = false;
    showKeyword = false;
    showKeywordText = false;
    showAnneeUni = false;

    query: Query = {};

    constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

    ngOnInit() {
        //id: this.config.id
        if (this.config.data.specialites) {
            this.specialites = this.config.data.specialites;
            this.specialites2 = this.config.data.specialites;
        }
        if (this.config.data.showEncad) {
            this.showEncad = this.config.data.showEncad;
        }
        if (this.config.data.showCoEncad) {
            this.showCoEncad = this.config.data.showCoEncad;
        }
        if (this.config.data.showCedoc) {
            this.showCedocs = this.config.data.showCedoc;
        }
        if (this.config.data.showLabos) {
            this.showLabos = this.config.data.showLabos;
        }
        if (this.config.data.showSps) {
            this.showSps = this.config.data.showSps;
        }
        if (this.config.data.showFds) {
            this.showFds = this.config.data.showFds;
        }
        if (this.config.data.showStatuts) {
            this.showStatuts = this.config.data.showStatuts;
        }
        if (this.config.data.showReinStatuts) {
            this.showReinStatuts = this.config.data.showReinStatuts;
        }
        if (this.config.data.showKeyword) {
            this.showKeyword = this.config.data.showKeyword;
        }
        if (this.config.data.showKeywordText) {
            this.showKeywordText = this.config.data.showKeywordText;
        }
        if (this.config.data.showAnneeUni) {
            this.showAnneeUni = this.config.data.showAnneeUni;
        }

        if (this.config.data.fds) {
            this.fds = this.config.data.fds;
        }
        if (this.config.data.labos) {
            this.labos = this.config.data.labos;
        }
        if (this.config.data.cedocs) {
            this.cedocs = this.config.data.cedocs;
        }
        if (this.config.data.reinscr_statuses) {
            this.reinscr_statuses = this.config.data.reinscr_statuses;
        }
        if (this.config.data.statuses) {
            this.statuses = this.config.data.statuses;
        }
        if (this.config.data.enseignents) {
            this.enseignents = this.config.data.enseignents;
            this.enseignents2 = this.config.data.enseignents;
            this.enseignents3 = this.config.data.enseignents;
        }
        if (this.config.data.ex_coencad) {
            this.ex_coencad = this.config.data.ex_coencad;
            this.ex_coencad2 = this.config.data.ex_coencad;
        }
        if (this.config.data.keywords) {
            this.keywords = this.config.data.keywords;
            this.keywords2 = this.config.data.keywords;
        }
        const year = new Date().getFullYear();

        for (let i = 1994; i < year + 5; i++) {
            this.annneeUnis.push({
                value: `${i}/${i + 1}`,
                label: `${i}/${i + 1}`
            });
        }
        const ob = {
            value: null,
            label: null
        };
        this.filterForm = new FormGroup({
            fd: new FormControl(ob),
            sp: new FormControl(ob),
            encad: new FormControl(ob),
            coencad: new FormControl(ob),
            ex_coencad: new FormControl(ob),
            labo: new FormControl(ob),
            annee_uni: new FormControl(ob),
            is_etudiant: new FormControl(null),
            type: new FormControl(null),
            keyword: new FormControl(ob),
            keyword_text: new FormControl(null),
            statut: new FormControl(ob),
            reinscr_statut: new FormControl(ob),
        });
    }

    filtrer() {
        if (this.filterForm.value.labo.value) {
            this.query.labo_id = this.filterForm.value.labo.value;
        }
        if (this.filterForm.value.fd.value) {
            this.query.fd_id = this.filterForm.value.fd.value;
        }
        if (this.filterForm.value.sp.value) {
            this.query.sp_id = this.filterForm.value.sp.value;
        }
        if (this.filterForm.value.keyword.value) {
            this.query.keyword_id = this.filterForm.value.keyword.value;
        }
        if (this.filterForm.value.statut.value) {
            this.query.statut_id = this.filterForm.value.statut.value;
        }
        if (this.filterForm.value.reinscr_statut.value) {
            this.query.reinscr_statut_id = this.filterForm.value.reinscr_statut.value;
        }
        if (this.filterForm.value.keyword_text) {
            this.query.keyword_text = this.filterForm.value.keyword_text;
        }
        if (this.filterForm.value.coencad.value) {
            this.query.coencad_id = this.filterForm.value.coencad.value;
        }
        if (this.filterForm.value.ex_coencad.value) {
            this.query.ex_coencad_id = this.filterForm.value.ex_coencad.value;
        }
        if (this.filterForm.value.encad.value) {
            this.query.encad_id = this.filterForm.value.encad.value;
        }
        if (this.filterForm.value.annee_uni.value) {
            this.query.annee_uni = this.filterForm.value.annee_uni.value;
        }
        if (this.filterForm.value.is_etudiant) {
            this.query.is_etudiant = this.filterForm.value.is_etudiant;
        }
        if (this.filterForm.value.type) {
            this.query.type = this.filterForm.value.type;
        }

        this.ref.close(this.query);

    }


    search(event, choix) {

        if (choix === 'keywords') {
            this.keywords = this.keywords2.filter(
                (fd) =>
                    fd.label.toLowerCase().search(event.query.toLowerCase()) > -1
            );
            return;
        }

        if (choix === 'specialites') {

            this.specialites = this.specialites2.filter(
                (fd) =>
                    fd.label.toLowerCase().search(event.query.toLowerCase()) > -1
            );
            return;
        }
        if (choix === 'ex_coencad') {

            this.ex_coencad = this.ex_coencad2.filter(
                (fd) =>
                    fd.label.toLowerCase().search(event.query.toLowerCase()) > -1
            );
            return;
        }
        if (choix === 'coencad') {

            this.enseignents2 = this.enseignents3.filter(
                (fd) =>
                    fd.label.toLowerCase().search(event.query.toLowerCase()) > -1
            );
            return;
        }
        if (choix === 'encad') {

            this.enseignents = this.enseignents3.filter(
                (fd) =>
                    fd.label.toLowerCase().search(event.query.toLowerCase()) > -1
            );
            return;
        }


    }
}
