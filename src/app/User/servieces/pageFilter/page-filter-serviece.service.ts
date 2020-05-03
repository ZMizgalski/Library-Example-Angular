import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageFilterServieceService {

  filterString: string;
  searchbarData = [
    {page: 'Księgozbiór', char: 'k', rout: 'products'},
    {page: 'Strona Główna', char: 's', rout: 'home'},
    {page: 'Kontakt', char: 'k', rout: 'contact'},
    {page: 'O nas', char: 'o', rout: 'about'},
    {page: 'Regulamin', char: 'r', rout: 'regulations'},
    {page: 'Dostawa', char: 'd', rout: 'delivery'},
    {page: 'Nowości', char: 'n', rout: 'news'},
  ];

  constructor() {
  }


}
