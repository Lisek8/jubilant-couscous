import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MenubarModule } from 'primeng/menubar';
import { TabViewModule } from 'primeng/tabview';

import { AppComponent } from './app.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';

@NgModule({
  declarations: [AppComponent, MenuBarComponent],
  imports: [BrowserModule, MenubarModule, TabViewModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
