import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'buttonFilterForProducts'
})
export class ButtonFilterProducts implements PipeTransform {
  transform(myObjects: Array<object>, args?: Array<object>): any {
    if (args && Array.isArray(myObjects)) {
      // copy all objects of original array into new array of objects
      let returnObjects = myObjects;
      // args are the compare oprators provided in the *ngFor directive
      // tslint:disable-next-line:only-arrow-functions
      args.forEach(function(filterObj) {
        const filterKey = Object.keys(filterObj)[0];
        const filterValue = filterObj[filterKey];
        // tslint:disable-next-line:only-arrow-functions
        myObjects.forEach(function(objectToFilter) {
          // console.log(objectToFilter[filterKey]);

          // tslint:disable-next-line:triple-equals
          if (objectToFilter[filterKey] != filterValue && filterValue != '') {
            // object didn't match a filter value so remove it from array via filter
            returnObjects = returnObjects.filter(obj => obj !== objectToFilter);
          }
        });
      });
      // return new object to *ngFor directive
      return returnObjects;
    }
  }

}
