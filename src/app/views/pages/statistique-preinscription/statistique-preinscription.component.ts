import {Component, OnInit} from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import {AppService} from '../../../utilities/services/app.service';
import {DocsService} from '../../../utilities/services/docs.service';
import {SujetsService} from '../../../utilities/services/sujets.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {LocalStorageService} from '../../../utilities/services/local-storage.service';
import local from '../../../utilities/constants/local';

@Component({
    selector: 'app-statistique-preinscription',
    templateUrl: './statistique-preinscription.component.html',
    styleUrls: ['./statistique-preinscription.component.css']
})
export class StatistiquePreinscriptionComponent implements OnInit {

    lang = local();
    loading = true;
    data: any = {};
    chartOptions: any;
    basicOptions: any;
    horizontalOptions: any;
    chartComplet: any;
    cedocsData: any;
    fdsData: any;
    labosData: any;
    etabsData: any;
    chartEtat: any;

    constructor(public dialogService: DialogService,
                private apps: AppService,
                private ds: DocsService,
                private sj: SujetsService,
                private confirmationService: ConfirmationService,
                private messageService: MessageService,
                private lss: LocalStorageService,
    ) {
    }

    ngOnInit(): void {
        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            }
        };

        this.basicOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        this.horizontalOptions = {
            indexAxis: 'y',
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };


        this.ds.statistiquesPreinscription().subscribe(res => {
            this.loading = false;
            this.data = res;
            console.log(res);

            this.chartComplet = {
                labels: [this.lang.doc_statut_dossier_c, this.lang.doc_statut_dossier_nc],
                datasets: [
                    {
                        data: [this.data.complet_candidats, this.data.no_complet_candidats],
                        backgroundColor: [
                            '#66BB6A',
                            '#FF3333'
                        ],
                        hoverBackgroundColor: [
                            '#81C784',
                            '#FE0404'
                        ]
                    }
                ]
            };
            this.chartEtat = {
                labels: [this.lang.doc_etat_non_employe, this.lang.doc_etat_employe],
                datasets: [
                    {
                        data: [this.data.etudiants, this.data.employes],
                        backgroundColor: [
                            '#0f9695',
                            '#92127b'
                        ],
                        hoverBackgroundColor: [
                            '#013a39',
                            '#8f0176'
                        ]
                    }
                ]
            };

            const cedocs = [];
            const cedocsComplet = [];
            const cedocsNoComplet = [];

            const fds = [];
            const fdsComplet = [];
            const fdsNoComplet = [];

            const labos = [];
            const labosComplet = [];
            const labosNoComplet = [];

            const etabs = [];
            const etabsComplet = [];
            const etabsNoComplet = [];


            this.data.cedocs?.map(e=>{
                cedocs.push(e.acronyme);
                cedocsComplet.push(e.complet_candidats);
                cedocsNoComplet.push(e.no_complet_candidats);
            });

            this.data.fds?.map(e=>{
                fds.push(e.acronyme);
                fdsComplet.push(e.complet_candidats);
                fdsNoComplet.push(e.no_complet_candidats);
            });

            this.data.labos?.map(e=>{
                labos.push(e.acronyme);
                labosComplet.push(e.complet_candidats);
                labosNoComplet.push(e.no_complet_candidats);
            });


            this.data.etabs?.map(e=>{
                if (!e.acronyme|| typeof e.acronyme !== 'string') return;
                etabs.push(e.acronyme);
                etabsComplet.push(e.complet_candidats);
                etabsNoComplet.push(e.no_complet_candidats);
            });


            this.cedocsData = {
                labels: cedocs,
                datasets: [
                    {
                        label: this.lang.doc_statut_dossier_c,
                        backgroundColor: '#42A5F5',
                        data: cedocsComplet
                    },
                    {
                        label: this.lang.doc_statut_dossier_nc,
                        backgroundColor: '#FFA726',
                        data: cedocsNoComplet
                    }
                ]
            };

            this.fdsData = {
                labels: fds,
                datasets: [
                    {
                        label: this.lang.doc_statut_dossier_c,
                        backgroundColor: '#42A5F5',
                        data: fdsComplet
                    },
                    {
                        label: this.lang.doc_statut_dossier_nc,
                        backgroundColor: '#FFA726',
                        data: fdsNoComplet
                    }
                ]
            };

            this.labosData = {
                labels: labos,
                datasets: [
                    {
                        label: this.lang.doc_statut_dossier_c,
                        backgroundColor: '#42A5F5',
                        data: labosComplet
                    },
                    {
                        label: this.lang.doc_statut_dossier_nc,
                        backgroundColor: '#FFA726',
                        data: labosNoComplet
                    }
                ]
            };

            this.etabsData = {
                labels: etabs,
                datasets: [
                    {
                        label: this.lang.doc_statut_dossier_c,
                        backgroundColor: '#42A5F5',
                        data: etabsComplet
                    },
                    {
                        label: this.lang.doc_statut_dossier_nc,
                        backgroundColor: '#FFA726',
                        data: etabsNoComplet
                    }
                ]
            };

        }, err => {
            this.loading = false;
        });
    }

}
