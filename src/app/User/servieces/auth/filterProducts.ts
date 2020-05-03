import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filerForProducts'
})
export class FilterProducts implements PipeTransform {
  transform(myObject: Array<object>, args?: Array<object>): any {
    if (!myObject) { return []; }

    if (!args) { return myObject; }

    if (args && Array.isArray(myObject)) {
      // copy all objects of original array into new array of objects
      let retrospects = myObject;
      // args are the compare oprators provided in the *ngFor directive
      // tslint:disable-next-line:only-arrow-functions
      args.forEach(function(filterer) {
        const filtered = Object.keys(filterer)[0];
        const filterable = filterer[filtered];
        // tslint:disable-next-line:only-arrow-functions
        myObject.forEach(function(objectToFilter) {
          if (filterable !== undefined) {
            // tslint:disable-next-line:triple-equals
            if (!filterable.some(x => x == objectToFilter[filtered]) && filterable != '') {
              // object didn't match a filter value so remove it from array via filter
              retrospects = retrospects.filter(obj => obj !== objectToFilter);
            }
          } else {
            return myObject;
          }
        });
      });
      // return new object to *ngFor directive
      return retrospects;
    }
  }
}



