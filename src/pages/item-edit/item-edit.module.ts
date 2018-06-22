import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemEditPage } from './item-edit';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ItemEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemEditPage),
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ItemEditPage
  ]
})
export class ItemEditPageModule {}
