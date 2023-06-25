import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { ConfirmationService, MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import local from "src/app/utilities/constants/local";
import { AppService } from "src/app/utilities/services/app.service";
import { DocsService } from "src/app/utilities/services/docs.service";
import { LocalStorageService } from "src/app/utilities/services/local-storage.service";
import { FtsHoursComponent } from "../../components/fts-hours/fts-hours.component";

@Component({
    selector: "app-accomplishments",
    templateUrl: "./accomplishments.component.html",
    styleUrls: ["./accomplishments.component.css"],
})
export class AccomplishmentsComponent implements OnInit {
    @Input() idDoc = null;
    @Input() statut = null;
    @Input() duree = null;
    @Input() idF = null;
    loading = true;
    doc: any = {};
    obsf: any[] = [];
    obsi: any[] = [];
    obsp: any[] = [];
    obsa: any[] = [];
    brv: any[] = [];
    ref: DynamicDialogRef;

    ft_types: string[] = [];
    lang = local();
    constructor(
        private apps: AppService,
        private confirmationService: ConfirmationService,
        public dc: DocsService,
        public dialogService: DialogService,
        public lss: LocalStorageService,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.dc.getDocLivret(this.route.snapshot.params.id).subscribe(
            (res) => {
                console.log(res);
                this.doc = res.doc;
                this.loading = false;

                this.obsf = res.fts;
                this.obsi = res.formations;
                this.obsa = res.articles;
                this.obsp = res.communications;
                this.brv = res.brevets;
                this.idDoc = this.doc.id;
            },
            (err) => {
                this.loading = false;
                this.apps.showErrorMessages(err, this.messageService);
                console.log(err);
            }
        );
    }

    status(data: any[], st: number): boolean {
        let statut = false;
        let s = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i].livret_status === st) {
                s++;
            }
        }
        if (s > 0) {
            statut = true;
        }
        return statut;
    }

    changeStatusForm(formation: any, st: number) {
        let msg: string;
        if (st === 16) {
            msg = "Voulez vous valider la formation ?";
        } else if (st === 26) {
            msg = "Voulez vous refuser la formation ?";
        } else if (st === 0) {
            msg = "Voulez vous annuler ?";
        }
        this.confirmationService.confirm({
            header: "Confirmation",
            acceptLabel: "Oui",
            rejectLabel: "Annuler",
            message: msg,
            icon: "pi pi-exclamation-triangle",
            accept: () => {
                this.dc
                    .changeForm(
                        formation.id,
                        this.idDoc,
                        formation.validated_duree,
                        st
                    )
                    .subscribe(
                        (res) => {
                            console.log(res);
                            this.apps.showSuccessMessages(
                                this.lang.v18,
                                this.messageService
                            );
                            this.reloadPage();

                        },
                        (err) => {
                            this.loading = false;
                            this.apps.showErrorMessages(
                                err,
                                this.messageService
                            );
                            console.log(err);
                        }
                    );
            },
            reject: () => {
                this.messageService.add({
                    severity: "warn",
                    summary: "Annulé",
                    detail: "Vous avez annulé l'opération",
                });
            },
        });
    }

    changeDuree(obb: any) {
        this.ref = this.dialogService.open(FtsHoursComponent, {
            data: { obb: obb, idDoc: this.idDoc },
            header: "Modifier Durée",
            width: "50%",
            contentStyle: { overflow: "auto" },
            baseZIndex: 10000,
        });

        this.ref.onClose.subscribe((res) => {
            if (res) {
                this.messageService.add({
                    severity: "info",
                    summary: "Product Selected",
                });
            }
        });
    }
    changeStatusFts(formation: any, st: number) {
        let msg: string;
        if (st === 16) {
            msg = "Voulez vous valider la formation ?";
        } else if (st === 26) {
            msg = "Voulez vous refuser la formation ?";
        } else if (st === 0) {
            msg = "Voulez vous annuler ?";
        }
        this.confirmationService.confirm({
            header: "Confirmation",
            acceptLabel: "Oui",
            rejectLabel: "Annuler",
            message: msg,
            icon: "pi pi-exclamation-triangle",
            accept: () => {
                this.dc
                    .changeFt(formation.id, formation.validated_duree, st)
                    .subscribe(
                        (res) => {
                            console.log(res);
                            this.apps.showSuccessMessages(
                                this.lang.v18,
                                this.messageService
                            );
                            this.reloadPage();

                        },
                        (err) => {
                            this.loading = false;
                            this.apps.showErrorMessages(
                                err,
                                this.messageService
                            );
                            console.log(err);
                        }
                    );
            },
            reject: () => {
                this.messageService.add({
                    severity: "warn",
                    summary: "Annulé",
                    detail: "Vous avez annulé l'opération",
                });
            },
        });
    }
    reloadPage() {
       window.location.reload();
    }
    changeStatusArt(article: any, st: number) {
        let msg: string;
        if (st === 16) {
            msg = "Voulez vous valider l'article' ?";
        } else if (st === 26) {
            msg = "Voulez vous refuser l'article' ?";
        } else if (st === 0) {
            msg = "Voulez vous annuler ?";
        }
        this.confirmationService.confirm({
            header: "Confirmation",
            acceptLabel: "Oui",
            rejectLabel: "Annuler",
            message: msg,
            icon: "pi pi-exclamation-triangle",
            accept: () => {
                this.dc.changeArt(article.id, st).subscribe(
                    (res) => {
                        console.log(res);
                        this.apps.showSuccessMessages(
                            this.lang.v18,
                            this.messageService
                        );
                        this.reloadPage();
                    },
                    (err) => {
                        this.loading = false;
                        this.apps.showErrorMessages(err, this.messageService);
                        console.log(err);
                    }
                );
            },
            reject: () => {
                this.messageService.add({
                    severity: "warn",
                    summary: "Annulé",
                    detail: "Vous avez annulé l'opération",
                });
            },
        });
    }
    changeStatusProc(proceeding: any, st: number) {
        let msg: string;
        if (st === 16) {
            msg = "Voulez vous valider le proceeding ?";
        } else if (st === 26) {
            msg = "Voulez vous refuser le proceeeding ?";
        } else if (st === 0) {
            msg = "Voulez vous annuler ?";
        }
        this.confirmationService.confirm({
            header: "Confirmation",
            acceptLabel: "Oui",
            rejectLabel: "Annuler",
            message: msg,
            icon: "pi pi-exclamation-triangle",
            accept: () => {
                this.dc
                    .changeProc(proceeding.id, proceeding.validated_duree, st)
                    .subscribe(
                        (res) => {
                            console.log(res);
                            this.apps.showSuccessMessages(
                                this.lang.v18,
                                this.messageService
                            );
                            this.reloadPage();

                        },
                        (err) => {
                            this.loading = false;
                            this.apps.showErrorMessages(
                                err,
                                this.messageService
                            );
                            console.log(err);
                        }
                    );
            },
            reject: () => {
                this.messageService.add({
                    severity: "warn",
                    summary: "Annulé",
                    detail: "Vous avez annulé l'opération",
                });
            },
        });
    }
    changeStatusBrv(brevet: any, st: number) {
        let msg: string;
        if (st === 16) {
            msg = "Voulez vous valider le brevet ?";
        } else if (st === 26) {
            msg = "Voulez vous refuser le brevet ?";
        } else if (st === 0) {
            msg = "Voulez vous annuler ?";
        }
        this.confirmationService.confirm({
            header: "Confirmation",
            acceptLabel: "Oui",
            rejectLabel: "Annuler",
            message: msg,
            icon: "pi pi-exclamation-triangle",
            accept: () => {
                this.dc.changeBrv(brevet.id, st).subscribe(
                    (res) => {
                        console.log(res);
                        this.apps.showSuccessMessages(
                            this.lang.v18,
                            this.messageService
                        );
                            this.reloadPage();

                    },
                    (err) => {
                        this.loading = false;
                        this.apps.showErrorMessages(err, this.messageService);
                        console.log(err);
                    }
                );
            },
            reject: () => {
                this.messageService.add({
                    severity: "warn",
                    summary: "Annulé",
                    detail: "Vous avez annulé l'opération",
                });
            },
        });
    }
}
