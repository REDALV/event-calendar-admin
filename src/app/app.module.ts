import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppComponent } from './app.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { environment } from '../environments/environment';
import { DataService } from './services/data.service';
import { EventsComponent } from './components/events/events.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { AgmCoreModule } from '@agm/core';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';


const appRoutes: Routes = [
  { path: 'events', component: EventsComponent, canActivate: [AuthGuard]  },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '**', component: EventsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    EditEventComponent,
    EventsComponent,
    EventsListComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(
      appRoutes
    ),
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    DataService,
    BrowserAnimationsModule,
    NgxMyDatePickerModule.forRoot(),
    AmazingTimePickerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBpDz6qxS0XLtYYpB2mpQWTj72UZKu5lPE'
    })
  ],
  providers: [AuthService, UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
