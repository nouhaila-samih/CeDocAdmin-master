import { Component, Input, OnInit } from "@angular/core";
import local from "src/app/utilities/constants/local";

@Component({
    selector: "app-rdv-statut",
    templateUrl: "./rdv-statut.component.html",
    styleUrls: ["./rdv-statut.component.css"],
})
export class RdvStatutComponent implements OnInit {
    @Input() statut = 0;
    lang = local();
    constructor() {}

    ngOnInit(): void {}
}
