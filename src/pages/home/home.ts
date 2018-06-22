import { OnInit, Component } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { ItemDetailsPage } from '../item-details/item-details';
import { ItemEditPage } from '../item-edit/item-edit';

import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  items = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private alertCtrl: AlertController,
    private toast: Toast,
    public modalCtrl: ModalController
  ) {
    this.getItems(10, '', true);
  }

  ngOnInit() {
    this.getItems(10, '', true);
  }

  ionViewDidLoad() {
    this.getItems(10, '', true);
  }

  getItems(limit=10, searchTerm='', defaultSearch=true) {
    this.sqlite.create({
      name: 'meinventory.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql(`CREATE TABLE IF NOT EXISTS items(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          quantity INTEGER,
          price DOUBLE,
          description TEXT,
          date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`, {})
          .then(() =>
            console.log('Table is created')
          )
          .catch(e => console.log(e));

          var where = '';
          //check search term
          if(!defaultSearch) {
            where = ` WHERE name LIKE '%${searchTerm}%' `;
          }

        //fetch Items
        db.executeSql(`SELECT * FROM items ${where} ORDER BY name ASC LIMIT ${limit} `, {})
        .then(res => {

          this.items = [];

          for(var i=0; i<res.rows.length; i++) {

            this.items.push({
              id:res.rows.item(i).id,
              name:res.rows.item(i).name,
              price:res.rows.item(i).price,
              quantity:res.rows.item(i).quantity,
              description:res.rows.item(i).description,
              date_added:res.rows.item(i).date_added
            })

          }
        })
        .catch(e => console.log(e));
      })
      .catch(e => console.log('NoSQL-lite not supported!'));
  }

  deleteItem(id: number): void {

    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Delete this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {

            this.sqlite.create({
              name: 'meinventory.db',
              location: 'default'
            })
              .then((db: SQLiteObject) => {
                db.executeSql(`DELETE FROM items WHERE id = ${id} `, {})
                .then(res => {
                  this.toast.show('Item has been successfully deleted!', '5000', 'center').subscribe(
                    toast => {
                      console.log(toast);
                      this.getItems(10, '', true);
                    }
                  );
                })
                .catch(e => console.log(e));
              })
              .catch(e => console.log(e));
          }
        }
      ]
    });
    alert.present();
  }

  editItem(id: number): void {

    let ItemEditModal = this.modalCtrl.create(ItemEditPage, { id: id });
    ItemEditModal.present();
  }

  viewItemDetails(id: number): void {

    let ItemDetailsModal = this.modalCtrl.create(ItemDetailsPage, { id: id });
    ItemDetailsModal.present();

  }

  searchItems(event: KeyboardEvent) {
    this.getItems(10, (<HTMLInputElement>event.target).value, false);
  }

}
