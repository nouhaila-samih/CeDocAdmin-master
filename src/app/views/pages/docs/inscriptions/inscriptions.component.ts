import { Component, OnInit } from '@angular/core';
import local from '../../../../utilities/constants/local';
import {ListItem, Query} from '../../../../utilities/models';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {AppService} from '../../../../utilities/services/app.service';
import {DocsService} from '../../../../utilities/services/docs.service';
import {SujetsService} from '../../../../utilities/services/sujets.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {LocalStorageService} from '../../../../utilities/services/local-storage.service';
import {SujetFilterComponent} from '../../../components/sujet-filter/sujet-filter.component';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.css']
})
export class InscriptionsComponent implements OnInit {

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
    total_records: number;
    per_page: number;



    constructor(public dialogService: DialogService,
                private apps: AppService,
                private ds: DocsService,
                private sj: SujetsService,
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
        this.ref = this.dialogService.open(SujetFilterComponent, {
            data: {
                fds: this.fds,
                profs: this.profs,
                cedocs: this.cedocs,
                labos: this.labos


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

    loadObs() {
        this.loading = true;
        this.query.annee_uni = this.lss.getAnneeUniId();
        // this.query.keyword_text = 'SEG22_204';
        this.sj.getSujets(this.query, {
            profs : 1,
            fds : 1,
            labos : 1,
            cedocs : 1,
        }).subscribe(
            (res) => {

                console.log(res);
                this.total_records = res.total;
                this.per_page = res.per_page;
                this.obs = res.obs;
                this.profs = res.dataCollections.profs;
                this.cedocs = res.dataCollections.cedocs;
                this.labos = res.dataCollections.labos;
                this.fds = res.dataCollections.fds;
                this.cedocs = res.dataCollections.cedocs;

                this.loading = false;

            },
            (err) => {
                console.log(err);

                this.loading = false;
            }
        );
    }


}
