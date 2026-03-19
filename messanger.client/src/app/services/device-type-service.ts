import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, fromEvent, map, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceTypeService {
  private isMobileSubject = new BehaviorSubject<boolean>(false);

  isMobile$ = this.isMobileSubject.asObservable();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      // Настраиваем отслеживание resize
      fromEvent(window, 'resize')
        .pipe(
          map(() => window.innerWidth <= 768),
          startWith(window.innerWidth <= 768),
          distinctUntilChanged()
        )
        .subscribe(isMobile => {
          this.isMobileSubject.next(isMobile);
        });
    }
  }
}
