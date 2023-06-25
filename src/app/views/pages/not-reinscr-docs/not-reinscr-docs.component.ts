import { Component, OnInit } from '@angular/core';
import local from '../../../utilities/constants/local';
import {ListItem, Query} from '../../../utilities/models';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {AppService} from '../../../utilities/services/app.service';
import {DocsService} from '../../../utilities/services/docs.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {LocalStorageService} from '../../../utilities/services/local-storage.service';
import {DocFilterComponent} from '../../components/doc-filter/doc-filter.component';

@Component({
  selector: 'app-not-reinscr-docs',
  templateUrl: './not-reinscr-docs.component.html',
  styleUrls: ['./not-reinscr-docs.component.css']
})
export class NotReinscrDocsComponent implements OnInit {

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
    statuses: ListItem[] = [];
    annees_unis: ListItem[] = [];
    bourses: ListItem[] = [];
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
                //  inscr_status: this.inscr_status,
                annees_unis: this.annees_unis,
                //  statuses: this.statuses,
                //
                labos: this.labos,
                showEtatEmploye: true,
                showEtatDossier: true,
                // showInscrStatus: true,

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


    loadObs() {
        this.loading = true;
        this.query.statut_id= 0;
        this.query.hasnt_reinscri= true;
        this.ds.getDocs(this.query, {
            profs : 1,
            fds : 1,
            inscr_status : 1,
            doc_status : 1,
            annee_unis : 1,
            labos : 1,
            cedocs : 1,
            bourses : 1,
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
                this.statuses = res.dataCollections.doc_status;
                this.annees_unis = res.dataCollections.annee_unis;
                this.bourses = res.dataCollections.bourses;

                this.loading = false;

            },
            (err) => {
                console.log(err);

                this.loading = false;
            }
        );
    }


}
