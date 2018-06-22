import { OnInit, Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Toast } from '@ionic-native/toast';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/**
 * Generated class for the ItemDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage implements OnInit {

  id: number;
  details = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: Toast,
    private sqlite: SQLite
  ) {

    this.id = this.navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemDetailsPage');
  }

  ngOnInit() {
    this.getDetails();
  }

  getDetails() : void {

    this.sqlite.create({
      name: 'meinventory.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      db.executeSql(`SELECT * FROM items WHERE id = '${this.id}' ORDER BY id DESC`,{})
        .then(res => {

          //if item already exists
          this.details = [];
          if(res.rows.length > 0) {

            this.details = res.rows.item(0);

          } else {
            this.toast.show('Records not found!', '5000', 'center').subscribe(
              toast => {
                console.log(toast);
              }
            );
          }

        })
        .catch(e => {
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });

    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });

  }



}
