import { LocalStorageService } from './../services/local-storage.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PermissionsGuard implements CanActivate {
    constructor(
        private router: Router,
        private lss: LocalStorageService
    ) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // data: {permissions: ['SuperAdmin', ...]}
        const permissions = route.data.permissions as Array<string>;

        for (let i = 0 ; i <= permissions.length ; i++){
            if (this.lss.hasPermissions(permissions[i])) {
                return true;
            }
        }


        // not logged in so redirect to login page with the return url
        this.router.navigate(['/notfound'], { queryParams: { returnUrl: state.url } });
        return false;
    }

}
