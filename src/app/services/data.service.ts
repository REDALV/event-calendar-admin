import { Injectable, NgModule } from '@angular/core';

import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {CityEvent} from '../models/cityEvent';

@NgModule()
@Injectable()
export class DataService {

    eventsList: AngularFireList<any>;

    constructor( private firebase: AngularFireDatabase) { }

    getData() {
        this.eventsList = this.firebase.list('events');
        return this.eventsList;
    }
}
