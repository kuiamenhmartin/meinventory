import { Component } from '@angular/core';

/**
 * Generated class for the ItemDetailsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsComponent {

  text: string;

  constructor() {
    console.log('Hello ItemDetailsComponent Component');
    this.text = 'Hello World';
  }

}
