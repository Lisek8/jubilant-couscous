import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { of, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import {
  CurrencyExchangeRate,
  CurrencyExchangeResponse,
  DataProviderService,
} from '../data-provider/data-provider.service';

@Component({
  selector: 'app-currency-exchange',
  templateUrl: './currency-exchange.component.html',
  styleUrls: ['./currency-exchange.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyExchangeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  exchangeRates: CurrencyExchangeRate[];
  requestedDate: Date;

  constructor(
    private dataProvider: DataProviderService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCurrentRates();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private loadCurrentRates() {
    this.dataProvider
      .getCurrentExchangeRates()
      .pipe(
        takeUntil(this.destroy$),
        catchError(() => {
          // TODO
          return of([]);
        })
      )
      .subscribe((data: CurrencyExchangeResponse[]) => {
        if (data && data[0]?.rates) {
          this.exchangeRates = data[0].rates;
          this.cdr.detectChanges();
        }
      });
  }
}
