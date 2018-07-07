import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    // defensive programming
    if(!items) return [];
    if(!searchText) return items;
    // enforce lowercase strings for the search to work
    searchText = searchText.toLowerCase();
    return items.filter((it) => {
        return it.title.toLowerCase().includes(searchText);
    });
   }
}