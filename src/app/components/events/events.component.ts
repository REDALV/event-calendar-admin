import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router} from '@angular/router';
import { UserModel } from '../../models/userModel';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }


  notActiveAdminsList: UserModel[] = [];
  showAdminList: boolean = false;

  ngOnInit() {
    this.authService.adminsList.forEach(element => {
      if(!element.isActive)
        this.notActiveAdminsList.push(element);
    });
  }

  logout(){
    this.authService.doLogout().then(res => {
      this.goToLogin();
    }, err => {
      console.log(err);
    });
  }

  changeShowAdmins(){
    this.showAdminList = !this.showAdminList;
  }

  confirmAdmin(admin:UserModel){
    admin.isActive = true;
    const index: number = this.notActiveAdminsList.indexOf(admin);
    if (index !== -1) {
      this.notActiveAdminsList.splice(index, 1);
    }  
    this.authService.confirmAdmin(admin);
  }

  dismissAdmin(admin:UserModel){
    const index: number = this.notActiveAdminsList.indexOf(admin);
    if (index !== -1) {
      this.notActiveAdminsList.splice(index, 1);
    }  
    this.authService.dismissAdmin(admin.$key);
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }

}
