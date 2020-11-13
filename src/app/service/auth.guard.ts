import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { AuthService } from "./auth.service";
import { CommonService } from "./common.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    public commonservice: CommonService,
    
     
     ) {}
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //     return this.auth.authState.pipe(
        
  //       take(1),
  //       map(value => !!value), // <-- map to boolean
  //       tap(loggedIn => {
  //         if (!loggedIn) {
  //           console.log('access denied')
  //           this.router.navigate(['/login']);
  //         }
  //       })
  //     )
  // }

   canActivate(): Promise<boolean> {
    return this.auth.check_authentication();
  }
  
}
