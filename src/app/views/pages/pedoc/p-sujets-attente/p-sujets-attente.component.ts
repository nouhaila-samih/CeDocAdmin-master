import { LocalStorageService } from './../../../../utilities/services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import local from 'src/app/utilities/constants/local';
import { ListItem, Query, Sujet } from 'src/app/utilities/models';
import { AppService } from 'src/app/utilities/services/app.service';
import { FilterComponent } from 'src/app/views/components/filter/filter.component';

@Component({
  selector: 'app-p-sujets-attente',
  templateUrl: './p-sujets-attente.component.html',
  styleUrls: ['./p-sujets-attente.component.css']
})
export class PSujetsAttenteComponent implements OnInit {

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
        this.query.statut_id = 7;
        this.loadSujets();


    }

    paginate(event) {
        this.query.page = (event.first / this.per_page) + 1;
        this.loadSujets();
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
                showCedocs: true,
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

    changeStatut(sujet_id, statut) {
        this.msgConfirmation = statut === 10
            ? this.lang.valide_confirmation_refuse_sujet
            : this.lang.valide_confirmation_accept_sujet;
        this.sujet_id = sujet_id;
        this.statut = statut;
        this.confirm = true;



    }

    confirme(confirme) {
        if (!confirme) {
            this.refrecheChangeStatutData();
        }else {
            this.changeStatutLoading = true;
            this.appService.changeStatut(this.sujet_id, this.statut, this.observation).subscribe(
                (res) => {

                  this.sujets = this.sujets.filter(ob => ob.id !== this.sujet_id);
                  this.loading = false;

                  this.messageService.add({ detail: this.lang.suc, life: 10000, key: 'toast', severity: 'success', summary: 'Succès!' });
                  this.refrecheChangeStatutData();
                  this.changeStatutLoading = false;


                },
                (err) => {

                  this.loading = false;
                  this.messageService.add({ detail: this.lang.err, life: 10000, key: 'toast', severity: 'error', summary: 'Erreur!' });
                  this.refrecheChangeStatutData();
                  this.changeStatutLoading = false;

                });

        }

    }

    refrecheChangeStatutData(){
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
