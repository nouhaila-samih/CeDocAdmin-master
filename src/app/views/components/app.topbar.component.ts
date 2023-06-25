import local from 'src/app/utilities/constants/local';
import { AppService } from 'src/app/utilities/services/app.service';
import { MainComponent } from '../pages/main/main.component';
import { AppComponent } from 'src/app/app.component';
import {Component} from '@angular/core';

@Component({
    selector: 'app-topbar',
    template: `
        <div class="topbar clearfix">
            <div class="topbar-left">
                <a routerLink="/">
                    <img style="width: 90%;height: 140%;" src="assets/layout/images/logo3.png" class="topbar-logo p-mr-sm-2" routerLink="/" />
                </a>
            </div>

            <div class="topbar-right">
                <a id="menu-button" href="#" (click)="appMain.onMenuButtonClick($event)"
                   [ngClass]="{'menu-button-rotate': appMain.rotateMenuButton}">
                    <i class="pi pi-angle-left"></i>
               </a>

                <a id="topbar-menu-button" href="#" (click)="appMain.onTopbarMenuButtonClick($event)">
                    <i class="pi pi-bars"></i>
                </a>

                <ul class="topbar-items fadeInDown" [ngClass]="{'topbar-items-visible': appMain.topbarMenuActive}">

                    <li #settings [ngClass]="{'active-top-menu':appMain.activeTopbarItem === settings}">
                        <a href="#" (click)="appService.logout()">
                        <i style="font-weight: bold; font-size: 1.30rem;"
                        class="topbar-icon pi pi-sign-out">


                            <span class="p-mx-2 p-mb-2 topbar-item-name">{{lang.logout}}</span>
                          </i>
                        </a>

                    </li>

                </ul>
            </div>
        </div>
    `
})
export class AppTopBarComponent {
    lang = local();
    constructor(public app: AppComponent, public appMain: MainComponent, public appService: AppService) {}

}
