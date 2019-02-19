import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFeedName'
})
export class SearchFeedNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args[0]) {
      return value;
    } else if (value) {
      return value.filter(item => {
        
      })
    }
  }

  // transform(items: any[], field: string, value: string): any[] {
  //   debugger
  //   if (!items) return [];
  //   return items.filter(it => it[field] == value);
  // }

}
