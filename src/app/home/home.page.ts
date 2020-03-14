import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController } from '@ionic/angular';
import { finalize } from "rxjs/operators";
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  items: Observable<any[]>;

  newTodo: string = '';
  itemsRef: AngularFirestoreCollection;

  selectedFile: any;
  loading: HTMLIonLoadingElement;

  constructor(private db: AngularFirestore, private storage: AngularFireStorage, private loadingController: LoadingController) {
    this.itemsRef = db.collection('items')
    this.items = this.itemsRef.valueChanges();
  }

  chooseFile (event) {
    this.selectedFile = event.target.files
  }

  addTodo(){
    this.itemsRef.add({
      title: this.newTodo
    })
    .then(async resp => {

      const uploadTask: UploadTaskSnapshot = await this.uploadFile(resp.id, this.selectedFile)
      const imageUrl = await uploadTask.ref.getDownloadURL()

      this.itemsRef.doc(resp.id).update({
        id: resp.id,
        imageUrl: imageUrl || null,
      })
    }).catch(error => {
      console.log(error);
    })
  }

  async uploadFile(id, fileList): Promise<any> {
    if(fileList && fileList.length) {
      try {
        await this.presentLoading();
        const file = fileList[0]
        const fileRef = this.storage.ref(`images/${id}`);
        const task = this.storage.upload(`images/${id}`, file)
        task.percentageChanges().subscribe(resp => {
          this.loading.style.setProperty('--percent-uploaded', `${resp.toFixed()}%`)
          console.log(resp);
        })
        return task.snapshotChanges().pipe(
            finalize(() => this.loading.dismiss() )
        ).toPromise()

      } catch (error) {
        console.log(error);
      }
    } else {
      return null;
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
      cssClass: 'with-progress'
    });
    return this.loading.present();
  }



  remove(item){
    console.log(item);
    if(item.imageUrl) {
      this.storage.ref(`images/${item.id}`).delete()
    }
    this.itemsRef.doc(item.id).delete()
  }
}
