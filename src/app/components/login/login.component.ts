import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor( public authService: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.authService.setAdmins();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      console.log(res);
      let email : string = value.email;
      console.log(this.authService.adminsList);
      this.authService.adminsList.forEach(element => {
        if(email === element.login && element.isActive === true){
          this.authService.isUserActive = true;
          this.goToEvents();
        }
      });
      if(!this.authService.isUserActive)
        this.errorMessage = "Ваш аккаут еще не подтверждён или был отклонен."
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }

  goToRegister(){
    this.router.navigate(['/register']);
  }

  goToEvents(){
    this.router.navigate(['/events']);
  }

}
