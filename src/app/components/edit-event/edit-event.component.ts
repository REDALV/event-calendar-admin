import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { CityEvent } from '../../models/cityEvent';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  eventsList: CityEvent[];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    let x = this.dataService.getData();
    console.log(x);
    x.snapshotChanges().subscribe(item => {
      this.eventsList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y['$key'] = element.key;
        this.eventsList.push(y as CityEvent);
      });
      console.log(this.eventsList);
    });
  }

}
