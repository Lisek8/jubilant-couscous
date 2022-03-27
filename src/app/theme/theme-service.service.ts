import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

export interface Theme {
  name: string;
  value: string;
}

export enum ThemeValues {
  LIGHT = 'light',
  DARK = 'dark',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeServiceService {
  private readonly themeLocalStorageName = 'Theme';
  public readonly Themes: Theme[] = [
    { name: 'Jasny', value: ThemeValues.LIGHT },
    { name: 'Ciemny', value: ThemeValues.DARK },
  ];
  public currentTheme: string;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.currentTheme =
      localStorage.getItem(this.themeLocalStorageName) ?? ThemeValues.LIGHT;
    this.switchTheme(this.currentTheme);
  }

  switchTheme(theme: string): void {
    const themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = theme + '.css';
      localStorage.setItem(this.themeLocalStorageName, theme);
    }
  }
}
