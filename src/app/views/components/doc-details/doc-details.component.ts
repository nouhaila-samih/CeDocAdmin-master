import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import local from '../../../utilities/constants/local';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {ListItem} from '../../../utilities/models';
import {AppService} from '../../../utilities/services/app.service';
import {LocalStorageService} from '../../../utilities/services/local-storage.service';
import {toFormData} from '../../../utilities/helpers';
import {DocsService} from '../../../utilities/services/docs.service';
import { Router } from '@angular/router';

@Component({
    selector: "app-doc-details",
    templateUrl: "./doc-details.component.html",
    styleUrls: ["./doc-details.component.css"],
})
export class DocDetailsComponent implements OnInit {
    loading = true;
    doc: any = {};
    lang = local();
    items: MenuItem[] = [];
    actionitems: MenuItem[] = [];
    statutItems: MenuItem[] = [];
    inscStatutItems: MenuItem[] = [];
    reinscStatutItems: MenuItem[] = [];
    inscValidationtItems: MenuItem[] = [];
    bourseItems: MenuItem[] = [];
    attestationItems: MenuItem[] = [];
    editItems: MenuItem[] = [{ label: "modifier" }];

    msgConfirmation = this.lang.valide_confirmation_op;
    changeStatutLoading = false;
    showPiecesManquantes = true;
    confirm = false;
    actionType: string;
    dossierModal = false;
    fichesModal = false;
    statut: number;
    inscr_date: string = null;
    observation: string = null;
    dossierForm: FormGroup;
    admisForm: FormGroup;
    stateOptions: any[];

    force_login_url = environment.doc_app_url + "/#/force-login/";
    ficher_inscri_url =
        environment.api_url + "/administration/doctorants/fiches/ficheInsc/";
    ficher_preinscri_url =
        environment.api_url + "/administration/doctorants/fiches/fichePreinsc/";
    ficher_depot_url =
        environment.api_url + "/administration/doctorants/fiches/ficheDepot/";
    atte_reinsc_url =
        environment.api_url +
        "/administration/doctorants/fiches/getAtteReinscr/";
    attestation_reinsc_url =
        environment.api_url +
        "/administration/doctorants/fiches/getAttestationReinscr/";
    atte_insc_url =
        environment.api_url + "/administration/doctorants/fiches/getAtteInscr/";

    @Input() id = null;
    @Input() options: any = {};

    @Input() inscr_status: ListItem[] = [];
    @Input() statuses: ListItem[] = [];
    @Input() reinscr_statuses: ListItem[] = [];
    @Input() bourses: ListItem[] = [];

    @Input() showPersonal = true;
    @Input() showParcours = false;
    @Input() showReinsc = false;
    @Input() showAttestations = false;
    @Input() showMerite = false;
    @Input() showDossier = false;
    @Input() showObs = true;
    @Input() showOperations = true;
    @Input() showActions = false;
    @Input() showActionsAttestations = true;
    @Input() showActionInscritStatut = false;
    @Input() showActionStatut = false;
    @Input() showActionReinscritStatut = false;
    @Input() showActionEtapes = false;
    @Input() showActionBourse = false;
    @Input() showActionAttestation = false;
    @Input() showNotePreselection = false;
    @Input() showNoteOral = false;
    @Input() showNoteBourse = false;
    @Input() showProdSci = false;
    @Input() showFts = false;
    @Input() showBourse = false;
    @Input() showLivret = false;
    @Input() showActionEdit = false;
    @Input() showActionForceLogin = false;
    @Input() showSujet = true;
    @Input() showStatuts = true;
    @Input() showInscValidationt = false;

    @Input() actionLable = this.lang.t_dossier;
    @Input() actionAttestationLable = this.lang.t_attestation;
    @Input() actionInscritStatutLable = this.lang.modifier;
    @Input() actionStatutLable = this.lang.modifier;
    @Input() actionReinsStatutLable = this.lang.t_statut_reinsc;
    @Input() actionEtapesLable = this.lang.modifier;
    @Input() actionBourseLable = this.lang.modifier;
    @Input() actionAttestationsLable = this.lang.ajouter;

    @Output() OnChange = new EventEmitter<any>();

    constructor(
        private apps: AppService,
        public dc: DocsService,
        public lss: LocalStorageService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.dc.getDoc(this.id).subscribe(
            (res) => {
                this.doc = res.doc;
                this.loading = false;
                console.log(this.doc);

                this.actionitems = [
                    {
                        label: this.lang.login,
                        icon: "pi pi-sign-in",
                        target: "blank",
                        url: this.force_login_url,
                    },
                ];

                if (this.doc.check_register)
                    this.actionitems.push({
                        label: this.lang.modifier,
                        icon: "pi pi-user-edit",
                        routerLink: "/edit-doc/" + this.id,
                    });
            },
            (err) => {
                this.loading = false;
                this.apps.showErrorMessages(err, this.messageService);
                console.log(err);
            }
        );

        this.force_login_url += this.id + "/" + this.lss.getToken();
        this.ficher_inscri_url += this.id + "?token=" + this.lss.getToken();
        this.ficher_preinscri_url += this.id + "?token=" + this.lss.getToken();
        this.ficher_depot_url += this.id + "?token=" + this.lss.getToken();
        this.atte_reinsc_url += this.id + "?token=" + this.lss.getToken();
        this.atte_insc_url += this.id + "?token=" + this.lss.getToken();
        this.stateOptions = [
            { label: this.lang.doc_statut_dossier_nc, value: "no" },
            { label: this.lang.doc_statut_dossier_c, value: "yes" },
        ];

        this.dossierForm = new FormGroup({
            pieces_manquantes: new FormControl(null),
            etat_dossier: new FormControl(
                { label: null, value: null },
                Validators.required
            ),
        });

        this.admisForm = new FormGroup({
            observation: new FormControl(null),
            pieces_manquantes: new FormControl(null),
            etat_dossier: new FormControl(
                { label: null, value: null },
                Validators.required
            ),
        });

        this.bourses.forEach((e) => {
            this.bourseItems.push({
                label: e.label,
                command: () => {
                    this.changeBourse(e.value);
                },
            });
        });

        this.statuses.forEach((e) => {
            this.statutItems.push({
                label: e.label,
                command: () => {
                    this.changeStatut(e.value);
                },
            });
        });

        console.log("this.inscr_status", this.inscr_status);
        this.inscr_status.forEach((e) => {
            this.inscStatutItems.push({
                label: e.label,
                command: () => {
                    this.changeInscStatut(e.value);
                },
            });
        });

        this.reinscStatutItems.push({
            label: this.lang.reinitialiser,
            command: () => {
                this.changeReinscrStatut(0);
            },
        });

        this.reinscr_statuses.forEach((e) => {
            this.reinscStatutItems.push({
                label: e.label,
                command: () => {
                    this.changeReinscrStatut(e.value);
                },
            });
        });

        this.inscValidationtItems = [
            {
                label: this.lang.doc_statut_valider,
                icon: "pi pi-check",
                command: () => {
                    this.changeInscStatut(80);
                },
            },
            {
                label: this.lang.doc_statut_refuser,
                icon: "pi pi-times",
                command: () => {
                    this.changeInscStatut(70);
                },
            },
        ];

        this.attestationItems = [
            {
                label: this.lang.retrait_inscr,
                icon: "pi pi-file-pdf",
                command: () => {
                    this.addRetrait("insc");
                },
            },
            {
                label: this.lang.retrait_reinscr,
                icon: "pi pi-file-pdf",
                command: () => {
                    this.addRetrait("reinsc");
                },
            },
            {
                label: this.lang.retrait_id,
                icon: "pi pi-id-card",
                command: () => {
                    this.addRetrait("id");
                },
            },
        ];

        this.items = [
            {
                label: this.lang.doc_atte_inscr,
                icon: "pi pi-download",
                url: this.atte_insc_url,
                target: "_blank",
            },

            {
                label: this.lang.doc_atte_reinscr,
                icon: "pi pi-download",
                url: this.atte_reinsc_url,
                target: "_blank",
            },

            {
                label: this.lang.doc_fiche_preinscri,
                icon: "pi pi-download",
                url: this.ficher_preinscri_url,
                target: "_blank",
            },

            {
                label: this.lang.doc_fiche_inscri,
                icon: "pi pi-download",
                url: this.ficher_inscri_url,
                target: "_blank",
            },

            {
                label: this.lang.doc_fiche_depot,
                icon: "pi pi-download",
                url: this.ficher_depot_url,
                target: "_blank",
            },

            {
                label: this.lang.doc_cate_etd,
                icon: "pi pi-download",
                routerLink: ["/cart-etudiant", this.id],
            },
        ];
    }

    getAttetstationReinscrUrl(reiscr_id) {
        this.attestation_reinsc_url =
            environment.api_url +
            "/administration/doctorants/fiches/getAttestationReinscr/" +
            this.id +
            "/" +
            reiscr_id +
            "?token=" +
            this.lss.getToken();
        return this.attestation_reinsc_url;
    }

    getReleveUrl(file) {
        return (
            environment.app_url +
            "/public/doctorants/" +
            this.id +
            "/parcours/" +
            file
        );
    }

    setDossier() {
        this.dossierModal = true;
    }

    getLivret(idd: string) {
        this.router.navigateByUrl(`/livret/${idd}`);
    }
    getAcc(idd: string) {
        this.router.navigateByUrl(`/accomplishments/${idd}`);
    }
    addDossier(choix: boolean) {
        if (!choix) {
            this.dossierModal = false;
            return;
        }
        this.changeStatutLoading = true;

        this.onDone(
            this.dc.setDossier(toFormData(this.dossierForm.value), this.doc.id)
        );
    }

    setStatut(data) {
        this.changeStatutLoading = true;

        this.onDone(this.dc.changeStatus(data, this.doc.id, this.statut));
    }
    setReinsStatut(data) {
        this.changeStatutLoading = true;

        this.apps
            .setReinsStatut(data, this.doc.id, this.statut, "cedoc")
            .subscribe(
                (res) => {
                    this.messageService.add({
                        detail: this.lang.v18,
                        life: 10000,
                        key: "toast",
                        severity: "success",
                        summary: "Succès!",
                    });
                    this.changeStatutLoading = false;
                    this.confirm = false;
                    this.doc.reinscr_statut =
                        this.statut !== 0 ? this.statut : null;
                    this.doc.reinscs = res.reinscs;
                    this.OnChange.emit(this.doc);
                },
                (err) => {
                    console.log(err);
                    this.showErrorMessages(err);
                    this.changeStatutLoading = false;
                }
            );
    }

    setInscStatut(data) {
        this.changeStatutLoading = true;

        this.apps
            .setInscStatut(data, this.doc.id, this.statut, "cedoc")
            .subscribe(
                (res) => {
                    this.messageService.add({
                        detail: this.lang.v18,
                        life: 10000,
                        key: "toast",
                        severity: "success",
                        summary: "Succès!",
                    });
                    this.changeStatutLoading = false;
                    this.confirm = false;
                    this.doc.inscr_statut = this.statut;
                    this.OnChange.emit(this.doc);
                },
                (err) => {
                    console.log(err);
                    this.showErrorMessages(err);
                    this.changeStatutLoading = false;
                }
            );
    }

    setInscEtape(data) {
        this.changeStatutLoading = true;

        this.apps
            .setInscEtape(data, this.doc.id, this.statut, "cedoc")
            .subscribe(
                (res) => {
                    this.messageService.add({
                        detail: this.lang.v18,
                        life: 10000,
                        key: "toast",
                        severity: "success",
                        summary: "Succès!",
                    });
                    this.changeStatutLoading = false;
                    this.confirm = false;
                    this.doc.inscr_etape = this.statut;
                    this.OnChange.emit(this.doc);
                },
                (err) => {
                    console.log(err);
                    this.showErrorMessages(err);
                    this.changeStatutLoading = false;
                }
            );
    }

    setBourse(data) {
        this.changeStatutLoading = true;

        this.onDone(this.dc.setBourse(data, this.doc.id, this.statut));
    }

    validerInscription(data) {
        this.changeStatutLoading = true;
        this.dc
            .changeInscriptionStatus(data, this.doc.id, this.statut)
            .subscribe(
                (res) => {
                    this.doc = res.doc;
                    this.loading = false;
                    this.changeStatutLoading = false;
                    this.confirm = false;
                    console.log(this.doc);
                    this.OnChange.emit(this.doc);

                    this.apps.showSuccessMessages(
                        this.lang.v18,
                        this.messageService
                    );
                },
                (err) => {
                    this.loading = false;
                    this.apps.showErrorMessages(err, this.messageService);
                    console.log(err);
                }
            );
    }

    setLog(data) {
        this.changeStatutLoading = true;

        this.onDone(this.dc.setLog(data, this.doc.id, this.statut));
    }

    changeBourse(statut) {
        this.statut = statut;
        this.actionType = "Bourse";
        this.confirm = true;
    }

    changeEtape(statut) {
        this.statut = statut;
        this.actionType = "Etape";
        this.confirm = true;
    }
    inscStatut;
    changeStatut(statut) {
        this.statut = statut;
        this.actionType = "Statut";
        this.confirm = true;
    }
    changeReinscrStatut(statut) {
        this.statut = statut;
        this.actionType = "ReinscStatut";
        this.confirm = true;
    }

    changeInscStatut(statut) {
        this.statut = statut;
        this.actionType = "InscStatut";
        this.confirm = true;
    }
    addRetrait(statut) {
        this.statut = statut;
        this.actionType = "Retrait";
        this.confirm = true;
    }

    OnAction(event) {
        if (!event.action) {
            this.confirm = false;
            return;
        }
        switch (this.actionType) {
            case "Retrait":
                this.setLog({ observation: event.observation });

                break;
            case "InscStatut":
                this.validerInscription({ observation: event.observation });

                break;
            case "Statut":
                this.setStatut({ observation: event.observation });

                break;
            case "ReinscStatut":
                this.setReinsStatut({ observation: event.observation });

                break;
            case "Etape":
                this.setInscEtape({ observation: event.observation });
                break;

            case "Bourse":
                this.setBourse({ observation: event.observation });
                break;

            default:
                break;
        }
    }

    onChangeDossier(event) {
        this.showPiecesManquantes = event.value === "no";
    }

    onDone(promise) {
        promise.subscribe(
            (res) => {
                console.log(res);
                this.changeStatutLoading = false;
                this.confirm = false;
                this.dossierModal = false;

                this.doc = res.doc;
                this.OnChange.emit(this.doc);
                this.apps.showSuccessMessages(
                    this.lang.v18,
                    this.messageService
                );
            },
            (err) => {
                console.log(err);
                this.apps.showErrorMessages(err, this.messageService);
                this.changeStatutLoading = false;
            }
        );
    }

    showErrorMessages(err) {
        if (err.error.errors) {
            for (const error in err.error.errors) {
                this.messageService.add({
                    detail: err.error.errors[error],
                    life: 10000,
                    key: "toast",
                    severity: "error",
                    summary: "Erreur!",
                });
            }
            return;
        }
        if (err.error.message) {
            this.messageService.add({
                detail: err.error.message,
                life: 10000,
                key: "toast",
                severity: "error",
                summary: "Erreur!",
            });
            return;
        }
        this.messageService.add({
            detail: this.lang.v5,
            life: 10000,
            key: "toast",
            severity: "error",
            summary: "Erreur!",
        });
    }
}
