import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate() {
   return this.authService.isAuthenticated();
  }

// Only one change to listen (subscribe) and after that cancel the subscription
  canLoad() {
    return this.authService
      .isAuthenticated()
      .pipe(take(1));
  }
}
