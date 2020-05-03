import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {TokenServiceService} from './token-service.service';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private tokenStorageService: TokenServiceService, private router: Router, private auth: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth.logged.pipe(take(1), map(logged => {
      const lg = !!logged;
      if (lg) {
        return true;
      } else {
        this.router.navigate(['login']);
        return false;
      }
    }));
  }
}
