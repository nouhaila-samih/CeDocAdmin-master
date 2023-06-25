import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    constructor(
        private router: Router,
        private lss: LocalStorageService
    ) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // data: {permissions: ['SuperAdmin', ...]}
        const roles = route.data.roles as Array<string>;

        for (let i = 0 ; i <= roles.length ; i++){
            if (this.lss.hasRole(roles[i])) {
                return true;
            }
        }


        // not logged in so redirect to login page with the return url
        this.router.navigate(['/notfound'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
