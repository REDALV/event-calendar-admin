import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { CityEvent } from '../../models/cityEvent';
import { DataService } from '../../services/data.service';
import { NgForm } from '@angular/forms';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { AngularFireStorageReference } from 'angularfire2/storage';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  event: CityEvent;

  showImages: boolean;
  eventImages: Array<string>;
  selectedImages: FileList;

  eventTypes=[
    { "id": 1,"name": "Спортивное мероприятие" },
    { "id": 2,"name": "Культурно-массовое мероприятие" },
    { "id": 3,"name": "Образовательное мероприятие" },
  ]

  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };

  dateModel: any;
  dateEndModel: any;

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.dataService.selectedEvent = new CityEvent({
      $key: null,
      address: '',
      article: '',
      date: '',
      dateEnd: '',
      images: [],
      isImportant: false,
      lat: 52.424195,
      lng: 31.014671,
      name: '',
      subtype: 0,
      time: '',
      timeEnd: '',
      type: 1
    });
  }

  onSubmit(eventForm: NgForm) {
    if(this.isValidEvent()){
      if (eventForm.value.$key == null){
        this.dataService.lastEventKey = this.dataService.lastEventKey + 1;
        this.dataService.selectedEvent.$key = String(this.dataService.lastEventKey);
      }
      this.dataService.updateEvent(this.dataService.selectedEvent);
      this.resetForm(eventForm);
    }
    else{
      alert('Обязательные поля помечены знаком *');
    }
  }
  
  isValidEvent():boolean{
    if(this.dataService.selectedEvent.address == null || this.dataService.selectedEvent.address === "" )
      return false;
    if(this.dataService.selectedEvent.name == null || this.dataService.selectedEvent.name === "" )
      return false;
    if(this.dataService.selectedEvent.date == null || this.dataService.selectedEvent.date === "" )
      return false;
    if(this.dataService.selectedEvent.type == null)
      return false;
    if(this.dataService.selectedEvent.time == null || this.dataService.selectedEvent.time === "" )
      return false;
    return true;
  }

  resetForm(eventForm?: NgForm) {
    if (eventForm != null)
      eventForm.reset();
    this.dataService.selectedEvent = new CityEvent({
      $key: null,
      address: '',
      article: '',
      date: '',
      dateEnd: '',
      images: [],
      isImportant: false,
      lat: 52.424195,
      lng: 31.014671,
      name: '',
      subtype: 0,
      time: '',
      timeEnd: '',
      type: 1
    });
  }

  onDateChanged(event: IMyDateModel): void {
    if(event.formatted)
      this.dataService.selectedEvent.date = event.formatted;
    else
      this.dataService.selectedEvent.date = "";
  }

  onDateEndChanged(event: IMyDateModel): void {
    if(event.formatted)
      this.dataService.selectedEvent.dateEnd = event.formatted;
    else
      this.dataService.selectedEvent.dateEnd = "";
  }

  /**
   * Dragging marker on map handler
   * @param event - event
   */
  updateLocation($event) {
    this.dataService.selectedEvent.lat = $event.coords.lat;
    this.dataService.selectedEvent.lng = $event.coords.lng;
  }

  onShowImages(){
    this.showImages = true;
  }

  deleteImage(imageSrc: string){
    const index: number = this.dataService.selectedEvent.images.indexOf(imageSrc);
    if (index !== -1) {
      this.dataService.selectedEvent.images.splice(index, 1);
    }  
  }

  selectImage(event){
    this.selectedImages = event.target.files;
  }

  uploadSelectedImages(){
    console.log(this.selectedImages.length);
    for(let i=0; i<this.selectedImages.length; i++){
      let file = this.selectedImages.item(i);
      this.dataService.pushImageToStorage(file);
    }
  }

}
