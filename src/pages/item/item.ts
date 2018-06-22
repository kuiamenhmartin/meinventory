import { OnInit, Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

/**
 * Generated class for the ItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more ianfo on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage implements OnInit {

  items: FormGroup;
  isAlreadyExists: boolean = false;
  quantity: number = 1;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private sqlite: SQLite,
    private toast: Toast) {

  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.items = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.nullValidator]],
      quantity: [1, Validators.required],
      description: ['']
    });
  }

  saveItem (data) : void {

    this.sqlite.create({
      name: 'meinventory.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO items(name, price, quantity, description)  VALUES(?,?,?,?)',
      [
        data.name,
        data.price,
        data.quantity,
        data.description
      ])
        .then(res => {
          console.log(res);
          this.toast.show('Data saved', '5000', 'center').subscribe(
            toast => {
              this.items.reset();
              this.items.patchValue({ quantity: 1});
              // this.navCtrl.push('HomePage');
            }
          );
        })
        .catch(e => {
          console.log(e);
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

  checkItem(): void {

    var data = this.items.value;

    this.sqlite.create({
      name: 'meinventory.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      db.executeSql(`SELECT * FROM items WHERE name = '${data.name}' ORDER BY id DESC`,{})
        .then(res => {

          //if item already exists
          if(res.rows.length > 0) {

            this.toast.show('Items already added!', '5000', 'center').subscribe(
              toast => {
                this.isAlreadyExists = true;
              }
            );

          } else {

            this.saveItem(data);
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemPage');
  }

}
