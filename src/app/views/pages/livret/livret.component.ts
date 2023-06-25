import {
    Component,
    ElementRef,
    Input,
    NgModule,
    OnInit,
    ViewChild,
} from "@angular/core";
import local from "../../../utilities/constants/local";
import { AppService } from "../../../utilities/services/app.service";
import { LocalStorageService } from "../../../utilities/services/local-storage.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SkeletonModule } from "primeng/skeleton";
import { environment } from "../../../../environments/environment";

//*********************************************************** */

import { ConfirmationService, MessageService } from "primeng/api";
import { DocsService } from "../../../utilities/services/docs.service";
import { ActivatedRoute } from "@angular/router";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { FtsHoursComponent } from "../../components/fts-hours/fts-hours.component";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import domtoimage from "dom-to-image";

//********************************************************* */

@Component({
    selector: "app-livret",
    templateUrl: "./livret.component.html",
    styleUrls: ["./livret.component.css"],
})
export class LivretComponent implements OnInit {
    @ViewChild("cont", { static: true }) cont: ElementRef;
    @ViewChild("formation1") formation1: ElementRef;
    @ViewChild("formation") formation: ElementRef;
    @ViewChild("pub") publication: ElementRef;
    @ViewChild("manif") manif: ElementRef;
    @ViewChild("stage") stage: ElementRef;
    @ViewChild("autre") autre: ElementRef;
    @ViewChild("recap") recap: ElementRef;

    loading = true;
    doc: any = {};
    obsf: any[] = [];
    obsi: any[] = [];
    obsp: any[] = [];
    obsa: any[] = [];
    pubb: any[] = [];
    f_com: any[] = [];
    f_spec: any[] = [];
    ftts: any[] = [];
    mans: any[] = [];
    vacs: any[] = [];
    COs: any[] = [];
    stgs: any[] = [];
    autres: any[] = [];
    interv: any[] = [];
    com_ors: any[] = [];
    com_listt: any[] = [];
    com_pos: any[] = [];
    brv: any[] = [];

    ref: DynamicDialogRef;
    pdp = environment.loading_image_url;
    lang = local();
    constructor(
        private apps: AppService,
        private confirmationService: ConfirmationService,
        public dc: DocsService,
        public lss: LocalStorageService,
        public dialogService: DialogService,
        private messageService: MessageService,
        private route: ActivatedRoute
    ) {
        this.pdp = this.lss.getPDP();
    }

    ngOnInit(): void {
        this.dc.getDocLivret(this.route.snapshot.params.id).subscribe(
            (res) => {
                console.log(res);
                this.doc = res.doc;
                this.loading = false;

                this.infoD(res);

                this.pubb = this.pub();
                console.log("pub", this.pubb);

                this.loading = false;
                if (this.obsf.length > 0) {
                    this.f_com = this.ftype("Formation complémentaire");
                    this.f_spec = this.ftype(
                        "Formation complémentaire spécifique"
                    );
                    this.ftts = this.ftt();
                    this.mans = this.mann();
                    this.stgs = this.ftype("Stage");
                    this.vacs = this.ftype("Vacation");
                    this.COs = this.ftype("Co-encadrements de PFE");
                    this.autres = this.ftype("Autre activité scientifique");
                    this.com_ors = this.com_orale();
                    this.com_listt = this.com_list();
                    this.com_pos = this.com_poster();
                    this.interv = this.intervv();
                }
            },
            (err) => {
                this.loading = false;
                this.apps.showErrorMessages(err, this.messageService);
                console.log(err);
            }
        );
    }
    infoD(res: any) {
        let j = 0;
        for (var i = 0; i < res.fts.length; i++) {
            if (res.fts[i].livret_status == 16) {
                this.obsf[j] = res.fts[i];
                j++;
            }
        }
        j = 0;
        for (var i = 0; i < res.formations.length; i++) {
            if (res.formations[i].livret_status == 16) {
                this.obsi[j] = res.formations[i];
                j++;
            }
        }
        j = 0;
        for (var i = 0; i < res.articles.length; i++) {
            if (res.articles[i].livret_status == 16) {
                this.obsa[j] = res.articles[i];
                j++;
            }
        }
        j = 0;
        for (var i = 0; i < res.communications.length; i++) {
            if (res.communications[i].livret_status == 16) {
                this.obsp[j] = res.communications[i];
                j++;
            }
        }
        j = 0;
        for (var i = 0; i < res.brevets.length; i++) {
            if (res.brevets[i].livret_status == 16) {
                this.brv[j] = res.brevets[i];
                j++;
            }
        }
    }
    formType(data: any[], type: String) {
        let j = 0;
        let tab: any[];
        for (let i = 0; i < data.length; i++) {
            if (data[i].type === type) {
                tab[j] = data[i];
                j++;
            }
        }
        return tab;
    }
    nb_hours(abb: any[]): number {
        let h = 0;
        for (let i = 0; i < abb.length; i++) {
            h = h + abb[i].validated_duree;
        }

        return h;
    }
    pourcentage(num: number): number {
        let pour = (num * 100) / 200;
        return pour;
    }
    pub(): any[] {
        let publ: any[] = [];
        let j = 0;
        if (this.obsa) {
            for (let i = 0; i < this.obsa.length; i++) {
                publ[j] = {};
                publ[j].titre = this.obsa[i].titre;
                publ[j].validated_duree = 0;
                j++;
            }
        }
        if (this.obsp) {
            for (let i = 0; i < this.obsp.length; i++) {
                publ[j] = {};
                publ[j].titre = this.obsp[i].titre;
                publ[j].validated_duree = this.obsp[i].validated_duree;
                j++;
            }
        }
        if (this.brv) {
            for (let i = 0; i < this.brv.length; i++) {
                publ[j] = {};
                publ[j].titre = this.brv[i].titre;
                publ[j].validated_duree = 0;
                j++;
            }
        }
        return publ;
    }

    ftt(): any[] {
        let comp: any[] = [];
        let j = 0;
        for (let i = 0; i < this.obsf.length; i++) {
            if (this.obsf[i].type === "Formation complémentaire") {
                comp[j] = this.obsf[i];
                j++;
            }
        }
        j = this.f_com.length;
        for (let i = 0; i < this.obsf.length; i++) {
            if (this.obsf[i].type === "Formation complémentaire spécifique") {
                comp[j] = this.obsf[i];
                j++;
            }
        }
        return comp;
    }

    status2(data: any[]): boolean {
        let res = false;
        if (data.length > 0) {
            res = true;
        }
        return res;
    }

    mann(): any[] {
        let comp: any[] = [];
        let j = 0;
        for (let i = 0; i < this.obsf.length; i++) {
            if (
                this.obsf[i].type === "Manifestation scientifique" &&
                this.obsf[i].presentation_type === "Orale"
            ) {
                comp[j] = this.obsf[i];
                j++;
            }
        }

        for (let i = 0; i < this.obsf.length; i++) {
            if (
                (this.obsf[i].type === "Manifestation scientifique" &&
                    this.obsf[i].presentation_type === "Poster") ||
                this.obsf[i].presentation_type === "Exposition"
            ) {
                comp[j] = this.obsf[i];
                j++;
            }
        }
        for (let i = 0; i < this.obsf.length; i++) {
            if (
                this.obsf[i].type === "Manifestation scientifique" &&
                this.obsf[i].presentation_type === "Listener"
            ) {
                comp[j] = this.obsf[i];
                j++;
            }
        }
        return comp;
    }
    intervv(): any[] {
        let comp: any[] = [];
        let j = 0;
        for (let i = 0; i < this.obsf.length; i++) {
            if (this.obsf[i].type === "Co-encadrements de PFE") {
                comp[j] = this.obsf[i];
                j++;
            }
        }

        for (let i = 0; i < this.obsf.length; i++) {
            if (this.obsf[i].type === "Vacation") {
                comp[j] = this.obsf[i];
                j++;
            }
        }
        for (let i = 0; i < this.obsf.length; i++) {
            if (this.obsf[i].type === "Autre activité scientifique") {
                comp[j] = this.obsf[i];
                j++;
            }
        }
        return comp;
    }
    ftype(type: string): any[] {
        let comp: any[] = [];
        let j = 0;
        for (let i = 0; i < this.obsf.length; i++) {
            if (this.obsf[i].type === type) {
                comp[j] = this.obsf[i];
                j++;
            }
        }

        return comp;
    }

    com_orale(): any[] {
        let comp: any[] = [];
        let j = 0;
        for (let i = 0; i < this.obsf.length; i++) {
            if (
                this.obsf[i].type === "Manifestation scientifique" &&
                this.obsf[i].presentation_type === "Orale"
            ) {
                comp[j] = this.obsf[i];
                j++;
            }
        }

        return comp;
    }
    com_poster(): any[] {
        let comp: any[] = [];
        let j = 0;
        for (let i = 0; i < this.obsf.length; i++) {
            if (
                (this.obsf[i].type === "Manifestation scientifique" &&
                    this.obsf[i].presentation_type === "Poster") ||
                this.obsf[i].presentation_type === "Exposition"
            ) {
                comp[j] = this.obsf[i];
                j++;
            }
        }

        return comp;
    }
    com_list(): any[] {
        let comp: any[] = [];
        let j = 0;
        for (let i = 0; i < this.obsf.length; i++) {
            if (
                this.obsf[i].type === "Manifestation scientifique" &&
                this.obsf[i].presentation_type === "Listener"
            ) {
                comp[j] = this.obsf[i];
                j++;
            }
        }

        return comp;
    }

    scrollToSection(sectionName: string) {
        switch (sectionName) {
            case "formation1":
                this.formation1.nativeElement.scrollIntoView({
                    behavior: "auto",
                });
                break;
            case "formation":
                this.formation.nativeElement.scrollIntoView({
                    behavior: "auto",
                });
                break;
            case "manif":
                this.manif.nativeElement.scrollIntoView({ behavior: "auto" });
                break;
            case "pub":
                this.publication.nativeElement.scrollIntoView({
                    behavior: "auto",
                });
                break;
            case "stage":
                this.stage.nativeElement.scrollIntoView({ behavior: "auto" });
                break;
            case "autre":
                this.autre.nativeElement.scrollIntoView({ behavior: "auto" });
                break;
            case "recap":
                this.recap.nativeElement.scrollIntoView({ behavior: "auto" });
                break;
            default:
                break;
        }
    }
    editForm(obb: any) {
        this.ref = this.dialogService.open(FtsHoursComponent, {
            data: {
                obb: obb,
                idDoc: this.doc.id,
                dTotal: this.dureeLivret(),
            },
            header: "Modifier le livret",
            width: "50%",
            contentStyle: { overflow: "auto" },
            baseZIndex: 10000,
        });

        this.ref.onClose.subscribe((result: any) => {
            console.log("Dialog closed with result:", result);
        });
    }

    validLivret(bool: number) {
        if (bool == 1) {
            this.confirmationService.confirm({
                header: "Confirmation",
                acceptLabel: "Oui",
                rejectLabel: "Annuler",
                message: "Voulez vous valider le livret ?",
                icon: "pi pi-exclamation-triangle",
                accept: () => {
                    this.dc
                        .changeLivret(this.doc.id, 1, this.doc.livret_heures)
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
            });
        } else if (bool == 0) {
            this.confirmationService.confirm({
                header: "Confirmation",
                acceptLabel: "Oui",
                rejectLabel: "Annuler",
                message: "Voulez vous annuler la validation du livret ?",
                icon: "pi pi-exclamation-triangle",
                accept: () => {
                    this.dc
                        .changeLivret(this.doc.id, 0, this.doc.livret_heures)
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
            });
        }
    }
    dureeLivret() {
        return (
            this.nb_hours(this.obsp) +
            this.nb_hours(this.obsf) +
            this.nb_hours(this.obsi)
        );
    }
    reloadPage() {
        window.location.reload();
    }

    canValidIt() {
        if (this.lss.hasRole("pedoc_admin") || this.lss.hasRole("dir_pedoc")) {
            return true;
        }
        return false;
    }
    async generatePDF() {
        let pdf = new jsPDF("p", "mm", "a4");
        const firstDivs = document.querySelectorAll("div#first");
        const secondDivs = document.querySelectorAll("div#second");

        const pg1 = document.getElementById("pg1");

        await html2canvas(pg1, { scale: 1 }).then((canvas) => {
            const contentToData = canvas.toDataURL("image/png");
            var width = pdf.internal.pageSize.getWidth();
            var height = (canvas.height * width) / canvas.width;
            pdf.addImage(contentToData, "PNG", 0, 0, width, height);
        });
        const infoo1 = document.getElementById("infoo1");
        await domtoimage.toPng(infoo1).then((contentToData) => {
            const imgWidth = pdf.internal.pageSize.getWidth();
            const imgHeight =
                (infoo1.offsetHeight * imgWidth) / infoo1.offsetWidth;
            pdf.addPage();
            pdf.addImage(contentToData, "PNG", 0, 0, imgWidth, imgHeight);
        });
        const infoo2 = document.getElementById("infoo2");
        await domtoimage.toPng(infoo2).then((contentToData) => {
            const imgWidth = pdf.internal.pageSize.getWidth();
            const imgHeight =
                (infoo2.offsetHeight * imgWidth) / infoo2.offsetWidth;
            pdf.addPage();
            pdf.addImage(contentToData, "PNG", 0, 0, imgWidth, imgHeight);
        });
        await firstDivs.forEach((div: HTMLDivElement) => {
            html2canvas(div, { scale: 1 }).then((canvas) => {
                const contentToData = canvas.toDataURL("image/png");
                var width = pdf.internal.pageSize.getWidth();
                var height = (canvas.height * width) / canvas.width;
                pdf.addPage();
                pdf.addImage(contentToData, "PNG", 0, 0, width, height);
            });
        });
        const artt = document.getElementById("artt");
        if (this.status2(this.obsa)) {
            await domtoimage.toPng(artt).then((contentToData) => {
                const imgWidth = pdf.internal.pageSize.getWidth();
                const imgHeight =
                    (artt.offsetHeight * imgWidth) / artt.offsetWidth;
                pdf.addPage();
                pdf.addImage(contentToData, "PNG", 0, 0, imgWidth, imgHeight);
            });
        }
        const procc = document.getElementById("procc");
        if (this.status2(this.obsp)) {
            await domtoimage.toPng(procc).then((contentToData) => {
                const imgWidth = pdf.internal.pageSize.getWidth();
                const imgHeight =
                    (procc.offsetHeight * imgWidth) / procc.offsetWidth;
                pdf.addPage();
                pdf.addImage(contentToData, "PNG", 0, 0, imgWidth, imgHeight);
            });
        }
        const brvvv = document.getElementById("brvvv");
        if (this.status2(this.brv)) {
            await domtoimage.toPng(brvvv).then((contentToData) => {
                const imgWidth = pdf.internal.pageSize.getWidth();
                const imgHeight =
                    (brvvv.offsetHeight * imgWidth) / brvvv.offsetWidth;
                pdf.addPage();
                pdf.addImage(contentToData, "PNG", 0, 0, imgWidth, imgHeight);
            });
        }
        await secondDivs.forEach((div: HTMLDivElement) => {
            html2canvas(div, { scale: 1 }).then((canvas) => {
                const contentToData = canvas.toDataURL("image/png");
                var width = pdf.internal.pageSize.getWidth();
                var height = (canvas.height * width) / canvas.width;
                pdf.addPage();
                pdf.addImage(contentToData, "PNG", 0, 0, width, height);
            });
        });
        const tableElement = document.getElementById("last");

        await domtoimage.toPng(tableElement).then((contentToData) => {
            const imgWidth = pdf.internal.pageSize.getWidth();
            const imgHeight =
                (tableElement.offsetHeight * imgWidth) /
                tableElement.offsetWidth;
            pdf.addPage();
            pdf.addImage(contentToData, "PNG", 0, 0, imgWidth, imgHeight);
            pdf.save("MonLivret.pdf");
        });
    }
}
