import { LocalStorageService } from './../../utilities/services/local-storage.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-inline-profile',
    template: `
        <div class="profile p-grid p-fluid" [ngClass]="{'profile-expanded':active}">
        <div class="p-col-3">
        <img class="ce-profile-image" src="{{lss.getPDP()}}" />
        </div>
        <div class="p-col-9" >
        <a  style="float: left; margin-left: 2px;" >
                <span class="ce-profile-name">{{lss.getAuthFullName()}} </span>
                <span  class="ce-profile-role">{{lss.getAuthGradeName()}}</span>

            </a>
        </div>
        </div>
    `
})
export class AppProfileComponent {

    active: boolean;
    constructor(public lss: LocalStorageService) { }

    onClick(event) {
        this.active = !this.active;
        event.preventDefault();
    }
}
