import { AppService } from './utilities/services/app.service';
import { LocalStorageService } from './utilities/services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
@Component({
    selector: 'app-root',
    template: '<ngx-loading-bar [color]="\'red\'" [height]="\'3px\'"> </ngx-loading-bar> <router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

    layoutMode = 'static';

    darkMenu = false;

    profileMode = 'inline';

    ripple = true;

    inputStyle = 'outlined';

    constructor(private appService: AppService,
                private primengConfig: PrimeNGConfig,
                private lss: LocalStorageService
                ) { }

    ngOnInit() {
        // this.appService.getOptionsData({demande_types:1}).subscribe(res => {
        //     console.log(res);
        //
        //
        //     }, err => {
        //         console.log(err);
        //
        //     });

       // this.lss.logout();
       if (this.lss.isLoggedIn()) {
            this.appService.me().subscribe(res => {
              //  this.appService.loginUser(res);
              this.lss.loginUserWithoutToken(res);


            }, err => {
                console.log(err)
                this.appService.logout();
            });
        }
        this.primengConfig.ripple = true;
    }
}
