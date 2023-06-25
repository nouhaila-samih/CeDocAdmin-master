import { dateRdv, Query } from "./../../../../utilities/models/index";
import { RendezVous } from "src/app/utilities/models";
import { Component, OnInit } from "@angular/core";

import { AppService } from "src/app/utilities/services/app.service";
import local from "src/app/utilities/constants/local";
import { TestDataService } from "./../../../../utilities/services/test-data.service";
//import { LocalStorageService } from "./../../../../utilities/services/local-storage.service";

@Component({
    selector: "app-p-rdvs",
    templateUrl: "./p-rdvs.component.html",
    styleUrls: ["./p-rdvs.component.css"],
})
export class PRdvsComponent implements OnInit {
    rdvs: RendezVous[];
    lang = local();
    loading = true;

    total_records: number;
    per_page: number;
    NbrRdvsNouveau: number = 0;
    NbrRdvsReprogramme: number = 0;
    NbrRdvsAccepte: number = 0;
    NbrRdvsTraite: number = 0;
    NbrRdvsRefuse: number = 0;
    page?: number;
    first = 0;

    query: Query = {};
    statutRdv = "";

    constructor(
        private apps: AppService,
        private appTestData: TestDataService
    ) {}

    ngOnInit(): void {
        this.loadRdv();
    }

    reset() {
        this.first = 0;
    }

    paginate(event) {
        this.query.page = event.first / this.per_page + 1;
        console.log(this.query);
        this.loadRdv();
    }

    changeRdv(event, rdv) {
        if (!event) {
            this.loadRdv();
            return;
        }
        rdv.statut = event.statut;
        if (event.statut == 1) {
            this.NbrRdvsNouveau = this.NbrRdvsNouveau - 1;
            this.NbrRdvsReprogramme = this.NbrRdvsReprogramme + 1;
        } else if (event.statut == 2) {
            this.NbrRdvsNouveau = this.NbrRdvsNouveau - 1;
            this.NbrRdvsAccepte = this.NbrRdvsAccepte + 1;
        }
        rdv.dates = event.dates;
        rdv.horaires = event.horaires;
        this.loading = false;
    }

    onUpdate() {
        this.loading = true;
    }

    loadRdv() {
        this.loading = true;

        if (!this.statutRdv) {
            this.apps.getListeRendezvousPedoc(this.query).subscribe(
                (res) => {
                    console.log(res);

                    this.rdvs = res.rdvs;
                    this.total_records = res.total;
                    this.per_page = res.per_page;

                    this.NbrRdvsNouveau = res.NbrRdvsNouveau;
                    this.NbrRdvsReprogramme = res.NbrRdvsReprogramme;
                    this.NbrRdvsAccepte = res.NbrRdvsAccepte;
                    this.NbrRdvsTraite = res.NbrRdvsTraite;
                    this.NbrRdvsRefuse = res.NbrRdvsRefuse;

                    this.loading = false;
                },
                (err) => {
                    console.log(err);

                    this.loading = false;
                }
            );
        } else {
            this.apps.filtreRdvPedoc(this.query, this.statutRdv).subscribe(
                (res) => {
                    console.log(res);

                    this.rdvs = res.rdvs;
                    this.total_records = res.total;
                    this.per_page = res.per_page;

                    this.loading = false;
                },
                (err) => {
                    console.log(err);

                    this.loading = false;
                }
            );
        }
    }

    filtrerRdv(statut: string) {
        this.rdvs = [];
        this.query = {};
        this.total_records = 0;
        this.reset();
        this.statutRdv = statut;
        this.loadRdv();
    }
}
