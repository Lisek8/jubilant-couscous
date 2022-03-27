import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MenubarModule } from 'primeng/menubar';
import { TabViewModule } from 'primeng/tabview';

import { AppComponent } from './app.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { CurrencyExchangeComponent } from './currency-exchange/currency-exchange.component';

@NgModule({
  declarations: [AppComponent, MenuBarComponent, CurrencyExchangeComponent],
  imports: [BrowserModule, MenubarModule, TabViewModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    CurrencyExchangeComponent
  ],
})
export class AppModule {}
