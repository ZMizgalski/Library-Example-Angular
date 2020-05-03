import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {NgForm} from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
      // this.authUrl = 'http://localhost:8080/api/auth/';
      // this.staffURL = 'http://localhost:8080/api/staff/';
      this.authUrl = '/api/auth/';
      this.staffURL = '/api/staff/';
  }
  user: any;
  productListed = false;
  isLoggedIn = false;


  productsLoaded = false;

  logged = new BehaviorSubject<any>(null);

  private authUrl: string;
  private staffURL: string;


  getAllOrdersByEmail(email: string): Observable<any> {
    return this.http.get(this.staffURL + 'getAllOrders/' + email)
      .pipe(
        catchError(this.handleError())
      );
  }

  getUserDynamicInfo(email: string): Observable<any> {
    return this.http.get(this.staffURL + 'userInfo/' + email);
  }


  getAllProducts(): Observable<any> {
    return this.http.get(this.staffURL + 'getAllProducts')
      .pipe(
        catchError(this.handleError())
      );
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(this.staffURL + 'deleteProduct/' + id)
      .pipe(
        catchError(this.handleError())
      );
  }

  deleteOrder(id: string): Observable<any> {
    return this.http.delete(this.staffURL + 'deleteOrder/' + id)
      .pipe(
        catchError(this.handleError())
      );
  }

  addNewProduct(data: NgForm): Observable<any> {
    return this.http.post<any>(this.staffURL + 'addNewProduct', data)
      .pipe(
        catchError(this.handleError())
      );
  }

  register(data: NgForm): Observable<any> {
    return this.http.post<any>(this.authUrl + 'register', data, httpOptions);
  }
  login(data: any): Observable<any> {
    return this.http.post<any>(this.authUrl + 'login', data, httpOptions);
  }


  ForgotPassword(data: NgForm): Observable<any> {
    return this.http.post<any>(this.staffURL + 'ForgotPassword', data)
      .pipe(
        catchError(this.handleError())
      );
  }


  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}

