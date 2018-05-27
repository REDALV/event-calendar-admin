import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { CityEvent } from '../../models/cityEvent';
import { DataService } from '../../services/data.service';
import { NgForm } from '@angular/forms';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  event: CityEvent;
  mytime: string;

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

  constructor(private dataService: DataService) { }

  ngOnInit() {
    
  }

  onSubmit(eventForm: NgForm) {
    /*if (eventForm.value.$key == null)
      this.dataService.insertEmployee(eventForm.value);
    else*/
      this.dataService.updateEvent(this.dataService.selectedEvent);
    this.resetForm(eventForm);
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
      images: null,
      isImportant: 0,
      lat: 0,
      lng: 0,
      name: '',
      subtype: 0,
      time: '',
      timeEnd: '',
      type: 0
    })
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
}
