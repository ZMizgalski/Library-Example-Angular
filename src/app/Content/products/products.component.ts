import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {FilterServieceService} from '../../User/servieces/auth/filter-serviece.service';
import {AuthService} from '../../User/servieces/auth/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  cols: number;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  products: Array<any>;

  constructor(private breakpointObserver: BreakpointObserver, public filterService: FilterServieceService, public auth: AuthService) {
  }

  ngOnInit() {
    this.cols = (window.innerWidth <= 400) ? 1 : 3;
  }
  onResize(event) {
    this.cols = (event.target.innerWidth <= 400) ? 1 : 3;
  }

}
