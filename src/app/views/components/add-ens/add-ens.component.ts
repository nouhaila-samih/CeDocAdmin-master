import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ListItem, Query} from '../../../utilities/models';
import local from '../../../utilities/constants/local';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {LocalStorageService} from '../../../utilities/services/local-storage.service';
import {stringListToItems, toFormData} from '../../../utilities/helpers';
import {EnseignantsService} from '../../../utilities/services/enseignants.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {AppService} from '../../../utilities/services/app.service';

@Component({
    selector: 'app-add-ens',
    templateUrl: './add-ens.component.html',
    styleUrls: ['./add-ens.component.css']
})
export class AddEnsComponent implements OnInit {

    addForm: FormGroup;


    fds: ListItem[] = [];
    labos: ListItem[] = [];
    etabs: ListItem[] = [];
    cedocs: ListItem[] = [];
    grades: ListItem[] = [];
    genres: ListItem[] = [];

    lang = local();
    loading = false;
    submitted = false;

    constructor(public ref: DynamicDialogRef,
                private lss: LocalStorageService,
                public es: EnseignantsService,
                private apps: AppService,
                private messageService: MessageService,
                public config: DynamicDialogConfig) {
    }

    ngOnInit() {

        this.fds = this.config.data.fds;
        this.labos = this.config.data.labos;
        this.etabs = this.config.data.etabs;
        this.cedocs = this.config.data.cedocs;
        this.grades = stringListToItems(this.config.data.enseignantGrades);
        this.genres = stringListToItems(this.config.data.genres);
        this.addForm = new FormGroup({

            email: new FormControl(null, Validators.required),
            cin: new FormControl( null, Validators.required),
            nom_fr: new FormControl(null, Validators.required),
            nom_ar: new FormControl(null, Validators.required),
            prenom_fr: new FormControl(null, Validators.required),
            prenom_ar: new FormControl(null, Validators.required),
            tel: new FormControl(null, Validators.required),
            date_naissance: new FormControl(null, Validators.required),
            genre: new FormControl(null, Validators.required),
            enseignant_grade: new FormControl(null, Validators.required),
            ppr: new FormControl(null, Validators.required),
            email_institu: new FormControl(null),
            password: new FormControl(null, Validators.required),


            fd: new FormControl(null, Validators.required),
            labo: new FormControl(null, Validators.required),
            cedoc: new FormControl(null, Validators.required),
            etab: new FormControl(null, Validators.required),


        });

    }

    addProf() {

        this.submitted = true;

        if (!this.addForm.valid) {

            return;
        }
        this.loading = true;

        this.es.create(toFormData(this.addForm.value)).subscribe(
            res => {
                this.apps.showSuccessMessages(this.lang.suc, this.messageService);
                this.loading = false;
                this.submitted = false;
                this.ref.close(res.item);
            }, err => {
                console.log(err);
                this.apps.showErrorMessages(err, this.messageService);
                this.loading = false;
            });



    }

    isValideInput(input: any){
        return (input.dirty
            || input.touched
            || this.submitted) && input.invalid
    }



}
