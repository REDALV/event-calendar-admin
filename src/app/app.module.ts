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

const appRoutes: Routes = [
  { path: 'edit-events', component: EditEventComponent },
  { path: '',
    redirectTo: '/edit-events',
    pathMatch: 'full'
  },
  { path: '**', component: EditEventComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    EditEventComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'event-calendar-admin'),
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    DataService
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
