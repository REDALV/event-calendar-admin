import { Injectable, NgModule } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { CityEvent } from '../models/cityEvent';
import { FileUpload } from '../models/fileUpload';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@NgModule()
@Injectable()
export class DataService {

    eventsList: AngularFireList<any>;
    selectedEvent: CityEvent = new CityEvent(null);
    lastEventKey: number;
    newKey: string;
    downloadURL: string;

    constructor( private firebase: AngularFireDatabase, private storage: AngularFireStorage) { }

    getData() {
        this.eventsList = this.firebase.list('events');
        return this.eventsList;
    }

    getAdmins() {;
        return this.firebase.list('admins');
    }

    getEventImages(eventID: string){
        return this.firebase.list('events/' + eventID + '/images');
    }

    deleteEvent($key : string){
        this.eventsList.remove($key);
    }

    insertEmployee(newEvent : CityEvent)
    {
        this.lastEventKey = this.lastEventKey + 1;
        this.newKey = String(this.lastEventKey);
        this.eventsList.update(this.newKey,{
            name: newEvent.name,
            article: newEvent.article,
            address: newEvent.address,
            type: newEvent.type as number,
            isImportant: newEvent.isImportant,
            date: newEvent.date,
            dateEnd: newEvent.dateEnd,
            time: newEvent.time,
            timeEnd: newEvent.timeEnd,
            lat: newEvent.lat,
            lng: newEvent.lng,
            images: newEvent.images
        });
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
            dateEnd: updatedEvent.dateEnd,
            time: updatedEvent.time,
            timeEnd: updatedEvent.timeEnd,
            lat: updatedEvent.lat,
            lng: updatedEvent.lng,
            images: updatedEvent.images
          });
    }
    
    pushImageToStorage(fileUpload: File){
        let uniqkey = 'pic' + Math.floor(Math.random() * 1000000);
        let filePath;
        if(this.selectedEvent.$key  != null)
            filePath = '/' + this.selectedEvent.$key + '/' + fileUpload.name;
        else{
            let tempKey = this.lastEventKey + 1;
            filePath = '/' + tempKey + '/' + fileUpload.name;
        }
        const task = this.storage.upload(filePath, fileUpload);
        task.snapshotChanges().pipe(
            finalize(() => {
                let fileRef = this.storage.ref(filePath);
                fileRef.getDownloadURL().subscribe(ref =>{
                    this.downloadURL = ref;
                    this.selectedEvent.images.push(ref);
                });
             })
         )
        .subscribe()

    }
}
