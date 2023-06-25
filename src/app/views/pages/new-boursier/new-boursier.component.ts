import { Component, OnInit } from '@angular/core';
import {ListItem, Query} from '../../../utilities/models';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {AppService} from '../../../utilities/services/app.service';
import {DocsService} from '../../../utilities/services/docs.service';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {LocalStorageService} from '../../../utilities/services/local-storage.service';
import {DocFilterComponent} from '../../components/doc-filter/doc-filter.component';
import local from '../../../utilities/constants/local';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-new-boursier',
  templateUrl: './new-boursier.component.html',
  styleUrls: ['./new-boursier.component.css']
})
export class NewBoursierComponent implements OnInit {

    lang = local();
    loading = true;
    changeStatutLoading = false;
    confirm = false;
    decision: String;
    observation: string;
    query: Query = {};
    ref: DynamicDialogRef;
    obs: any[] = [];

    fds: ListItem[] = [];
    profs: ListItem[] = [];
    cedocs: ListItem[] = [];
    labos: ListItem[] = [];
    bourses: ListItem[];
    exporter: MenuItem[];
    executer: MenuItem[];
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

        this.exporter = [

            {
                label: this.lang.filter_par_etab,
                icon: 'pi pi-file-excel',
                target: '_blank',
                url: environment.api_url + '/administration/bourses/exporteBoursiers/etab?token=' + this.lss.getToken()
            },
            {
                label: this.lang.filter_par_labo,
                icon: 'pi pi-file-excel',
                target: '_blank',
                url: environment.api_url + '/administration/bourses/exporteBoursiers/labo?token=' + this.lss.getToken()
            },
            {
                label: this.lang.filter_par_fd,
                icon: 'pi pi-file-excel',
                target: '_blank',
                url: environment.api_url + '/administration/bourses/exporteBoursiers/fd?token=' + this.lss.getToken()
            }, {
                label: this.lang.filter_par_cedoc,
                icon: 'pi pi-file-excel',
                target: '_blank',
                url: environment.api_url + '/administration/bourses/exporteBoursiers/cedoc?token=' + this.lss.getToken()
            }, {
                label: this.lang.filter_par_pedoc,
                icon: 'pi pi-file-excel',
                target: '_blank',
                url: environment.api_url + '/administration/bourses/exporteBoursiers/pedoc?token=' + this.lss.getToken()
            },

            {
                label: this.lang.doc_ville_sud,
                icon: 'pi pi-file-excel',
                target: '_blank',
                url: environment.api_url + '/administration/bourses/exporteBoursiers/sud?token=' + this.lss.getToken()
            },
            {
                label: this.lang.canevas,
                icon: 'pi pi-file-excel',
                target: '_blank',
                url: environment.api_url + '/administration/bourses/exporteBoursiers/canevas?token=' + this.lss.getToken()
            },

            /* {
        label: this.lang.filter_final,
        icon: 'pi pi-file-excel',
        target: '_blank',
        url: environment.api_url + '/admin/pedoc/bourses/exporteBoursiers/final?token=' + this.lss.getToken()
      },
 */
        ];

        this.executer = [

            {
                label: this.lang.filter_par_etab,
                icon: 'pi pi-caret-right',
                command: () => {
                    this.executeDecision('etab');
                }
            },
            {
                label: this.lang.filter_par_labo,
                icon: 'pi pi-caret-right',
                command: () => {
                    this.executeDecision('labo');
                }
            },
            {
                label: this.lang.filter_par_fd,
                icon: 'pi pi-caret-right',
                command: () => {
                    this.executeDecision('fd');
                }
            }, {
                label: this.lang.filter_par_cedoc,
                icon: 'pi pi-caret-right',
                command: () => {
                    this.executeDecision('cedoc');
                }
            }, {
                label: this.lang.filter_all,
                icon: 'pi pi-caret-right',
                command: () => {
                    this.executeDecision('pedoc');
                }
            }, {
                label: this.lang.reinitialiser,
                icon: 'pi pi-replay',
                command: () => {
                    this.executeDecision('reinitialiser');
                }
            },

        ];
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

                //
                labos: this.labos,


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

    executeDecision(decision){
        this.decision = decision;
        this.confirm = true;
    }

    OnAction(event) {
        if (!event.action) {
            this.confirm = false;
            return;
        }
        this.changeStatutLoading = true;

        this.apps.executeDecision({ observation: event.observation },
            this.decision

        ).subscribe(
            (res) => {
                console.log(res);

                this.messageService.add({ detail: this.lang.v18, life: 10000, key: 'toast', severity: 'success', summary: 'Succès!' });
                this.changeStatutLoading = false;
                this.confirm = false;



            },
            (err) => {
                console.log(err);
                this.apps.showErrorMessages(err, this.messageService);
                this.changeStatutLoading = false;

            });

    }

    loadObs() {
        this.loading = true;
        this.query.annee_uni = this.lss.getAnneeUniId();
        this.query.statut_id = 0;
        this.query.etat = 'Etudiant';
        this.ds.getDocs(this.query, {
            noteBourse : 1,
            profs : 1,
            fds : 1,
            bourses: 1,
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
