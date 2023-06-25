import { Component, OnInit, Input, NgModule } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { AppService } from "src/app/utilities/services/app.service";
import { DocsService } from "src/app/utilities/services/docs.service";

@Component({
    selector: "app-fts-hours",
    templateUrl: "./fts-hours.component.html",
    styleUrls: ["./fts-hours.component.css"],
})
@NgModule({
    imports: [ReactiveFormsModule],
})
export class FtsHoursComponent implements OnInit {
    dt: any;
    idDoc: number;
    dTotal: number;
    dtForm: FormGroup;
    docForm: FormGroup;
    pubForm: FormGroup;

    constructor(
        private apps: AppService,
        public dc: DocsService,
        private messageService: MessageService,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) {}

    ngOnInit(): void {
        this.dt = this.config.data.obb;
        this.idDoc = this.config.data.idDoc;
        this.dTotal = this.config.data.dTotal;
        this.dtForm = new FormGroup({
            intitule: new FormControl(this.dt.intitule, Validators.required),
            duree: new FormControl(this.dt.duree, Validators.required),
            validated_duree: new FormControl(
                this.dt.validated_duree,
                Validators.required
            ),
        });
        this.docForm = new FormGroup({
            duree: new FormControl(this.dTotal, Validators.required),
            livret_heures: new FormControl(
                this.dt.livret_heures,
                Validators.required
            ),
        });
        this.pubForm = new FormGroup({
            titre: new FormControl(this.dt.titre, Validators.required),
            nbr_heures: new FormControl(
                this.dt.nbr_heures,
                Validators.required
            ),
            validated_duree: new FormControl(
                this.dt.validated_duree,
                Validators.required
            ),
        });
    }
    editForm() {
        if (!this.dtForm.valid) {
            return;
        }
        this.dc
            .changeForm(
                this.dt.id,
                this.idDoc,
                this.dtForm.get("validated_duree")?.value,
                this.dt.livret_status
            )
            .subscribe(
                (res) => {
                    this.apps.showSuccessMessages(
                        res.message,
                        this.messageService
                    );
                    this.ref.close();
                    window.location.reload();
                },
                (err) => {
                    console.log(err);
                    this.apps.showErrorMessages(err, this.messageService);
                }
            );
    }
    editFt() {
        if (!this.dtForm.valid) {
            return;
        }
        this.dc
            .changeFt(
                this.dt.id,
                this.dtForm.get("validated_duree")?.value,
                this.dt.livret_status
            )
            .subscribe(
                (res) => {
                    this.apps.showSuccessMessages(
                        res.message,
                        this.messageService
                    );
                    this.ref.close();
                    window.location.reload();
                },
                (err) => {
                    console.log(err);
                    this.apps.showErrorMessages(err, this.messageService);
                }
            );
    }
    editProc() {
        if (!this.pubForm.valid) {
            return;
        }
        this.dc
            .changeProc(
                this.dt.id,
                this.pubForm.get("validated_duree")?.value,
                this.dt.livret_status
            )
            .subscribe(
                (res) => {
                    this.apps.showSuccessMessages(
                        res.message,
                        this.messageService
                    );
                    this.ref.close();
                    window.location.reload();
                },
                (err) => {
                    console.log(err);
                    this.apps.showErrorMessages(err, this.messageService);
                }
            );
    }
    editDoc() {
        if (!this.docForm.valid) {
            return;
        }
        this.dc
            .changeLivret(
                this.idDoc,
                0,
                this.docForm.get("livret_heures")?.value
            )
            .subscribe(
                (res) => {
                    this.apps.showSuccessMessages(
                        res.message,
                        this.messageService
                    );
                    this.ref.close();
                    window.location.reload();
                },
                (err) => {
                    console.log(err);
                    this.apps.showErrorMessages(err, this.messageService);
                }
            );
    }
}
