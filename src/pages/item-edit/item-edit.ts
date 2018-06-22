import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

/**
 * Generated class for the ItemEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-edit',
  templateUrl: 'item-edit.html',
})
export class ItemEditPage {

  items: FormGroup;
  id: number;
  details = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private fb: FormBuilder,
    private sqlite: SQLite,
    private toast: Toast) {

      this.items = this.fb.group({
        name: ['', Validators.required],
        price: ['', [Validators.required, Validators.nullValidator]],
        quantity: ['', Validators.required],
        description: ['']
      });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemEditPage');
  }

  ngOnInit() {
    this.id = this.navParams.get('id');
    this.createForm();
  }

  createForm() {

    this.sqlite.create({
      name: 'meinventory.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      db.executeSql(`SELECT * FROM items WHERE id = '${this.id}' ORDER BY id DESC`,{})
        .then(res => {

          //if item already exists
          this.details = [];
          if(res.rows.length > 0) {

            this.items.setValue({
              name: res.rows.item(0)['name'],
              price: res.rows.item(0)['price'],
              quantity: res.rows.item(0)['quantity'],
              description: res.rows.item(0)['description']
            });

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

  checkItem(): void {

    var data = this.items.value;

    this.sqlite.create({
      name: 'meinventory.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      db.executeSql(`SELECT * FROM items WHERE name = '${data.name}' and id != '${this.id}' ORDER BY id DESC`,{})
        .then(res => {

          //if item already exists
          if(res.rows.length > 0) {

            this.toast.show('Items already added!', '5000', 'center').subscribe(
              toast => {
              }
            );

          } else {

            this.updateItem(data);
          }

        })
        .catch(e => {
          alert(e);
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

  updateItem (data) : void {

    this.sqlite.create({
      name: 'meinventory.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql(`UPDATE items
          SET name = '${data.name}',
              price = '${data.price}',
              quantity='${data.quantity}',
              description = '${ data.description}'
          WHERE id = '${this.id}'`
          , {})
        .then(res => {
          this.toast.show('Item has been updated', '5000', 'center').subscribe(
            toast => {
              this.viewCtrl.dismiss({});
            }
          );
        })
        .catch(e => {
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

}
