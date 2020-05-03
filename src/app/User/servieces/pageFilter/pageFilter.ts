import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterForPages'
})
// tslint:disable-next-line:class-name
export class pageFilter implements PipeTransform {

  transform(items: any[], searchText: string): any {

    if (!items) { return []; }

    if (!searchText) { return items; }

    return items.filter(item => {
      return Object.keys(item).some(key => {
        const lineText = searchText.replace(/\s+/g, '');
        return String(item[key]).toLowerCase().includes(lineText.toLowerCase());
      });
    });

  }

}
