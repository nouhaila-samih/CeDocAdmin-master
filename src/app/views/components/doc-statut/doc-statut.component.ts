import { Component, Input, OnInit } from '@angular/core';
import local from 'src/app/utilities/constants/local';

@Component({
    selector: 'app-doc-statut',
    templateUrl: './doc-statut.component.html',
    styleUrls: ['./doc-statut.component.css']
})
export class DocStatutComponent implements OnInit {
    @Input() statut = 0;
    lang = local();

    constructor() { }

    ngOnInit(): void {
    }

}
