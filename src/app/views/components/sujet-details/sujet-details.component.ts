import { Component, Input, OnInit } from '@angular/core';
import local from 'src/app/utilities/constants/local';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {AppService} from '../../../utilities/services/app.service';
import {DocsService} from '../../../utilities/services/docs.service';
import {LocalStorageService} from '../../../utilities/services/local-storage.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {toFormData} from '../../../utilities/helpers';

@Component({
    selector: 'app-sujet-details',
    templateUrl: './sujet-details.component.html',
    styleUrls: ['./sujet-details.component.css']
})
export class SujetDetailsComponent implements OnInit {
    @Input() sujet: any = {
        codirecteur: null,
        document: null,
        resume: null,
        doctorants: null,
        keywords: null,
    };
    @Input() showDoctorants = true;
    @Input() showCandidats = true;
    @Input() showCandidatsAdmis = false;
    @Input() showObs = true;
    @Input() showSpecialite = true;
    @Input() showLabo = true;
    @Input() showCedoc = true;
    @Input() showConvoquer = true;

    convoquerItems: MenuItem[] = [];
    confirm = false;
    confirm2 = false;
    showPiecesManquantes = false;
    changeStatutLoading = false;
    actionType: string;
    obervation: string;
    statut: number;
    doc: any;
    lang = local();
    dossierModal = false;
    resultatForm: FormGroup;
    dossierForm: FormGroup;
    dossierOptions: any[];


    constructor(private apps: AppService,
                public dc: DocsService,
                public lss: LocalStorageService,
                private confirmationService: ConfirmationService, private messageService: MessageService) { }

    ngOnInit(): void {
        this.resultatForm = new FormGroup(
            {
                statut: new FormControl(null, Validators.required),
                note: new FormControl(null, Validators.required),
                obervation: new FormControl(null)
            }
        );

        this.dossierForm = new FormGroup(
            {
                statut: new FormControl(null, Validators.required),
                pieces_manquantes: new FormControl(null),
                etat_dossier: new FormControl(null),
            }
        );

        this.dossierOptions = [{ label: this.lang.doc_statut_dossier_nc, value: 'no' },
            { label: this.lang.doc_statut_dossier_c, value: 'yes' }];

    }

    sortCandidatsAdmis(docs: any[]){
        docs = docs.filter(e =>
            e.inscr_statut === 9
            || e.inscr_statut === 10
            || e.inscr_statut === 0
            || e.inscr_statut === 11

        );
        docs = docs.sort((a,b) => {
            if ( a.note_oral < b.note_oral ){
                return 1;
            }
            if ( a.note_oral > b.note_oral ){
                return -1;
            }
            return 0;
        });
        return docs
    }
    setResultat(doc){
        this.doc = doc;
        this.confirm2 = true;
    }
    changeCandidatsStatut(statut, doc) {

        this.statut = statut;
        this.doc = doc;
        this.actionType = 'changeCandidatsStatut';
        this.confirm = true;
    }


    candidatsStatut(data) {
        this.changeStatutLoading = true;
        this.dc.changeInscriptionStatus(
            data,
            this.doc.id,
            this.statut,
        ).subscribe(
            res => {
                this.doc = res.doc;
                this.sujet.candidats = this.sujet.candidats.map(e => {
                    if(e.id === res.doc.id) return res.doc;
                    else return e;
                });
                this.changeStatutLoading = false;
                this.confirm = false;
                this.statut = null;
                console.log(this.doc);

                this.apps.showSuccessMessages(this.lang.v18,this.messageService);


            },
            err => {
                this.changeStatutLoading = false;
                this.apps.showErrorMessages(err,this.messageService);
                console.log(err);

            }
        );

    }

    OnAction(event) {

        if (!event.action) {
            this.confirm = false;
            return;
        }
        switch (this.actionType) {
            case 'changeCandidatsStatut':
                this.candidatsStatut({ observation: event.observation });

                break;

            default:
                break;
        }


    }


    confirme(choix){
        if (!choix) {
            this.confirm2 = false;
            this.statut = null;
            this.doc = null;
            return
        }

        this.changeStatutLoading = true;
        this.dc.setOralNote(
            this.resultatForm.value,
            this.doc.id
        ).subscribe(
            res => {
                this.doc = res.doc;
                this.sujet.candidats = this.sujet.candidats.map(e => {
                    if(e.id === res.doc.id) return res.doc;
                    else return e;
                });
                this.changeStatutLoading = false;
                this.confirm2 = false;
                this.statut = null;
                console.log(this.doc);
                this.resultatForm.patchValue({
                    statut: null,
                    note: null,
                    obervation: null
                });
                this.apps.showSuccessMessages(this.lang.v18,this.messageService);


            },
            err => {
                this.apps.showErrorMessages(err,this.messageService);
                this.changeStatutLoading = false;
                console.log(err);

            }
        );

    }

    setDossier(doc) {
        this.doc = doc;
        this.dossierModal = true;
    }
    onChangeDossier(event) {
        this.showPiecesManquantes = event.value === 'no';

    }

    addDossier(choix: boolean) {
        if (!choix) {
            this.dossierModal = false;
            return;
        }
        this.changeStatutLoading = true;

        this.dc.setAdmisDossier(toFormData(this.dossierForm.value), this.doc.id).subscribe(
            (res) => {
                this.messageService.add({ detail: this.lang.v18, life: 10000, key: 'toast', severity: 'success', summary: 'Succès!' });
                this.changeStatutLoading = false;
                this.dossierModal = false;

                this.dossierForm.patchValue({
                    statut: null,
                    pieces_manquantes: null,
                    etat_dossier: null
                });

                this.showPiecesManquantes = false

                this.doc = res.doc;
                this.sujet.candidats = this.sujet.candidats.map(e => {
                    if(e.id === res.doc.id) return res.doc;
                    else return e;
                });

            },
            (err) => {
                console.log(err);
                this.apps.showErrorMessages(err, this.messageService);
                this.changeStatutLoading = false;

            });

    }


}
