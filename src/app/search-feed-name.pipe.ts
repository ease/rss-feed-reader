import { Pipe, PipeTransform } from '@angular/core';
import { Feed } from './common/models/Feed';

@Pipe({
  name: 'searchFeedName'
})
export class SearchFeedNamePipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      debugger
      it.feed.title.includes(searchText);
    });
    return items;
    console.log('items::', items);
  }

  // transform(value: any, args?: any): any {
  //   if (!args[0]) {
  //     return value;
  //   } else if (value) {
  //     return value.filter(item => {

  //     })
  //   }
  // }

  // transform(items: any[], field: string, value: string): any[] {
  //   debugger
  //   if (!items) return [];
  //   return items.filter(it => it[field] == value);
  // }
}
