import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MenubarModule } from 'primeng/menubar';
import { TabViewModule } from 'primeng/tabview';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';

import { AppComponent } from './app.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { CurrencyExchangeComponent } from './currency-exchange/currency-exchange.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButtonModule } from 'primeng/selectbutton';

@NgModule({
  declarations: [AppComponent, MenuBarComponent, CurrencyExchangeComponent],
  imports: [
    BrowserModule,
    MenubarModule,
    TabViewModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    FormsModule,
    CalendarModule,
    BrowserAnimationsModule,
    DropdownModule,
    MultiSelectModule,
    SelectButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [CurrencyExchangeComponent],
})
export class AppModule {}
