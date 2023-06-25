import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import local from 'src/app/utilities/constants/local';
import { R_DIR_PEDOC, R_DIR_CEDOC, P_SHOW_CONFIG, R_ADMIN_PEDOC, R_ADMIN_CEDOC } from './../../../utilities/constants/index';
import { AppService } from 'src/app/utilities/services/app.service';
import { LocalStorageService } from './../../../utilities/services/local-storage.service';
import { MainComponent } from './../../pages/main/main.component';
import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {


    isCanShowConfig = false;
    isAdminPedoc = false;
    isAdminCedoc = false;
    lancerLoading = false;
    loading = false;
    lancerLoading1 = false;
    lancerPropoLoading = false;
    validerLoading = false;
    percent = 0;
    lang = local();
    inscriptionForm: FormGroup;
    reinscriptionForm: FormGroup;
    propositionForm: FormGroup;
    cedocForm: FormGroup;
    datepipe =  new DatePipe('en-US');
    constructor(private messageService: MessageService, public appMain: MainComponent, private lss: LocalStorageService,
                private appService: AppService) { }

    ngOnInit() {
        this.isCanShowConfig = this.lss.hasPermissions(P_SHOW_CONFIG);
        this.isAdminPedoc = this.lss.hasRole(R_DIR_PEDOC) || this.lss.hasRole(R_ADMIN_PEDOC);
        this.isAdminCedoc = this.lss.hasRole(R_DIR_CEDOC) || this.lss.hasRole(R_ADMIN_CEDOC);
        this.reinscriptionForm = new FormGroup({
            date_debut: new FormControl(null,
                Validators.required),
            date_fin: new FormControl(null, Validators.required),
        });
        this.inscriptionForm = new FormGroup({
            date_debut_inscription: new FormControl(null,
                Validators.required),
            date_fin_inscription: new FormControl(null, Validators.required),
        });
        this.propositionForm = new FormGroup({
            date_debut_proposition: new FormControl(null,
                Validators.required),
            date_fin_proposition: new FormControl(null, Validators.required),
        });
        this.cedocForm = new FormGroup({
            nbr_sujets_ph: new FormControl(null, [Validators.required, Validators.min(1)]),
            nbr_sujets_pes: new FormControl(null, [Validators.required, Validators.min(1)]),
            nbr_coencad_pa: new FormControl(null, [Validators.required, Validators.min(1)]),
            encad_pa: new FormControl(null, Validators.required),
            has_ecrit: new FormControl(null, Validators.required),
        });
        this.appService.getConfigData().subscribe(res => {



            if (this.isAdminPedoc) {
                this.percent = res.percent_employee_sujets;

                this.reinscriptionForm.controls.date_debut.setValue(new Date(res.date_debut_reinscription));
                this.reinscriptionForm.controls.date_fin.setValue(new Date(res.date_fin_reinscription));

                this.inscriptionForm.controls.date_debut_inscription.setValue(new Date(res.date_debut_inscription));
                this.inscriptionForm.controls.date_fin_inscription.setValue(new Date(res.date_fin_inscription));

                this.propositionForm.controls.date_debut_proposition.setValue(new Date(res.date_debut_proposition));
                this.propositionForm.controls.date_fin_proposition.setValue(new Date(res.date_fin_proposition));

            } else if (this.isAdminCedoc) {
                this.cedocForm.controls.nbr_sujets_ph.setValue(res.nbr_sujets_ph);
                this.cedocForm.controls.nbr_sujets_pes.setValue(res.nbr_sujets_pes);
                this.cedocForm.controls.nbr_coencad_pa.setValue(res.nbr_coencad_pa);
                this.cedocForm.controls.encad_pa.setValue(res.encad_pa);
                this.cedocForm.controls.has_ecrit.setValue(res.has_ecrit);

            }
        });
    }


    changeCedoc() {
        if (!this.cedocForm.valid) {
            this.messageService.add({ detail: this.lang.remplir, life: 10000, key: 'toast', severity: 'error', summary: 'Erreur!' });
            return;
        }
        this.loading = true;

        this.appService.changeConfigCedoc(

                this.cedocForm.value.nbr_sujets_ph,
                this.cedocForm.value.nbr_sujets_pes,
                this.cedocForm.value.nbr_coencad_pa,
                this.cedocForm.value.encad_pa,
                this.cedocForm.value.has_ecrit,

        ).subscribe(
            res => {
                this.messageService.add({
                    detail: res.message, life: 10000, key: 'toast',
                    severity: 'success', summary: 'Succès!'
                });
                this.loading = false;

            },
            err => {
                console.log(err);

                this.loading = false;
                this.showErrorMessages(err);
            }
        );
    }
    lancerReinscr() {
        if (!this.reinscriptionForm.valid) {
            this.messageService.add({ detail: this.lang.remplir, life: 10000, key: 'toast', severity: 'error', summary: 'Erreur!' });
            return;
        }
        this.lancerLoading1 = true;

        this.appService.changeReinscriptionDate(
            this.datepipe.transform(
                this.reinscriptionForm.value.date_debut, 'YYYY-MM-dd hh:mm:ss'),
                this.datepipe.transform(
                    this.reinscriptionForm.value.date_fin, 'YYYY-MM-dd hh:mm:ss')

        ).subscribe(
            res => {
                this.messageService.add({
                    detail: res.message, life: 10000, key: 'toast',
                    severity: 'success', summary: 'Succès!'
                });
                this.lancerLoading1 = false;

            },
            err => {
                console.log(err);

                this.lancerLoading1 = false;
                this.showErrorMessages(err);
            }
        );
    }

    lancerInscr() {
        if (!this.inscriptionForm.valid) {
            this.messageService.add({ detail: this.lang.remplir, life: 10000, key: 'toast', severity: 'error', summary: 'Erreur!' });
            return;
        }
        this.lancerLoading = true;

        this.appService.changeInscriptionDate(
            this.datepipe.transform(
                this.inscriptionForm.value.date_debut_inscription, 'YYYY-MM-dd hh:mm:ss'),
                this.datepipe.transform(
                    this.inscriptionForm.value.date_fin_inscription, 'YYYY-MM-dd hh:mm:ss')

        ).subscribe(
            res => {
                this.messageService.add({
                    detail: res.message, life: 10000, key: 'toast',
                    severity: 'success', summary: 'Succès!'
                });
                this.lancerLoading = false;

            },
            err => {
                console.log(err);

                this.lancerLoading = false;
                this.showErrorMessages(err);
            }
        );
    }

    validerPercent() {

        this.validerLoading = true;
        this.appService.changePercent(this.percent).subscribe(
            res => {

                this.messageService.add({
                    detail: res.message, life: 10000, key: 'toast',
                    severity: 'success', summary: 'Succès!'
                });
                this.validerLoading = false;
            },
            err => {
                this.validerLoading = false;
                this.showErrorMessages(err);
            }
        );
    }


    lancerProp(){
        if (!this.propositionForm.valid) {
            this.messageService.add({ detail: this.lang.remplir, life: 10000, key: 'toast', severity: 'error', summary: 'Erreur!' });
            return;
        }
        this.lancerPropoLoading = true;

        this.appService.changePropositionDate(
            this.datepipe.transform(
                this.propositionForm.value.date_debut_proposition, 'YYYY-MM-dd hh:mm:ss'),
                this.datepipe.transform(
                    this.propositionForm.value.date_fin_proposition, 'YYYY-MM-dd hh:mm:ss')

        ).subscribe(
            res => {
                this.messageService.add({
                    detail: res.message, life: 10000, key: 'toast',
                    severity: 'success', summary: 'Succès!'
                });
                this.lancerPropoLoading = false;

            },
            err => {
                console.log(err);

                this.lancerPropoLoading = false;
                this.showErrorMessages(err);
            }
        );
    }


    isIE() {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    }


    onConfigButtonClick(event) {
        this.appMain.configActive = !this.appMain.configActive;
        event.preventDefault();
    }

    onConfigCloseClick(event) {
        this.appMain.configActive = false;
        event.preventDefault();
    }


    showErrorMessages(err) {

        if (err.error.errors) {
            for (const error in err.error.errors) {
                this.messageService.add({ detail: err.error.errors[error], life: 10000, key: 'toast', severity: 'error', summary: 'Erreur!' });
            }
            return;
        }
        if (err.error.message) {
            this.messageService.add({ detail: err.error.message, life: 10000, key: 'toast', severity: 'error', summary: 'Erreur!' });
            return;
        }
        this.messageService.add({ detail: this.lang.err, life: 10000, key: 'toast', severity: 'error', summary: 'Erreur!' });

    }

}
