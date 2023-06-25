import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-sujet-statut',
    templateUrl: './sujet-statut.component.html',
    styleUrls: ['./sujet-statut.component.css']
})
export class SujetStatutComponent implements OnInit {
    @Input() statut = 0;
    @Input() statutName = '-';

    constructor() { }

    ngOnInit(): void {
    }

}
