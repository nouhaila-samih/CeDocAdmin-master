import { Component, OnInit } from '@angular/core';
import local from 'src/app/utilities/constants/local';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
    lang = local()
    constructor() { }

    ngOnInit(): void {
    }

}
