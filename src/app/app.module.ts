import { AgendaComponent } from "./views/components/agenda/agenda.component";

import { DialogService } from "primeng/dynamicdialog";
import { HttpInterceptorService } from "./utilities/services/http-interceptor.service";
import { PrimeModules } from "./utilities/modules/prime.modules";
import { AppMenuitemComponent } from "./views/components/app.menuitem.component";
import { AppMenuComponent } from "./views/components/app.menu.component";
import {
    NgModule,
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA,
} from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { AppRoutingModule } from "./app-routing.module";
import { LoadingBarHttpClientModule } from "@ngx-loading-bar/http-client";
import { LoadingBarRouterModule } from "@ngx-loading-bar/router";
import { ConfirmationService } from "primeng/api";

import { AppComponent } from "./app.component";

import { MenuService } from "./utilities/services/app.menu.service";

import { LoginComponent } from "./views/pages/login/login.component";
import { ProfilComponent } from "./views/pages/profil/profil.component";
import { ProfilPublicComponent } from "./views/pages/profil-public/profil-public.component";
import { LaboComponent } from "./views/pages/labo/labo.component";
import { MainComponent } from "./views/pages/main/main.component";
import { AppFooterComponent } from "./views/components/app.footer.component";
import { AppProfileComponent } from "./views/components/app.profile.component";
import { AppTopBarComponent } from "./views/components/app.topbar.component";
import { NotFoundComponent } from "./views/pages/not-found/not-found.component";
import { ResetPasswordComponent } from "./views/pages/reset-password/reset-password.component";
import { AppButtonComponent } from "./views/components/app-button/app-button.component";
import { MessageService } from "primeng/api";
import { BreadcrumbComponent } from "./views/components/breadcrumb/breadcrumb.component";
import { SujetStatutComponent } from "./views/components/sujet-statut/sujet-statut.component";
import { EnseignantGradeComponent } from "./views/components/enseignant-grade/enseignant-grade.component";

import { MatButtonModule } from "@angular/material/button";
//27-02-2022

import { MatKeyboardModule } from "angular-onscreen-material-keyboard";
import { FicheEncadComponent } from "./views/pages/fiche-encad/fiche-encad.component";
import { SujetDetailsComponent } from "./views/components/sujet-details/sujet-details.component";
import { PedocComponent } from "./views/pages/pedoc/pedoc.component";
import { ConfigComponent } from "./views/components/config/config.component";
import { DashboardComponent } from "./views/containers/dashboard/dashboard.component";
import { CommonModule } from "@angular/common";
import { PListFdsComponent } from "./views/pages/pedoc/p-list-fds/p-list-fds.component";
import { PListSpsComponent } from "./views/pages/pedoc/p-list-sps/p-list-sps.component";
import { PListSujetsComponent } from "./views/pages/pedoc/p-list-sujets/p-list-sujets.component";
import { PListProfsComponent } from "./views/pages/pedoc/p-list-profs/p-list-profs.component";
import { PListCedocsComponent } from "./views/pages/pedoc/p-list-cedocs/p-list-cedocs.component";
import { CedocComponent } from "./views/pages/cedoc/cedoc.component";
import { CListFdsComponent } from "./views/pages/cedoc/c-list-fds/c-list-fds.component";
import { CListSpsComponent } from "./views/pages/cedoc/c-list-sps/c-list-sps.component";
import { CListSujetsComponent } from "./views/pages/cedoc/c-list-sujets/c-list-sujets.component";
import { CListProfsComponent } from "./views/pages/cedoc/c-list-profs/c-list-profs.component";
import { PSujetsAttenteComponent } from "./views/pages/pedoc/p-sujets-attente/p-sujets-attente.component";
import { CSujetsAttenteComponent } from "./views/pages/cedoc/c-sujets-attente/c-sujets-attente.component";
import { PSujetsValidesComponent } from "./views/pages/pedoc/p-sujets-valides/p-sujets-valides.component";
import { CSujetsValidesComponent } from "./views/pages/cedoc/c-sujets-valides/c-sujets-valides.component";
import { DocStatutComponent } from "./views/components/doc-statut/doc-statut.component";
import { PPreinscComponent } from "./views/pages/pedoc/p-preinsc/p-preinsc.component";
import { CPreinscComponent } from "./views/pages/cedoc/c-preinsc/c-preinsc.component";
import { DocFilterComponent } from "./views/components/doc-filter/doc-filter.component";
import { CInscriptionComponent } from "./views/pages/cedoc/c-inscription/c-inscription.component";
import { CDoctorantsComponent } from "./views/pages/cedoc/c-doctorants/c-doctorants.component";
import { ObConfirmComponent } from "./views/components/ob-confirm/ob-confirm.component";
import { PDoctorantsComponent } from "./views/pages/pedoc/p-doctorants/p-doctorants.component";
import { PNewboursierComponent } from "./views/pages/pedoc/p-newboursier/p-newboursier.component";
import { CNewboursierComponent } from "./views/pages/cedoc/c-newboursier/c-newboursier.component";
import { FullDocDetailsComponent } from "./views/components/full-doc-details/full-doc-details.component";
import { PReinscboursierComponent } from "./views/pages/pedoc/p-reinscboursier/p-reinscboursier.component";
import { CReinscboursierComponent } from "./views/pages/cedoc/c-reinscboursier/c-reinscboursier.component";
import { CEncoursDocsComponent } from "./views/pages/cedoc/c-encours-docs/c-encours-docs.component";
import { PEncoursDocsComponent } from "./views/pages/pedoc/p-encours-docs/p-encours-docs.component";
import { PSoutenuDocsComponent } from "./views/pages/pedoc/p-soutenu-docs/p-soutenu-docs.component";
import { CSoutenuDocsComponent } from "./views/pages/cedoc/c-soutenu-docs/c-soutenu-docs.component";
import { CReinscrDocsComponent } from "./views/pages/cedoc/c-reinscr-docs/c-reinscr-docs.component";
import { CNotReinscrDocsComponent } from "./views/pages/cedoc/c-not-reinscr-docs/c-not-reinscr-docs.component";
import { PNotReinscrDocsComponent } from "./views/pages/pedoc/p-not-reinscr-docs/p-not-reinscr-docs.component";
import { PReinscrDocsComponent } from "./views/pages/pedoc/p-reinscr-docs/p-reinscr-docs.component";
import { PInscriptionsComponent } from "./views/pages/pedoc/p-inscriptions/p-inscriptions.component";
import { CartEtdComponent } from "./views/pages/cart-etd/cart-etd.component";
import { FilterComponent } from "./views/components/filter/filter.component";
import { IdcardComponent } from "./views/components/idcard/idcard.component";
import { IdcardpreviewComponent } from "./views/components/idcardpreview/idcardpreview.component";

import { NgxPrintModule } from "ngx-print";
import { QRCodeModule } from "angularx-qrcode";
import { SvgIdBackTextComponent } from "./views/components/svg-id-back-text/svg-id-back-text.component";
import { PRdvsComponent } from "./views/pages/pedoc/p-rdvs/p-rdvs.component";
import { RdvDeatilsComponent } from "./views/components/rdv-deatils/rdv-deatils.component";
import { CRdvsComponent } from "./views/pages/cedoc/c-rdvs/c-rdvs.component";
import { UpdateDocComponent } from "./views/pages/update-doc/update-doc.component";
import { ExportsComponent } from "./views/pages/exports/exports.component";
import { DocExportComponent } from "./views/components/doc-export/doc-export.component";
import { RdvStatutComponent } from "./views/components/rdv-statut/rdv-statut.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RdvReprogrammerComponent } from './views/components/rdv-reprogrammer/rdv-reprogrammer.component';
import { StatutComponent } from "./views/components/statut/statut.component";
import { DemandesComponent } from "./views/pages/demandes/demandes.component";
import { PreinscriptionComponent } from './views/pages/docs/preinscription/preinscription.component';
import { DocDetailsComponent } from './views/components/doc-details/doc-details.component';
import { ConvocationsComponent } from './views/pages/docs/convocations/convocations.component';
import { SujetFilterComponent } from './views/components/sujet-filter/sujet-filter.component';
import { InscriptionsComponent } from './views/pages/docs/inscriptions/inscriptions.component';
import { StatistiquePreinscriptionComponent } from './views/pages/statistique-preinscription/statistique-preinscription.component';
import { DoctorantsComponent } from './views/pages/doctorants/doctorants.component';
import { EncoursComponent } from './views/pages/encours/encours.component';
import { SoutenuComponent } from './views/pages/soutenu/soutenu.component';
import { NewBoursierComponent } from './views/pages/new-boursier/new-boursier.component';
import { ReinscBoursierComponent } from './views/pages/reinsc-boursier/reinsc-boursier.component';
import { ReinscrDocsComponent } from './views/pages/reinscr-docs/reinscr-docs.component';
import { NotReinscrDocsComponent } from './views/pages/not-reinscr-docs/not-reinscr-docs.component';
import { FullEnsDetailsComponent } from './views/components/full-ens-details/full-ens-details.component';
import { EnseignantsComponent } from './views/pages/enseignants/enseignants.component';
import { FiltersComponent } from './views/components/filters/filters.component';
import { AddEnsComponent } from './views/components/add-ens/add-ens.component';
import { LivretComponent } from './views/pages/livret/livret.component';
import { FtsHoursComponent } from './views/components/fts-hours/fts-hours.component';
import { AccomplishmentsComponent } from './views/pages/accomplishments/accomplishments.component';
import { FtDetailsComponent } from './views/components/ft-details/ft-details.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        PrimeModules,
        LoadingBarHttpClientModule,
        LoadingBarRouterModule,
        MatButtonModule,
        MatKeyboardModule,
        NgxPrintModule,
        QRCodeModule,
        NgbModule,
    ],
    declarations: [
        AppComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppProfileComponent,
        LoginComponent,
        ProfilComponent,
        FilterComponent,
        ProfilPublicComponent,
        LaboComponent,
        MainComponent,
        NotFoundComponent,
        ResetPasswordComponent,
        AppButtonComponent,
        BreadcrumbComponent,
        SujetStatutComponent,
        EnseignantGradeComponent,
        FicheEncadComponent,
        SujetDetailsComponent,

        PedocComponent,

        DashboardComponent,
        ConfigComponent,
        PListFdsComponent,
        PListSpsComponent,
        PListSujetsComponent,
        PListProfsComponent,
        PListCedocsComponent,

        CedocComponent,

        CListFdsComponent,

        CListSpsComponent,

        CListSujetsComponent,

        CListProfsComponent,

        PSujetsAttenteComponent,

        CSujetsAttenteComponent,

        PSujetsValidesComponent,

        CSujetsValidesComponent,
        DocStatutComponent,
        PPreinscComponent,
        CPreinscComponent,

        DocFilterComponent,
        CInscriptionComponent,

        CDoctorantsComponent,
        ObConfirmComponent,
        PDoctorantsComponent,
        PNewboursierComponent,
        CNewboursierComponent,
        FullDocDetailsComponent,
        PReinscboursierComponent,
        CReinscboursierComponent,
        CEncoursDocsComponent,
        PEncoursDocsComponent,
        PSoutenuDocsComponent,
        CSoutenuDocsComponent,
        CReinscrDocsComponent,
        CNotReinscrDocsComponent,
        PNotReinscrDocsComponent,
        PReinscrDocsComponent,
        PInscriptionsComponent,
        CartEtdComponent,
        IdcardComponent,
        IdcardpreviewComponent,
        SvgIdBackTextComponent,
        CRdvsComponent,
        PRdvsComponent,
        RdvDeatilsComponent,
        UpdateDocComponent,
        ExportsComponent,
        DocExportComponent,
        RdvStatutComponent,
        AgendaComponent,
        RdvReprogrammerComponent,
        StatutComponent,
        DemandesComponent,
        PreinscriptionComponent,
        DocDetailsComponent,
        ConvocationsComponent,
        SujetFilterComponent,
        InscriptionsComponent,
        StatistiquePreinscriptionComponent,
        DoctorantsComponent,
        EncoursComponent,
        SoutenuComponent,
        NewBoursierComponent,
        ReinscBoursierComponent,
        ReinscrDocsComponent,
        NotReinscrDocsComponent,
        FullEnsDetailsComponent,
        EnseignantsComponent,
        FiltersComponent,
        AddEnsComponent,
        LivretComponent,
        FtsHoursComponent,
        AccomplishmentsComponent,
        FtDetailsComponent,

    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        //NO_ERRORS_SCHEMA,
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: MessageService },
        { provide: DialogService },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true,
        },

        ConfirmationService,
        MenuService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
