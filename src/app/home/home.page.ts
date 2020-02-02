import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
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
  itemsRef: AngularFirestoreCollection;

  constructor(private db: AngularFirestore ) {
    this.itemsRef = db.collection('items')
    this.items = this.itemsRef.valueChanges();
  }

  addTodo(){
    this.itemsRef.add({
      title: this.newTodo
    })
    .then(resp => {
      this.itemsRef.doc(resp.id).update({
        id: resp.id
      })
    }).catch(error => {
      console.log(error);
    })
  }

  remove(item){
    console.log(item);
    this.itemsRef.doc(item.id).delete()
  }
}
