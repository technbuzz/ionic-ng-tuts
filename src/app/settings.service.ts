import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private numberSubject = new BehaviorSubject(true)
  numberMode$ = this.numberSubject.asObservable()
  constructor() { }

  updateMode (value: boolean) {
    this.numberSubject.next(value)
  }
}
