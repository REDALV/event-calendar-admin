import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { CityEvent } from '../../models/cityEvent';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  eventsList: CityEvent[];
  event: CityEvent;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    let x = this.dataService.getData();
    console.log(x);
    x.snapshotChanges().subscribe(item => {
      this.eventsList = [];
      for(var i = 0; i < item.length; i++){
        var y = item[i].payload.toJSON();
        y['$key'] = item[i].key;
        this.eventsList.push(new CityEvent(y));
      }
      /*
      item.forEach(element => {
        var y = element.payload.toJSON();
        y['$key'] = element.key;
        this.eventsList.push(new CityEvent(y));
      });*/
      console.log(this.eventsList);
    });
  }

  onDelete(key: string) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.dataService.deleteEvent(key);
    }
  }

  onEdit(selectedEvent: CityEvent) {
    console.log(selectedEvent);
    this.dataService.selectedEvent = Object.assign({}, selectedEvent);
    console.log(this.dataService.selectedEvent);
  }

}
