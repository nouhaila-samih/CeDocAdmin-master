import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import local from 'src/app/utilities/constants/local';
import { ListItem, Query } from 'src/app/utilities/models';
import { AppService } from 'src/app/utilities/services/app.service';
import { LocalStorageService } from 'src/app/utilities/services/local-storage.service';
import { DocFilterComponent } from 'src/app/views/components/doc-filter/doc-filter.component';

@Component({
  selector: 'app-c-preinsc',
  templateUrl: './c-preinsc.component.html',
  styleUrls: ['./c-preinsc.component.css']
})
export class CPreinscComponent implements OnInit {


    docs: any[] = [];
    inscr_statuses: ListItem[];

    fds: ListItem[];
    labos: ListItem[];
    total_records: number;
    per_page: number;
    enseignents: ListItem[];
    cedocs: ListItem[];


    lang = local();
    loading = true;
    changeStatutLoading = false;
    confirm = false;
    msgConfirmation: string;
    observation: string;
    sujet_id: any;
    statut: number;

    ref: DynamicDialogRef;

    query: Query = {};
    constructor(public dialogService: DialogService, private apps: AppService, private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private lss: LocalStorageService,

    ) { }


    ngOnInit(): void {
        this.query.annee_uni = this.lss.getAnneeUniId();
        //this.query.statut_id = 3;
        this.loadSujets();

    }


    paginate(event) {
        this.query.page = (event.first / this.per_page) + 1;
        this.loadSujets();
    }


    filtrer() {
        this.ref = this.dialogService.open(DocFilterComponent, {
            data: {
                fds: this.fds,
                inscr_statuses: this.inscr_statuses,

                enseignents: this.enseignents,

                labos: this.labos,
                showEtatEmploye: true,
                showInscrEtap: true,

            },
            header: this.lang.filter,
            // width: '40%'
        });
        this.ref.onClose.subscribe((query: Query) => {
            if (query) {
                this.docs = [];
                this.total_records = 0;

                this.query = query;
                this.query.page = 1;
                this.loadSujets();

            }
        });

    }


    OnChange(event, doc) {


        doc.statut = event.statut;
        doc.inscr_statut = event.inscr_statut;
        doc.inscr_etape = event.inscr_etape;
        doc.etat_dossier = event.etat_dossier;
    }



    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }

    loadSujets() {
        this.loading = true;

        this.apps.getPreinsc(this.query, 'cedoc').subscribe(
            (res) => {

                console.log(res);


                this.inscr_statuses = res.dataCollections.inscr_statuses;
                this.fds = res.dataCollections.fds;
                this.labos = res.dataCollections.labos;

                this.enseignents = res.dataCollections.enseignants;
                this.total_records = res.total;
                this.per_page = res.per_page;
                this.docs = res.docs;

                this.loading = false;
            },
            (err) => {
                console.log(err);

                this.loading = false;
            }
        );
    }

    confirmeAll() {



        this.confirmationService.confirm({
            message: this.lang.valide_confirmation_validate_all,

            accept: () => {
                this.loading = true;

                this.apps.confirmeAllPreinsc( 'cedoc').subscribe(
                    res => {
                        console.log(res);
                        this.messageService.add({ detail: this.lang.v18,
                            life: 10000, key: 'toast', severity: 'success', summary: 'Succès!' });
                        this.docs = [];
                        this.loadSujets();


                    }, err => {
                        console.log(err);
                        this.loading = false;
                        this.messageService.add({
                            detail: this.lang.err,
                            life: 10000, key: 'toast', severity: 'error', summary: 'Erreur!'
                        });

                    }
                );
            },
            reject: (type) => {

            }
        });

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
        this.messageService.add({ detail: this.lang.v5, life: 10000, key: 'toast', severity: 'error', summary: 'Erreur!' });

    }


}
