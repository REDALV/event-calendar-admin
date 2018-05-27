import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class UserService {

  constructor( public db: AngularFirestore, public afAuth: AngularFireAuth ) { }

  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      var user = this.afAuth.auth.onAuthStateChanged(function(user){
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }
}
