import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FilterSearchPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filterSearch',
})
export class FilterSearchPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], searchText: string) {
    
    if(!items) return [];
    if(!searchText) return items;
    
    searchText = searchText.toLowerCase();
    
    return items.filter( it => {
      return it['name'].toLowerCase().includes(searchText);
    });
  }
}
