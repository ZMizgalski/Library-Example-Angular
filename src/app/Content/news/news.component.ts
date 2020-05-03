import {Component, DoCheck, OnInit} from '@angular/core';
import {AuthService} from '../../User/servieces/auth/auth.service';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, DoCheck {
  products = [];
  public newsLoaded = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private auth: AuthService, private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {
    this.auth.getAllProducts().subscribe(data => {
      this.products = data;
      this.newsLoaded = true;
    });
  }
    ngDoCheck(): void {
    this.auth.getAllProducts().subscribe(data => {
      this.products = data;
      this.newsLoaded = true;
    });
  }
}
