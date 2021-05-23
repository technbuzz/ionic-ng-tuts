import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  numberMode: boolean = true;

  constructor(private events: Events) { }

  ngOnInit() {
  }

  updateNumberMode() {
    // this.settingsService.inputBS.next(this.dynamicPricing);
    this.events.publish('dynamic:Pricing', this.numberMode);
  }

}
