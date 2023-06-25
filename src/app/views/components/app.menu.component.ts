import { P_ADD_SUJETS, P_SHOW_PROFS, P_ADD_PROFS, P_SHOW_FDS, P_ADD_FDS, P_SHOW_SPS, P_ADD_SPS, P_SHOW_OGS,
P_ADD_OGS, P_SHOW_ETABS, P_SHOW_XETABS, P_SHOW_ADMINS, P_SHOW_LABOS, P_SHOW_CEDOCS, R_ADMIN_PEDOC, R_DIR_PEDOC,
P_ACCEPT_SUJETS, P_DOC_CHANGE_STATUT, P_SHOW_DOCS, R_DIR_CEDOC, R_ADMIN_CEDOC, P_SHOW_BOURSE } from './../../utilities/constants/index';
import { LocalStorageService } from '../../utilities/services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import local from 'src/app/utilities/constants/local';
import { P_SHOW_SUJETS } from 'src/app/utilities/constants';

@Component({
    selector: 'app-menu',
    template: `
    <ul class="layout-menu layout-main-menu clearfix">
        <li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
    </ul>
    `
})
export class AppMenuComponent implements OnInit {
    model: any[];
    lang = local();
    constructor(
        private lss: LocalStorageService
    ) { }



    ngOnInit() {
        const prefix = (this.lss.hasRole(R_DIR_PEDOC) || this.lss.hasRole(R_ADMIN_PEDOC)) ? '/' : '/cedoc-';


        const listSujets = [];
        const docs = [
            {
                label: this.lang.sidemenu_docs_encours,
                icon: 'pi pi-fw fas fa-list-ul',
                routerLink: ['/docs-encours']
            },
            {
                label: this.lang.sidemenu_docs_soutenu,
                icon: 'pi pi-fw fas fa-graduation-cap',
                routerLink: [ '/docs-soutenu']
            },
            {
                label: this.lang.sidemenu_docs_tous,
                icon: 'pi pi-fw fas fa-user-graduate',
                routerLink: [ '/doctorants']
            },
        ];


        const inscription = [];
        if (this.lss.hasPermissions(P_ACCEPT_SUJETS)) {
            listSujets.push({
                label: this.lang.sidemenu_sujets_attente, icon: 'pi pi-fw fas fa-hourglass-start', routerLink: [prefix + 'sujetsAttente']
            });
        }
        if (this.lss.hasPermissions(P_SHOW_SUJETS)) {
            listSujets.push({
                label: this.lang.sidemenu_sujets_valides, icon: 'pi pi-fw fas fa-check', routerLink: [prefix + 'sujetsValides']
            });
        }


        if (this.lss.hasRole(R_DIR_PEDOC) ) {


            inscription.push(
                {
                    label: this.lang.sidemenu_docs_statistique,
                    icon: 'pi pi-fw fas fa-chart-pie',
                    routerLink: ['statistiques-preinscription']
                },

            );
        }

        if (this.lss.hasPermissions(P_DOC_CHANGE_STATUT) ) {
            inscription.push(
                {
                    label: this.lang.sidemenu_docs_preinsc,
                    icon: 'pi pi-fw fas fa-list-ul',
                    routerLink: [
                        'preinscription']
                },
            );
            inscription.push(
                {
                    label: this.lang.sidemenu_docs_convocations,
                    icon: 'pi pi-fw fas fa-tasks',
                    routerLink: [
                        'convocations']
                },
            );

            inscription.push(
                {
                    label: this.lang.sidemenu_docs_insc,
                    icon: 'pi pi-fw fas fa-tasks',
                    routerLink: ['inscription']
                },

            );


        }


        this.model = [




            {
                items: [
                    {
                        label: this.lang.sidemenu_accueil, icon: 'pi pi-fw fas fa-home', routerLink: ['']
                    }
                ]
            },



            {
                items: [
                    {
                        label: this.lang.sidemenu_demandes, icon: 'pi pi-fw fas fa-clock', routerLink: ['demandes']
                    }
                ]
            },

            {
                items: [
                    {
                        label: this.lang.sidemenu_rdvs, icon: 'pi pi-fw fas fa-calendar-check', routerLink: [(this.lss.hasRole(R_DIR_PEDOC) || this.lss.hasRole(R_ADMIN_PEDOC)) ? '/rdvs' : '/cedoc-rdvs']
                    }
                ]
            },

            /*{
                items: [
                    {
                        label: this.lang.sidemenu_rdvs,
                        icon: 'pi pi-fw fas fa-calendar-check',
                        routerLink: [(this.lss.hasRole(R_DIR_PEDOC) || this.lss.hasRole(R_ADMIN_PEDOC)) ? '/rdvs' : '/cedoc-rdvs']
                    }
                ]
            },*/

            (this.lss.hasPermissions(P_SHOW_SUJETS)) ? {
                items: [
                    {
                        label: this.lang.sidemenu_sujets, icon: 'pi pi-fw fas fa-list-ul',

                        items: listSujets

                    }
                ]
            } : {},


            (this.lss.hasPermissions(P_SHOW_DOCS)) ? {
                items: [
                    {
                        label: this.lang.sidemenu_docs, icon: 'pi pi-fw fas fa-user-graduate',
                        items: docs

                    }
                ]
            } : {},


            (this.lss.hasPermissions(P_DOC_CHANGE_STATUT)) ? {
                items: [
                    {
                        label: this.lang.sidemenu_docs_insc,
                        icon: 'pi pi-fw fas fa-user-plus',
                        items: inscription
                    }
                ]
            } : {},

            (this.lss.hasPermissions(P_DOC_CHANGE_STATUT)) ? {
                items: [
                    {
                        label: this.lang.sidemenu_docs_reinsc,
                        icon: 'pi pi-fw fas fa-redo',
                        items: [
                            {
                                label: this.lang.sidemenu_docs_reinscrit,
                                icon: 'pi pi-fw fas fa-list-ul',
                                routerLink: ['/reinscrs-docs']
                            },
                            {
                                label: this.lang.sidemenu_docs_not_reinscrit,
                                icon: 'pi pi-fw fas fa-hourglass',
                                routerLink: [ '/not-reinscrs-docs']
                            },
                        ]
                    }
                ]
            } : {},


            (this.lss.isPedocAdmin() ) ? {
                items: [
                    {
                        label: this.lang.sidemenu_bourses,
                        icon: 'pi pi-fw fas fa-coins',
                        items: [
                            {
                                label: this.lang.sidemenu_bourses_news,
                                icon: 'pi pi-fw fas fa-list-ul',
                                routerLink: [ '/new-bourse']
                            },
                            {
                                label: this.lang.sidemenu_bourses_reins,
                                icon: 'pi pi-fw fas fa-redo',
                                routerLink: [ '/reins-bourse']
                            },
                        ]
                    }
                ]
            } : {},

            {
                items: [
                    {
                        label: this.lang.sidemenu_profs, icon: 'pi pi-fw fas fa-chalkboard-teacher', routerLink: ['enseignants']
                    }
                ]
            },


        ];
    }
}
