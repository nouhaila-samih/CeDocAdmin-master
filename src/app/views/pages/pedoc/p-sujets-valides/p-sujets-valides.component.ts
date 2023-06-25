import { environment } from './../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import local from 'src/app/utilities/constants/local';
import { ListItem, Query, Sujet } from 'src/app/utilities/models';
import { AppService } from 'src/app/utilities/services/app.service';
import { LocalStorageService } from 'src/app/utilities/services/local-storage.service';
import { FilterComponent } from 'src/app/views/components/filter/filter.component';

@Component({
  selector: 'app-p-sujets-valides',
  templateUrl: './p-sujets-valides.component.html',
  styleUrls: ['./p-sujets-valides.component.css']
})
export class PSujetsValidesComponent implements OnInit {


    sujets: Sujet[];

    titre = '';
    statuses: ListItem[];
    specialites: ListItem[];

    fds: ListItem[];
    labos: ListItem[];
    total_records: number;
    per_page: number;
    enseignents: ListItem[];
    ex_coencad: ListItem[];
    keywords: ListItem[];

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
    constructor(public dialogService: DialogService, private messageService: MessageService, private appService: AppService,
        private lss: LocalStorageService,

    ) { }

    ngOnInit(): void {
        this.titre = this.lang.pedoc_name;
        this.query.annee_uni = this.lss.getAnneeUniId();
        this.query.statut_id = 2;
        this.loadSujets();


    }

    paginate(event) {
        this.query.page = (event.first / this.per_page) + 1;
        this.loadSujets();
    }


    exporter(){
        window.open( `${environment.api_url}/admin/pedoc/sujets/exporterSujetsValides?token=${this.lss.getToken()}`, '_blank')
    }

    filtrer() {
        this.ref = this.dialogService.open(FilterComponent, {
            data: {
                fds: this.fds,
                statuses: this.statuses,
                specialites: this.specialites,
                keywords: this.keywords,
                enseignents: this.enseignents,
                ex_coencad: this.ex_coencad,
                labos: this.labos,
                showEncad: true,
                showCoEncad: true,
                showCedocs: false,
                showLabos: true,
                showSps: true,
                showFds: true,
                showStatuts: false,
                showKeyword: true,
                showKeywordText: true,
                showAnneeUni: false,
            },
            header: this.lang.filter,
            // width: '40%'
        });
        this.ref.onClose.subscribe((query: Query) => {
            if (query) {
                this.sujets = [];
                this.total_records = 0;
                query.annee_uni = this.query.annee_uni;
                query.statut_id = this.query.statut_id;
                this.query = query;
                this.query.page = 1;
                this.loadSujets();

            }
        });

    }



    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }


    refrecheChangeStatutData() {
        this.msgConfirmation = '';
        this.observation = null;
        this.sujet_id = null;
        this.statut = null;
        this.confirm = false;
    }


    loadSujets() {
        this.loading = true;

        this.appService.getSujets(this.query).subscribe(
            (res) => {

                console.log(res);




                this.specialites = res.dataCollections.specialites;
                this.statuses = res.dataCollections.statuses;
                this.ex_coencad = res.dataCollections.ex_coencad;
                this.keywords = res.dataCollections.keywords;
                this.fds = res.dataCollections.fds;
                this.labos = res.dataCollections.labos;

                this.enseignents = res.dataCollections.enseignants;
                this.total_records = res.total;
                this.per_page = res.per_page;
                this.sujets = res.sujets;

                this.loading = false;
            },
            (err) => {
                console.log(err);

                this.loading = false;
            }
        );
    }
}
