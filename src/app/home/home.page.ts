import { Component } from '@angular/core';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  numberMode = true
  constructor(private events: Events) {
    this.events.subscribe('dynamic:Pricing', data => {
      this.numberMode = data
    });
  }

}
