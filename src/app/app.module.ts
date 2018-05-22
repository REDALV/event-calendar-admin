import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EditEventComponentComponent } from './edit-event-component/edit-event-component.component';

@NgModule({
  declarations: [
    AppComponent,
    EditEventComponentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
