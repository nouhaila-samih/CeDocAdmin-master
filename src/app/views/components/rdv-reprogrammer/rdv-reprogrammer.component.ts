import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Message, MessageService } from "primeng/api";
import local from "src/app/utilities/constants/local";
import { RendezVous } from "src/app/utilities/models";
import { AppService } from "./../../../utilities/services/app.service";

@Component({
    selector: "app-rdv-reprogrammer",
    templateUrl: "./rdv-reprogrammer.component.html",
    styleUrls: ["./rdv-reprogrammer.component.css"],
})
export class RdvReprogrammerComponent implements OnInit {
    lang = local();
    reprogrammerForm: FormGroup;
    error_message = "";
    hasError = false;
    minDate = new Date();

    @Input() rendezVous: RendezVous;
    @Input() display = false;
    @Output() displayChange = new EventEmitter();
    @Output() Onchange = new EventEmitter();
    @Output() OnUpdating = new EventEmitter();

    id: number;
    objet = "";
    date = "";
    heureDebut = "";
    heureFin = "";

    new_date = "";
    new_heure_debut = "";
    new_heure_fin = "";

    constructor(
        private messageService: MessageService,
        private apps: AppService
    ) {}

    ngOnInit(): void {
        this.id = this.rendezVous.id;
        this.objet = this.rendezVous.objet;

        this.heureDebut = this.new_heure_debut =
            this.rendezVous.horaires[0].heureDebut;

        this.heureFin = this.new_heure_fin =
            this.rendezVous.horaires[0].heureFin;

        this.date = this.new_date = this.rendezVous.dates[0].date;

        this.reprogrammerForm = new FormGroup({
            objet: new FormControl({ value: this.objet, disabled: true }),
            date: new FormControl(this.date, Validators.required),
            heureDebut: new FormControl(this.heureDebut, Validators.required),
            heureFin: new FormControl(this.heureFin, Validators.required),
        });
    }

    onSubmit() {
        console.warn(this.reprogrammerForm);

        if (this.reprogrammerForm.pristine) {
            this.hasError = true;
            this.error_message = "vous n'avez fait aucun changement";
        } else if (this.reprogrammerForm.invalid) {
            this.hasError = true;
            this.error_message =
                "Les données fournies sont invalides, merci de remplir tous les champs correctement";
        } else {
            this.hasError = false;
            if (this.reprogrammerForm.controls.date.dirty) {
                //let d = <Date>this.reprogrammerForm.value.date;
                this.new_date = this.getDate(this.reprogrammerForm.value.date);
                console.warn(this.new_date);
            }

            if (this.reprogrammerForm.controls.heureDebut.dirty) {
                //let d = <Date>this.reprogrammerForm.value.date;
                this.new_heure_debut = this.getHeure(
                    this.reprogrammerForm.value.heureDebut
                );
                console.warn(this.new_heure_debut);
            }

            if (this.reprogrammerForm.controls.heureFin.dirty) {
                //let d = <Date>this.reprogrammerForm.value.date;
                this.new_heure_fin = this.getHeure(
                    this.reprogrammerForm.value.heureFin
                );
                console.warn(this.new_heure_fin);
            }

            if (
                this.new_date == this.date &&
                this.new_heure_debut == this.heureDebut &&
                this.new_heure_fin == this.heureFin
            ) {
                this.hasError = true;
                this.error_message = "vous n'avez fait aucun changement";
                return;
            }

            if (this.new_heure_fin <= this.new_heure_debut) {
                this.hasError = true;
                this.error_message =
                    "vous devez choisir l'heure de debut inferieure  à l'heure de fin";
                return;
            }
            console.warn(this.reprogrammerForm);
            this.display = false;
            this.displayChange.emit();
            this.reprogrammerRdv();
        }
    }

    getDate(full_date: Date) {
        let y = full_date.getFullYear();
        let m = this.addZero(full_date.getMonth() + 1);
        let d = this.addZero(full_date.getDate());
        return y + "-" + m + "-" + d;
    }

    getHeure(full_date: Date) {
        let h = this.addZero(full_date.getHours());
        let m = this.addZero(full_date.getMinutes());
        return h + ":" + m;
    }

    hide() {
        this.displayChange.emit();
    }

    addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    reprogrammerRdv() {
        this.OnUpdating.emit();
        this.apps
            .reprogrammerRendezVous(
                this.id,
                this.objet,
                this.new_date,
                this.new_heure_debut,
                this.new_heure_fin
            )
            .subscribe(
                (res) => {
                    console.log(res);
                    if (res.status == true) {
                        this.rendezVous = res.rdv;
                        this.Onchange.emit(this.rendezVous);
                        this.messageService.add({
                            detail: res.message,
                            life: 10000,
                            key: "toast",
                            severity: "success",
                            summary: "Succès!",
                        });
                    } else {
                        this.Onchange.emit();
                    }
                },
                (err) => {
                    console.log(err);
                }
            );
    }
}
