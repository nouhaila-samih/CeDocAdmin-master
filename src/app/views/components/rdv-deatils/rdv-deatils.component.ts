import { dateRdv, horaireRdv } from "./../../../utilities/models/index";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { RendezVous } from "src/app/utilities/models";
import local from "src/app/utilities/constants/local";
import { AppService } from "src/app/utilities/services/app.service";
import {
    R_SUPER_ADMIN,
    R_DIR_PEDOC,
    R_DIR_CEDOC,
    R_ADMIN_PEDOC,
    R_ADMIN_CEDOC,
} from "./../../../utilities/constants/index";
import { LocalStorageService } from "./../../../utilities/services/local-storage.service";

@Component({
    selector: "app-rdv-deatils",
    templateUrl: "./rdv-deatils.component.html",
    styleUrls: ["./rdv-deatils.component.css"],
})
export class RdvDeatilsComponent implements OnInit {
    lang = local();
    displayModal: boolean = false;
    loading = false;
    defaultDate: Date;
    @Input() rendezVous: RendezVous;
    @Output() OnChange = new EventEmitter();
    @Output() OnUpdating = new EventEmitter();

    events = [{}];

    idDoc: number;
    statut: number;
    objet = "";
    date: string;
    oldDate: string;
    horaire: string;
    oldHoraire: string;

    hasOldDate = false;
    hasOldHoraire = false;

    constructor(private apps: AppService, private lss: LocalStorageService) {}

    ngOnInit(): void {
        this.loadRdv(this.rendezVous);
        this.loadEvents();
        this.defaultDate = new Date(this.date);
    }

    onUpdate() {
        this.loading = true;
        this.OnUpdating.emit();
    }

    change(event) {
        if (!event) {
            this.OnChange.emit();
            this.loading = false;
            return;
        }
        this.loadRdv(event);
        this.loadEvents();
        this.loading = false;
        this.OnChange.emit(event);
    }

    valider() {
        this.OnUpdating.emit();
        this.loading = true;
        // setTimeout(() => {
        //     this.rendezVous.statut = this.statut = 2;
        //     this.OnChange.emit(this.rendezVous);
        // }, 3000);

        this.apps.validerRendezVous(this.rendezVous.id).subscribe(
            (res) => {
                console.log(res);
                if (res.status == true) {
                    this.rendezVous.statut = this.statut = res.rdv.statut;
                    this.events.push(res.event);
                    this.OnChange.emit(this.rendezVous);
                } else {
                    this.OnChange.emit();
                }
                this.loading = false;
            },
            (err) => {
                console.log(err);

                this.loading = false;
            }
        );
    }

    canValid() {
        if (
            this.statut == 0 &&
            (this.lss.hasRole(R_ADMIN_PEDOC) ||
                this.lss.hasRole(R_ADMIN_CEDOC) ||
                this.lss.hasRole(R_DIR_CEDOC))
        ) {
            return true;
        }
        return false;
    }

    canReprogrammer() {
        // statut != 0 || this.lss.hasRole(R_DIR_PEDOC)
        if (
            this.statut == 0 &&
            (this.lss.hasRole(R_ADMIN_PEDOC) ||
                this.lss.hasRole(R_ADMIN_CEDOC) ||
                this.lss.hasRole(R_DIR_CEDOC))
        ) {
            return true;
        }
        return false;
    }

    showDialog() {
        this.displayModal = true;
    }

    onHide() {
        this.displayModal = false;
    }

    loadRdv(rdv: RendezVous) {
        this.idDoc = rdv.id_doc;
        this.objet = rdv.objet;
        this.statut = rdv.statut;

        if (rdv.dates.length < 2) {
            this.date = rdv.dates[0].date;
        } else {
            this.hasOldDate = true;
            this.date = rdv.dates.find(this.checkNewDate).date;
            this.oldDate = rdv.dates.find(this.checkOldDate).date;
        }

        if (rdv.horaires.length < 2) {
            this.horaire = this.getHoraire(rdv);
        } else {
            this.horaire = this.getNewHoraire(rdv);
            if (
                rdv.horaires[0].heureDebut != rdv.horaires[1].heureDebut ||
                rdv.horaires[0].heureFin != rdv.horaires[1].heureFin
            ) {
                this.hasOldHoraire = true;
                this.oldHoraire = this.getOldHoraire(rdv);
            }
        }
    }

    loadEvents() {
        this.loading = true;
        let choix = "pedoc";
        if (this.lss.hasRole(R_ADMIN_CEDOC) || this.lss.hasRole(R_DIR_CEDOC)) {
            choix = "cedoc";
        }
        this.apps.getEvenements(choix).subscribe(
            (res) => {
                console.log(res);
                this.events = res.data;
                this.loading = false;
            },
            (err) => {
                console.log(err);

                this.loading = false;
            }
        );
    }

    ngOnChanges() {}

    checkNewDate(date: dateRdv) {
        return date.statut == 1;
    }

    checkOldDate(date: dateRdv) {
        return date.statut == 0;
    }

    checkNewHoraire(horaire: horaireRdv) {
        return horaire.statut == 1;
    }

    checkOldHoraire(horaire: horaireRdv) {
        return horaire.statut == 0;
    }

    getHoraire(rdv: RendezVous) {
        return (
            "de " +
            rdv.horaires[0].heureDebut +
            " à " +
            rdv.horaires[0].heureFin
        );
    }

    getNewHoraire(rdv: RendezVous) {
        let Horaire = rdv.horaires.find(this.checkNewHoraire);
        return "de " + Horaire.heureDebut + " à " + Horaire.heureFin;
    }

    getOldHoraire(rdv: RendezVous) {
        let Horaire = rdv.horaires.find(this.checkOldHoraire);
        return "de " + Horaire.heureDebut + " à " + Horaire.heureFin;
    }
}
