import {ChangeDetectorRef, Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../User/servieces/auth/auth.service';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, DoCheck {
  products = [];
  public newsLoaded = false;
  public ld = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  currentItemsToShow = [];
  @ViewChild('paginatorNews') paginator: MatPaginator;

  constructor(private changeDetectorRef: ChangeDetectorRef, private auth: AuthService, private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {
    if (!this.newsLoaded) {
      this.auth.getAllProducts().subscribe(data => {
        this.products = data;
        this.newsLoaded = true;
        this.ld = true;
        this.changeDetectorRef.detectChanges();
        // tslint:disable-next-line:max-line-length
        this.currentItemsToShow = this.products.slice(this.paginator.pageIndex * this.paginator.pageSize, this.paginator.pageIndex * this.paginator.pageSize + this.paginator.pageSize);

      });
    }
  }

  ngDoCheck(): void {
    if (!this.newsLoaded && this.ld) {
      this.auth.getAllProducts().subscribe(data => {
        this.products = data;
        this.newsLoaded = true;
        this.ld = false;
        // tslint:disable-next-line:max-line-length
        this.currentItemsToShow = this.products.slice(this.paginator.pageIndex * this.paginator.pageSize, this.paginator.pageIndex * this.paginator.pageSize + this.paginator.pageSize);

      });
    }
  }

  onPageChange() {
    if (this.newsLoaded) {
      // tslint:disable-next-line:max-line-length
      // tslint:disable-next-line:max-line-length
      this.currentItemsToShow = this.products.slice(this.paginator.pageIndex * this.paginator.pageSize, this.paginator.pageIndex * this.paginator.pageSize + this.paginator.pageSize);

    }
  }
}
