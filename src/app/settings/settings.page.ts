import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  numberMode: boolean;

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.settingsService.numberMode$.subscribe(resp => {
      this.numberMode = resp
    })
  }

  updateNumberMode() {
    this.settingsService.updateMode(this.numberMode)
  }

}
