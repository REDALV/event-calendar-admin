import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { EditEventComponent } from './edit-event/edit-event.component';

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
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
