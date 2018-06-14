import { Component } from '@angular/core';
import { NavController,Events } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items = [
    {'categroy': 1, 'name' : 'Vinegar', 'price' : 12.50, 'quantity': 5},
    {'categroy': 1, 'name' : 'Ginebra', 'price' : 12.50, 'quantity': 5},
    {'categroy': 1, 'name' : 'Palmolive', 'price' : 12.50, 'quantity': 5},
    {'categroy': 1, 'name' : 'Creamsilk', 'price' : 12.50, 'quantity': 5},
    {'categroy': 1, 'name' : 'Sunsilk', 'price' : 12.50, 'quantity': 5},
    {'categroy': 1, 'name' : 'Kape Blanca', 'price' : 12.50, 'quantity': 5}
  ];

  // db = new PouchDB('todos');
  // remoteCouch = false;

  constructor(public navCtrl: NavController, public events: Events) {

    // var myDB = window.sqlitePlugin.openDatabase({name: "mySQLite.db", location: 'default'});
  }
  getItems(event: Event) {
    console.log(event.target);
  }


}
