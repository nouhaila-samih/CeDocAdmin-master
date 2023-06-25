import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ListItem, Query} from '../../../utilities/models';
import local from '../../../utilities/constants/local';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {LocalStorageService} from '../../../utilities/services/local-storage.service';
import {stringListToItems} from '../../../utilities/helpers';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {


    filterForm: FormGroup;


    fds: ListItem[] = [];
    labos: ListItem[] = [];
    etabs: ListItem[] = [];
    cedocs: ListItem[] = [];

    lang = local();
    filterLoading = false;
    showText = false;
    showEnsGrade = false;
    showCedoc = false;
    showFd = false;
    showLabo = false;
    showEtab = false;
    gradeOptions: any[];

    query: Query = {};

    constructor(public ref: DynamicDialogRef,
                private lss: LocalStorageService,
                public config: DynamicDialogConfig) { }

    ngOnInit() {


        if ( this.config.data.showText) {
            this.showText = true;
        }
        if (this.config.data.showFd && this.config.data.fds) {
            this.fds = this.config.data.fds;
            this.showFd = true;
        }
        if (this.config.data.showLabo && this.config.data.labos) {
            this.labos = this.config.data.labos;
            this.showLabo = true;
        }

        if (this.config.data.showEtab && this.config.data.etabs) {
            this.etabs = this.config.data.etabs;
            this.showEtab = true;
        }




        if (this.config.data.showCedoc && this.config.data.cedocs && this.lss.isPedocAdmin()) {
            this.cedocs = this.config.data.cedocs;
            this.showCedoc = true;
        }

        if (this.config.data.showEnsGrade) {
            this.gradeOptions = stringListToItems(this.config.data.enseignantGrades);
            this.showEnsGrade = true;
        }




        const ob = {
            value: null,
            label: null
        };
        this.filterForm = new FormGroup({
            fd: new FormControl(ob),
            labo: new FormControl(ob),
            cedoc: new FormControl(ob),
            etab: new FormControl(ob),
            enseignant_grade: new FormControl(null),
            keyword_text: new FormControl(null),


        });

    }

    filtrer() {


        if (this.filterForm.value.labo.value) {
            this.query.labo_id = this.filterForm.value.labo.value;
        }



        if (this.filterForm.value.etab.value) {
            this.query.etab_id = this.filterForm.value.etab.value;
        }

        if (this.filterForm.value.fd.value) {
            this.query.fd_id = this.filterForm.value.fd.value;
        }

        if (this.filterForm.value.cedoc.value) {
            this.query.cedoc_id = this.filterForm.value.cedoc.value;
        }

        if (this.filterForm.value.enseignant_grade) {
            this.query.enseignant_grade = this.filterForm.value.enseignant_grade;
        }

        if (this.filterForm.value.keyword_text) {
            this.query.keyword_text = this.filterForm.value.keyword_text;
        }


        this.ref.close(this.query);

    }

    claire(){

        this.ref.close({});

    }


    search(event, choix) {



    }

}
