import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { UserModel } from '../models/userModel';

@Injectable()
export class AuthService {

  adminsFireList: AngularFireList<any>;
  adminsList: UserModel[]; 
  isUserActive: boolean = false;

  constructor(private firebase: AngularFireDatabase, public firebaseAuth: AngularFireAuth){}

  getFireAdmins() {
    this.adminsFireList = this.firebase.list('admins');
    return this.adminsFireList;
  }

  setAdmins(){
    let x = this.getFireAdmins();
    x.snapshotChanges().subscribe(item => {
      this.adminsList = [];
      for(var i = 0; i < item.length; i++){
        var y = item[i].payload.toJSON();
        y['$key'] = item[i].key;;
        this.adminsList.push(new UserModel(y));
      }
    });
  }

  confirmAdmin(admin : UserModel){
    this.adminsFireList.update(admin.$key,
      {
        email: admin.login,
        isActive: admin.isActive
      });
  }

  insertAdmin(email: string){
    this.adminsFireList.push({
      email: email,
      isActive: false
    });
  }

  dismissAdmin($key : string){
    this.adminsFireList.remove($key);
  } 

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      this.firebaseAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        this.insertAdmin(value.email);
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogin(value){
    console.log("doLogin");
    return new Promise<any>((resolve, reject) => {
      this.firebaseAuth.auth.signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogout(){
    this.isUserActive = false;
    return new Promise((resolve, reject) => {
      if(this.firebaseAuth.auth.currentUser){
        this.firebaseAuth.auth.signOut()
        resolve();
      }
      else{
        reject();
      }
    });
  }
}