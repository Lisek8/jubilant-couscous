import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Table } from 'primeng/table';
import { Observable, of, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import {
  CurrencyExchangeRate,
  CurrencyExchangeResponse,
  DataProviderService,
} from '../data-provider/data-provider.service';
import { Theme, ThemeServiceService } from '../theme/theme-service.service';

@Component({
  selector: 'app-currency-exchange',
  templateUrl: './currency-exchange.component.html',
  styleUrls: ['./currency-exchange.component.scss'],
})
export class CurrencyExchangeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  @ViewChild(Table)
  currencyTable: Table;
  exchangeRates: CurrencyExchangeRate[];
  requestedDate: Date;
  selectedTheme: string;
  themes: Theme[] = this.themeService.Themes;

  isLoading: boolean;
  isError: boolean;
  errorMessage: string;

  constructor(
    private dataProvider: DataProviderService,
    private cdr: ChangeDetectorRef,
    private themeService: ThemeServiceService
  ) {}

  ngOnInit(): void {
    this.selectedTheme = this.themeService.currentTheme;
    this.loadExchangeRates();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private errorHandler(
    error: HttpErrorResponse
  ): Observable<CurrencyExchangeResponse[]> {
    if (error.status === 400) {
      this.errorMessage = error.error;
      if (
        (error.error as string).includes(
          'Błędny zakres dat / Invalid date range'
        )
      ) {
        return of([
          {
            table: '',
            no: '',
            effectiveDate: '',
            rates: [],
          },
        ]);
      }
    }
    this.isError = true;
    this.isLoading = false;
    return of([]);
  }

  private loadExchangeRates(date?: Date): void {
    this.isError = false;
    this.isLoading = true;
    this.dataProvider
      .getExchangeRates(date)
      .pipe(takeUntil(this.destroy$), catchError(this.errorHandler))
      .subscribe((data: CurrencyExchangeResponse[]) => {
        if (data && data[0]?.rates) {
          this.exchangeRates = data[0].rates;
          this.isLoading = false;
        }
        this.cdr.detectChanges();
      });
  }

  clearTableStatus(): void {
    if (this.currencyTable) {
      this.currencyTable.clear();
    }
  }

  /*
    Use onBlur and onSelect events to avoid spamming api with every keystroke during manual input.
    When invalid date is passes by user, requestedDate is null in that case get current exchange rates
  */
  updateData(): void {
    this.loadExchangeRates(this.requestedDate);
  }

  onThemeButtonPress(): void {
    this.themeService.switchTheme(this.selectedTheme);
  }
}
