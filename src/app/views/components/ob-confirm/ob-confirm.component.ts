import { toFormData } from 'src/app/utilities/helpers';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import local from 'src/app/utilities/constants/local';

@Component({
    selector: 'app-ob-confirm',
    templateUrl: './ob-confirm.component.html',
    styleUrls: ['./ob-confirm.component.css']
})
export class ObConfirmComponent implements OnInit {

    lang = local();

    @Input()  loading = false;
    @Input()  show = false;
    @Input()  msg = this.lang.valide_confirmation_op;
    @Output()  OnAction = new EventEmitter<any>();
    obConfirmForm: FormGroup;
    constructor() { }

    ngOnInit(): void {

        this.obConfirmForm = new FormGroup(
            {
                observation: new FormControl(null),
            }
        );
    }

    action(action){


        this.OnAction.emit({
            action,
            ...(this.obConfirmForm.value.observation) && {observation: this.obConfirmForm.value.observation},


        });
    }

}
