import { Injectable, NgModule } from '@angular/core';

import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {CityEvent} from '../models/cityEvent';

@NgModule()
@Injectable()
export class DataService {

    eventsList: AngularFireList<any>;
    selectedEvent: CityEvent = new CityEvent(null);

    constructor( private firebase: AngularFireDatabase) { }

    getData() {
        this.eventsList = this.firebase.list('events');
        return this.eventsList;
    }

    deleteEvent($key : string){
        this.eventsList.remove($key);
    }

    updateEvent(updatedEvent : CityEvent){
        this.eventsList.update(updatedEvent.$key,
          {
            name: updatedEvent.name,
            article: updatedEvent.article,
            address: updatedEvent.address,
            type: updatedEvent.type as number,
            isImportant: updatedEvent.isImportant,
            date: updatedEvent.date,
            dateEnd: updatedEvent.dateEnd
          });
      }
}
