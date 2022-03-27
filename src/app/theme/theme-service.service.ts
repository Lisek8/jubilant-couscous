import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

export interface Theme {
  name: string;
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeServiceService {
  public readonly Themes: Theme[] = [
    { name: 'Jasny', value: 'light' },
    { name: 'Ciemny', value: 'dark' },
  ];

  constructor(@Inject(DOCUMENT) private document: Document) {}

  switchTheme(theme: string): void {
    const themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = theme + '.css';
    }
  }
}
