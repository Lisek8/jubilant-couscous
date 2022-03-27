import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataProviderService {
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(() => error);
  }

  public getCurrentExchangeRates(): Observable<any> {
    return this.http
      .get<any>('https://api.nbp.pl/api/exchangerates/tables/A/?format=json')
      .pipe(catchError(this.handleError));
  }

  public getExchangeRatesFromDate(date: Date): Observable<any> {
    const formattedDate = date.toISOString().split('T')[0];
    return this.http
      .get<any>(
        `http://api.nbp.pl/api/exchangerates/tables/A/${formattedDate}/?format=json`
      )
      .pipe(catchError(this.handleError));
  }
}
