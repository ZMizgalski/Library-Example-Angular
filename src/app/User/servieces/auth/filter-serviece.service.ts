import {Injectable, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {MatExpansionPanel} from '@angular/material/expansion';

@Injectable({
  providedIn: 'root'
})
export class FilterServieceService implements OnInit {


  BgcategoryNotClicked = false;
  // for button filter
  type2 = {};
  category2 = {};

  // for text filter
  textStringForFilter: string;

  // for checkbox filter
  stringForFilter = {};
  category1 = [];

  closePanel1 = false;
  closePanel2 = false;
  closePanel3 = false;


  constructor(private auth: AuthService) {
  }


  checkboxes = [
    {category: 'Przygodowe', isChecked: false},
    {category: 'Podróżnicze', isChecked: false},
    {category: 'Historyczne', isChecked: false},
    {category: 'Postapo', isChecked: false},
    {category: 'Fantasy', isChecked: false},
    {category: 'Horror', isChecked: false},
    {category: 'Bajki', isChecked: false},
    {category: 'Lektury', isChecked: false}
  ];


  subject: BehaviorSubject<any> = new BehaviorSubject<any>(this.checkboxes);
  checked = false;
  checkboxes$ = this.subject.pipe(
    map(items => {
      return items.map(item => ({...item, isChecked: this.checked}));
    })
  );

  @ViewChildren(MatExpansionPanel) viewPanels: QueryList<MatExpansionPanel>;

  clearFilter(event) {
    this.closePanel1 = false;
    this.closePanel2 = false;
    this.closePanel3 = false;
    this.type2 = {};
    this.category2 = {};
    this.category1 = [];
    this.stringForFilter = {};
    this.textStringForFilter = '';
    this.checked = event.target.checked;
    this.subject.next(this.checkboxes);
    this.BgcategoryNotClicked = false;
  }


  filter($event: MatCheckboxChange, categories) {
    if ($event.checked === true) {
      const category = this.category1;
      this.category1.push(categories);
      this.stringForFilter = {category};
      // console.log(this.stringForFilter);
      return this.stringForFilter;
    } else if ($event.checked === false) {
      const category = this.category1;
      this.category1.splice(this.category1.indexOf(categories), 1);
      this.stringForFilter = {category};
      // console.log(this.stringForFilter);
      return this.stringForFilter;
    }
  }

  buttonFilter($event: MouseEvent, bookType: string, category: string) {
    if ($event.isTrusted === true) {
      const element = document.querySelector('#content');
      if (element != null) {
        element.scrollIntoView();
      }
      this.BgcategoryNotClicked = true;
      if (category === 'Wszystkie') {
          this.type2 = {bookType};
          this.category2 = '';
      } else {
        this.type2 = {bookType};
        this.category2 = {category};
      }
      // console.log([this.type2, this.category2]);
    } else {
      this.type2 = {};
      this.category2 = {};
      // console.log([this.type2, this.category2]);
    }
  }

  // tslint:disable-next-line:contextual-lifecycle
  ngOnInit(): void {
    this.subject.next(this.checkboxes);
  }
}
