import { Injectable, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { Upload } from '../../shared/models/upload';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) { }

  startUpload(upload: Upload) {

    // The storage path
    upload.name = `${Date.now()}_${upload.file.name}`;
    const path = `media/${upload.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, upload.file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize( async() =>  {
        this.downloadURL = upload.url = await ref.getDownloadURL().toPromise();
        upload.$key = this.afs.createId();
        this.afs.collection('media_metadata').doc(upload.$key).set(Object.assign({}, {$key: upload.$key, downloadURL: upload.url, path, alt: upload.alt }));
      }),
    );
    return this.percentage, this.snapshot
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  deleteUpload(upload: Upload){
    this.deleteFileData(upload.$key)
    .then(()=>{
      this.deleteFileStorage(upload.name)
    })
    .catch(error => console.log(error))

  }

  private deleteFileData(key: string){
    return this.afs.collection("media_metadata").doc(key).delete();
  }

  private deleteFileStorage(name: string){
    this.storage.ref(`media/${name}`).delete();

  }
}
