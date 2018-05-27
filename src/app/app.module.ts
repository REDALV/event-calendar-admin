import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AppComponent } from './app.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { environment } from '../environments/environment';
import { DataService } from './services/data.service';
import { EventsComponent } from './components/events/events.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

const appRoutes: Routes = [
  { path: 'events', component: EventsComponent },
  { path: '',
    redirectTo: '/events',
    pathMatch: 'full'
  },
  { path: '**', component: EventsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    EditEventComponent,
    EventsComponent,
    EventsListComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    FormsModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'event-calendar-admin'),
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    DataService,
    BrowserAnimationsModule,
    NgxMyDatePickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
