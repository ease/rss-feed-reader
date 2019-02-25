import { Pipe, PipeTransform } from '@angular/core';
import { Feed } from '../models/Feed';

@Pipe({
  name: 'searchFeedName'
})
export class SearchFeedNamePipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter((it: Feed) => {
      return it.feed.title.toLowerCase().includes(searchText);
    });
  }
}
