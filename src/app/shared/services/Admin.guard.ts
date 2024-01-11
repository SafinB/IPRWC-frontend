import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    UrlTree
} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {UserService} from "./user.service";

@Injectable({ providedIn: 'root'})
export class AdminGuard implements CanActivate {
    constructor(private router: Router, private userService: UserService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot
    ):
        | boolean
        | UrlTree
        | Promise<boolean | UrlTree>
        | Observable<boolean | UrlTree> {
        const user = this.userService.getUser();

        if (user?.role === true){
            return true;
        } else {
            return this.router.createUrlTree(['/']);
        }
    }
}
