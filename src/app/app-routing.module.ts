import { FullDocDetailsComponent } from "./views/components/full-doc-details/full-doc-details.component";
import { RdvDeatilsComponent } from "./views/components/rdv-deatils/rdv-deatils.component";
import { PDoctorantsComponent } from "./views/pages/pedoc/p-doctorants/p-doctorants.component";
import { CDoctorantsComponent } from "./views/pages/cedoc/c-doctorants/c-doctorants.component";
import { RoleGuard } from "./utilities/auth/role.guard";
import { CInscriptionComponent } from "./views/pages/cedoc/c-inscription/c-inscription.component";
import { PListFdsComponent } from "./views/pages/pedoc/p-list-fds/p-list-fds.component";
import { CListFdsComponent } from "./views/pages/cedoc/c-list-fds/c-list-fds.component";
import { CListSpsComponent } from "./views/pages/cedoc/c-list-sps/c-list-sps.component";
import { CSujetsValidesComponent } from "./views/pages/cedoc/c-sujets-valides/c-sujets-valides.component";
import { PSujetsValidesComponent } from "./views/pages/pedoc/p-sujets-valides/p-sujets-valides.component";

import {
    P_SHOW_SPS,
    P_ACCEPT_SUJETS,
    P_SHOW_FDS,
    P_DOC_CHANGE_STATUT,
    R_DIR_PEDOC,
    R_DIR_CEDOC,
    P_SHOW_BOURSE,
    R_ADMIN_CEDOC,
    R_ADMIN_PEDOC,
    R_SUPER_ADMIN,
} from "./utilities/constants/index";
import {
    P_PUT_PROFS,
    P_ADD_SUJETS,
    P_PUT_SUJETS,
    P_SHOW_SUJETS,
    P_SHOW_FICHE_ENCAD,
} from "./utilities/constants";
import { PermissionsGuard } from "./utilities/auth/permissions.guard";
import { FicheEncadComponent } from "./views/pages/fiche-encad/fiche-encad.component";

import { NonAuthGuard } from "./utilities/auth/non-auth.guard";
import { AuthGuard } from "./utilities/auth/auth.guard";
import { ResetPasswordComponent } from "./views/pages/reset-password/reset-password.component";
import { LoginComponent } from "./views/pages/login/login.component";
import { ProfilPublicComponent } from "./views/pages/profil-public/profil-public.component";
import { ProfilComponent } from "./views/pages/profil/profil.component";
import { LaboComponent } from "./views/pages/labo/labo.component";
import { MainComponent } from "./views/pages/main/main.component";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { NotFoundComponent } from "./views/pages/not-found/not-found.component";
import { DashboardComponent } from "./views/containers/dashboard/dashboard.component";
import { PSujetsAttenteComponent } from "./views/pages/pedoc/p-sujets-attente/p-sujets-attente.component";
import { CSujetsAttenteComponent } from "./views/pages/cedoc/c-sujets-attente/c-sujets-attente.component";
import { PListSpsComponent } from "./views/pages/pedoc/p-list-sps/p-list-sps.component";
import { CPreinscComponent } from "./views/pages/cedoc/c-preinsc/c-preinsc.component";
import { PPreinscComponent } from "./views/pages/pedoc/p-preinsc/p-preinsc.component";
import { PNewboursierComponent } from "./views/pages/pedoc/p-newboursier/p-newboursier.component";
import { CNewboursierComponent } from "./views/pages/cedoc/c-newboursier/c-newboursier.component";
import { CReinscboursierComponent } from "./views/pages/cedoc/c-reinscboursier/c-reinscboursier.component";
import { PReinscboursierComponent } from "./views/pages/pedoc/p-reinscboursier/p-reinscboursier.component";
import { CEncoursDocsComponent } from "./views/pages/cedoc/c-encours-docs/c-encours-docs.component";
import { PEncoursDocsComponent } from "./views/pages/pedoc/p-encours-docs/p-encours-docs.component";
import { CSoutenuDocsComponent } from "./views/pages/cedoc/c-soutenu-docs/c-soutenu-docs.component";
import { PSoutenuDocsComponent } from "./views/pages/pedoc/p-soutenu-docs/p-soutenu-docs.component";
import { CNotReinscrDocsComponent } from "./views/pages/cedoc/c-not-reinscr-docs/c-not-reinscr-docs.component";
import { PNotReinscrDocsComponent } from "./views/pages/pedoc/p-not-reinscr-docs/p-not-reinscr-docs.component";
import { CReinscrDocsComponent } from "./views/pages/cedoc/c-reinscr-docs/c-reinscr-docs.component";
import { PReinscrDocsComponent } from "./views/pages/pedoc/p-reinscr-docs/p-reinscr-docs.component";
import { PInscriptionsComponent } from "./views/pages/pedoc/p-inscriptions/p-inscriptions.component";
import { CartEtdComponent } from "./views/pages/cart-etd/cart-etd.component";
import { PRdvsComponent } from "./views/pages/pedoc/p-rdvs/p-rdvs.component";
import { CRdvsComponent } from "./views/pages/cedoc/c-rdvs/c-rdvs.component";
import { UpdateDocComponent } from "./views/pages/update-doc/update-doc.component";
import { ExportsComponent } from "./views/pages/exports/exports.component";
import { DocExportComponent } from "./views/components/doc-export/doc-export.component";
import { DemandesComponent } from "./views/pages/demandes/demandes.component";
import {PreinscriptionComponent} from './views/pages/docs/preinscription/preinscription.component';
import {ConvocationsComponent} from './views/pages/docs/convocations/convocations.component';
import {InscriptionsComponent} from './views/pages/docs/inscriptions/inscriptions.component';
import {StatistiquePreinscriptionComponent} from './views/pages/statistique-preinscription/statistique-preinscription.component';
import {DoctorantsComponent} from './views/pages/doctorants/doctorants.component';
import {SoutenuComponent} from './views/pages/soutenu/soutenu.component';
import {EncoursComponent} from './views/pages/encours/encours.component';
import {NewBoursierComponent} from './views/pages/new-boursier/new-boursier.component';
import {ReinscBoursierComponent} from './views/pages/reinsc-boursier/reinsc-boursier.component';
import {ReinscrDocsComponent} from './views/pages/reinscr-docs/reinscr-docs.component';
import {NotReinscrDocsComponent} from './views/pages/not-reinscr-docs/not-reinscr-docs.component';
import {EnseignantsComponent} from './views/pages/enseignants/enseignants.component';
import { LivretComponent } from "./views/pages/livret/livret.component";
import { AccomplishmentsComponent } from "./views/pages/accomplishments/accomplishments.component";

//27-02-2022
//import { FullDocDetailsComponent } from './views/components/rdv-deatils/rdv-deatils.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: "",
                    component: MainComponent,
                    canActivate: [AuthGuard],
                    canActivateChild: [AuthGuard],
                    children: [
                        { path: "", component: DashboardComponent },

                        {
                            path: "preinscription",
                            component: PreinscriptionComponent,
                            canActivate: [PermissionsGuard],
                            data: { permissions: [P_DOC_CHANGE_STATUT] },
                        },

                        {
                            path: "convocations",
                            component: ConvocationsComponent,
                            canActivate: [PermissionsGuard],
                            data: { permissions: [P_DOC_CHANGE_STATUT] },
                        },

                        {
                            path: "demandes",
                            component: DemandesComponent,
                            canActivate: [PermissionsGuard],
                            data: { permissions: [P_DOC_CHANGE_STATUT] },
                        },

                        {
                            path: "new-bourse",
                            component: NewBoursierComponent,
                            canActivate: [PermissionsGuard],
                            data: { permissions: [P_SHOW_BOURSE] },
                        },

                        {
                            path: "reins-bourse",
                            component: ReinscBoursierComponent,
                            canActivate: [PermissionsGuard],
                            data: { permissions: [P_SHOW_BOURSE] },
                        },

                        {
                            path: "cart-etudiant/:id",
                            component: CartEtdComponent,
                            canActivate: [PermissionsGuard],
                            data: { permissions: [P_DOC_CHANGE_STATUT] },
                        },
                        {
                            path: "livret/:id",
                            component: LivretComponent,
                            canActivate: [RoleGuard],
                            data: {
                                roles: [
                                    R_DIR_PEDOC,
                                    R_ADMIN_PEDOC,
                                    R_DIR_CEDOC,
                                    R_ADMIN_CEDOC,
                                ],
                            },
                        },
                        {
                            path: "accomplishments/:id",
                            component: AccomplishmentsComponent,
                            canActivate: [PermissionsGuard],
                            data: { permissions: [P_DOC_CHANGE_STATUT] },
                        },

                        {
                            path: "edit-doc/:id",
                            component: UpdateDocComponent,
                            canActivate: [PermissionsGuard],
                            data: { permissions: [P_DOC_CHANGE_STATUT] },
                        },

                        {
                            path: "exports",
                            component: DocExportComponent,
                            canActivate: [PermissionsGuard],
                            data: { permissions: [P_DOC_CHANGE_STATUT] },
                        },

                        {
                            path: "not-reinscrs-docs",
                            component: NotReinscrDocsComponent,
                            canActivate: [PermissionsGuard],
                            data: { permissions: [P_DOC_CHANGE_STATUT] },
                        },

                        {
                            path: "reinscrs-docs",
                            component: ReinscrDocsComponent,
                            canActivate: [PermissionsGuard],
                            data: { permissions: [P_DOC_CHANGE_STATUT] },
                        },

                        {
                            path: "cedoc-rdvs",
                            component: CRdvsComponent,
                            canActivate: [RoleGuard],
                            data: { roles: [R_DIR_CEDOC, R_ADMIN_CEDOC] },
                        },
                        {
                            path: "enseignants",
                            component: EnseignantsComponent,
                        },

                        {
                            path: "rdvs",
                            component: PRdvsComponent,
                            canActivate: [RoleGuard],
                            data: {
                                roles: [
                                    R_DIR_PEDOC,
                                    R_ADMIN_PEDOC,
                                    R_SUPER_ADMIN,
                                ],
                            },
                        },

                        {
                            path: "docs-soutenu",
                            component: SoutenuComponent,
                            canActivate: [PermissionsGuard],
                            data: { permissions: [P_DOC_CHANGE_STATUT] },
                        },

                        {
                            path: "docs-encours",
                            component: EncoursComponent,
                            canActivate: [PermissionsGuard],
                            data: { permissions: [P_DOC_CHANGE_STATUT] },
                        },

                        {
                            path: "inscription",
                            component: InscriptionsComponent,
                            canActivate: [PermissionsGuard],
                            data: { permissions: [P_DOC_CHANGE_STATUT] },
                        },
                        {
                            path: "statistiques-preinscription",
                            component: StatistiquePreinscriptionComponent,
                            canActivate: [RoleGuard],
                            data: { roles: [R_DIR_PEDOC] },
                        },

                        {
                            path: "doctorants",
                            component: DoctorantsComponent,
                            canActivate: [PermissionsGuard],
                            data: { permissions: [P_DOC_CHANGE_STATUT] },
                        },

                        {
                            path: "cedoc-preinscription",
                            component: CPreinscComponent,
                            canActivate: [RoleGuard],
                            data: { roles: [R_DIR_CEDOC] },
                        },
                        {
                            path: "preinscription",
                            component: PPreinscComponent,
                            canActivate: [RoleGuard],
                            data: { roles: [R_DIR_PEDOC] },
                        },

                        {
                            path: "sujetsAttente",
                            component: PSujetsAttenteComponent,
                            canActivate: [PermissionsGuard],
                            data: { permissions: [P_ACCEPT_SUJETS] },
                        },

                        {
                            path: "cedoc-sujetsAttente",
                            component: CSujetsAttenteComponent,
                            canActivate: [PermissionsGuard],
                            data: { permissions: [P_ACCEPT_SUJETS] },
                        },
                        {
                            path: "sujetsValides",
                            component: PSujetsValidesComponent,
                            canActivate: [PermissionsGuard],
                            data: { permissions: [P_SHOW_SUJETS] },
                        },
                        {
                            path: "cedoc-sujetsValides",
                            component: CSujetsValidesComponent,
                            canActivate: [PermissionsGuard],
                            data: { permissions: [P_SHOW_SUJETS] },
                        },
                        {
                            path: "cedoc-specialites",
                            component: CListSpsComponent,
                            canActivate: [PermissionsGuard],
                            data: { permissions: [P_SHOW_SPS] },
                        },
                        {
                            path: "specialites",
                            component: PListSpsComponent,
                            canActivate: [PermissionsGuard],
                            data: { permissions: [P_SHOW_SPS] },
                        },
                        {
                            path: "cedoc-fds",
                            component: CListFdsComponent,
                            canActivate: [PermissionsGuard],
                            data: { permissions: [P_SHOW_FDS] },
                        },
                        {
                            path: "fds",
                            component: PListFdsComponent,
                            canActivate: [PermissionsGuard],
                            data: { permissions: [P_SHOW_FDS] },
                        },

                        { path: "profil", component: ProfilComponent },
                        {
                            path: "profil/:id",
                            component: ProfilPublicComponent,
                            canActivate: [PermissionsGuard],
                            data: { permissions: [P_PUT_PROFS] },
                        },

                        {
                            path: "ficheEncad",
                            component: FicheEncadComponent,
                            canActivate: [PermissionsGuard],
                            data: { permissions: [P_SHOW_FICHE_ENCAD] },
                        },
                    ],
                },
                { path: "notfound", component: NotFoundComponent },
                {
                    path: "login",
                    component: LoginComponent,
                    canActivate: [NonAuthGuard],
                },
                {
                    path: "changePassword",
                    component: ResetPasswordComponent,
                    canActivate: [NonAuthGuard],
                },
                { path: "**", redirectTo: "/notfound" },
            ],
            { scrollPositionRestoration: "enabled" }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
