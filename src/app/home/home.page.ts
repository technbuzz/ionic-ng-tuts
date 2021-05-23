import { Component } from '@angular/core';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  numberMode = true
  constructor(private settingsService: SettingsService) {
    this.settingsService.numberMode$.subscribe(data => {
      this.numberMode = data
    });
  }

}
