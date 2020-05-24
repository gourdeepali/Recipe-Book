import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{

    constructor(private authservice: AuthService, private route:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree |
     Observable<boolean | UrlTree> |  Promise<boolean | UrlTree> {
        return this.authservice.user.pipe(
            take(1),
            map(user=>{
            const isAuth=!!user;
            if(isAuth){
                return true;
            }
            return this.route.createUrlTree(['/auth']);
        }));
    }
}