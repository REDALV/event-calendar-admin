import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router} from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service'


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    public authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(user => {
        if(this.authService.isUserActive)
          return resolve(true);
        else{
          this.router.navigate(['/login']);
          return resolve(false);
        }
      }, err => {
        this.router.navigate(['/login']);
        return resolve(false);
      })
    })
  }
}
