import {Component, OnInit} from '@angular/core';
import local from '../../../utilities/constants/local';
import {Doctorant, ListItem, Query, User} from '../../../utilities/models';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {AppService} from '../../../utilities/services/app.service';
import {DocsService} from '../../../utilities/services/docs.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {LocalStorageService} from '../../../utilities/services/local-storage.service';
import {EnseignantsService} from '../../../utilities/services/enseignants.service';
import {DocFilterComponent} from '../../components/doc-filter/doc-filter.component';
import {FiltersComponent} from '../../components/filters/filters.component';
import {environment} from '../../../../environments/environment';
import {AddEnsComponent} from '../../components/add-ens/add-ens.component';

@Component({
    selector: 'app-enseignants',
    templateUrl: './enseignants.component.html',
    styleUrls: ['./enseignants.component.css']
})
export class EnseignantsComponent implements OnInit {

    lang = local();
    loading = true;
    confirm = false;
    query: Query = {};
    ref: DynamicDialogRef;
    isAdminPedoc = false;
    fds: ListItem[] = [];
    cedocs: ListItem[] = [];
    labos: ListItem[] = [];
    etabs: ListItem[] = [];
    enseignantGrades: string[] = [];
    genres: string[] = [];
    items: User[] = [];
    total_records: number;
    per_page: number;



    constructor(public dialogService: DialogService,
                private apps: AppService,
                private es: EnseignantsService,
                private confirmationService: ConfirmationService,
                private messageService: MessageService,
                private lss: LocalStorageService,
    ) {
    }

    ngOnInit(): void {
        this.isAdminPedoc = this.lss.isPedocAdmin();
        this.loadObs();
    }

    paginate(event) {
        this.query.page = (event.first / this.per_page) + 1;
        this.loadObs();
    }


    filtrer() {
        this.ref = this.dialogService.open(FiltersComponent, {
            data: {
                fds: this.fds,
                cedocs: this.cedocs,
                labos: this.labos,
                etabs: this.etabs,
                enseignantGrades: this.enseignantGrades,
                genres: this.genres,
                showText: true,
                showEnsGrade: true,
                showCedoc: true,
                showFd: true,
                showLabo: true,
                showEtab: true,



            },
            header: this.lang.filter,
            // width: '40%'
        });
        this.ref.onClose.subscribe((query: Query) => {
            if (query) {
                console.log(query);
                this.total_records = 0;

                this.query = query;

                this.query.page = 1;
                this.loadObs();

            }
        });

    }

    addNewProf() {
        this.ref = this.dialogService.open(AddEnsComponent, {
            data: {
                fds: this.fds,
                cedocs: this.cedocs,
                labos: this.labos,
                etabs: this.etabs,
                enseignantGrades: this.enseignantGrades,
                genres: this.genres,

            },
            header: this.lang.sidemenu_add_prof,
            // width: '40%'
        });
        this.ref.onClose.subscribe((item: User) => {
            if (item) {
                this.items.unshift(item);


            }
        });

    }


    loadObs() {
        this.loading = true;

        this.es.getEnss(this.query, {
            fds: 1,
            labos: 1,
            cedocs: 1,
            etabs: 1,
            enseignant_grades: 1,
            genres: 1,
        }).subscribe(
            (res) => {

                console.log(res);
                this.total_records = res.total;
                this.per_page = res.per_page;
                this.cedocs = res.dataCollections.cedocs;
                this.labos = res.dataCollections.labos;
                this.fds = res.dataCollections.fds;
                this.etabs = res.dataCollections.etabs;
                this.enseignantGrades = res.dataCollections.enseignant_grades;
                this.genres = res.dataCollections.genres;
                this.items = res.items;
                this.loading = false;

            },
            (err) => {
                console.log(err);

                this.loading = false;
            }
        );
    }

    forceLogin(id){
        let url = environment.ens_app_url + '/#/force-login/';
        window.open(url += id + '/' + this.lss.getToken(), '_blank');

    }
    delete(id){
        this.confirmationService.confirm({
            message: this.lang.valide_confirmation_op,
            header: this.lang.valide_confirmation,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

                this.es.delete(id).subscribe(
                    res => {

                        this.apps.showSuccessMessages(this.lang.suc, this.messageService);
                        this.items = this.items.filter(e => e.id !== id);
                    }, err => {
                        console.log(err);
                        this.apps.showErrorMessages(err, this.messageService);

                    });

            },
            reject: (type) => {

            }
        });
    }

    OnChange(event, ens) {

        this.items = this.items.map(e => {
            if (e.id === event.id) return event;
            else return e;
        })
    }

}
