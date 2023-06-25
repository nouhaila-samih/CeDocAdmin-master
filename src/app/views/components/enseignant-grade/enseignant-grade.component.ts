import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-enseignant-grade',
    templateUrl: './enseignant-grade.component.html',
    styleUrls: ['./enseignant-grade.component.css']
})
export class EnseignantGradeComponent implements OnInit {

    @Input() grade = 'PA';
    constructor() { }

    ngOnInit(): void {
    }

}
