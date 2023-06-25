import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './app-button.component.html',
    styleUrls: ['./app-button.component.css'],
})
export class AppButtonComponent implements OnInit {
    @Input() type = 'button';
    @Input() block = false;
    @Input() class = '';
    @Input() btnStyleType = 'p-button-primary';
    @Input() text = '';
    @Input() disabled = false;
    @Input() loading = false;
    @Input() style = '';
    @Input() icon = null;
    constructor() {}

    ngOnInit(): void {}
}
