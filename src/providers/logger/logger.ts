import { Injectable } from '@angular/core';

import { Toast } from '@ionic-native/toast';

/*
  Generated class for the LoggerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoggerProvider {

  constructor() {
    console.log('Hello LoggerProvider Provider');
  }

  logMessage(): void {
    
  } 

}
