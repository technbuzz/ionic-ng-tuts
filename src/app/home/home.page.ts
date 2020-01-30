import { Component } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from 'rxjs';
import { debug } from 'util';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  items: Observable<any[]>;

  newTodo: string = '';

  constructor(private db: AngularFirestore ) {
    this.items = db.collection('items').valueChanges();
  }

  addTodo(){
    debug
    this.db.collection('items').add({
      title: this.newTodo
    }).then(resp => {
      console.log(resp);
      
    }).catch(error => {
      console.log(error);
      
    })
  }
}
