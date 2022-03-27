import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-currency-exchange',
  templateUrl: './currency-exchange.component.html',
  styleUrls: ['./currency-exchange.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyExchangeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
