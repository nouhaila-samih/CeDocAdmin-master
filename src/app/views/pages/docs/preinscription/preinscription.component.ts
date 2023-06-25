import {Component, OnInit} from '@angular/core';
import {ListItem, Query} from '../../../../utilities/models';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {AppService} from '../../../../utilities/services/app.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {LocalStorageService} from '../../../../utilities/services/local-storage.service';
import {DocsService} from '../../../../utilities/services/docs.service';
import local from '../../../../utilities/constants/local';
import {DocFilterComponent} from '../../../components/doc-filter/doc-filter.component';

@Component({
    selector: 'app-preinscription',
    templateUrl: './preinscription.component.html',
    styleUrls: ['./preinscription.component.css']
})
export class PreinscriptionComponent implements OnInit {

    lang = local();
    loading = true;
    changeStatutLoading = false;
    confirm = false;
    observation: string;
    query: Query = {};
    ref: DynamicDialogRef;
    obs: any[] = [];

    fds: ListItem[] = [];
    profs: ListItem[] = [];
    cedocs: ListItem[] = [];
    labos: ListItem[] = [];
    inscr_status: ListItem[] = [];
    total_records: number;
    per_page: number;

    constructor(public dialogService: DialogService,
                private apps: AppService,
                private ds: DocsService,
                private confirmationService: ConfirmationService,
                private messageService: MessageService,
                private lss: LocalStorageService,
    ) {}

    ngOnInit(): void {


        this.loadObs()
    }

    paginate(event) {
        this.query.page = (event.first / this.per_page) + 1;
        this.loadObs();
    }


    filtrer() {
        this.ref = this.dialogService.open(DocFilterComponent, {
            data: {
                fds: this.fds,
                // inscr_statuses: this.inscr_statuses,
                //
                profs: this.profs,
                cedocs: this.cedocs,
                inscr_status: this.inscr_status,
                //
                labos: this.labos,
                showEtatEmploye: true,
                showInscrEtap: true,
                showInscrStatus: true,

            },
            header: this.lang.filter,
            // width: '40%'
        });
        this.ref.onClose.subscribe((query: Query) => {
            if (query) {
                this.obs = [];
                this.total_records = 0;

                this.query = query;

                this.query.page = 1;
                this.loadObs();

            }
        });

    }

    OnChange(event, doc) {
        doc.statut = event.statut;
        doc.inscr_statut = event.inscr_statut;
        doc.etat_dossier = event.etat_dossier;
    }

    confirmAll(){
        this.confirmationService.confirm({
            message: this.lang.action_delete,
            accept: () => {
                this.loading = true;
                this.ds.confirmAll()
                    .subscribe(res => {
                        this.loading = false;
                        this.loadObs();
                        this.apps.showSuccessMessages(this.lang.suc, this.messageService);
                    }, err => {
                        this.loading = false;
                        this.apps.showErrorMessages(err, this.messageService);

                    });
            }
        });
    }

    loadObs() {
        this.loading = true;
        this.query.annee_uni = this.lss.getAnneeUniId();
        this.ds.getDocs(this.query, {
            profs : 1,
            fds : 1,
            inscr_status: 1,
            labos : 1,
            cedocs : 1,
        }).subscribe(
            (res) => {

                console.log(res);
                this.total_records = res.total;
                this.per_page = res.per_page;
                this.obs = res.docs;
                this.profs = res.dataCollections.profs;
                this.cedocs = res.dataCollections.cedocs;
                this.labos = res.dataCollections.labos;
                this.fds = res.dataCollections.fds;
                this.inscr_status = res.dataCollections.inscr_status;

                this.loading = false;

            },
            (err) => {
                console.log(err);

                this.loading = false;
            }
        );
    }

}
