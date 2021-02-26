import { Component, OnInit, Input } from '@angular/core';
import { AngularFireUploadTask } from '@angular/fire/storage';
// import { NgbModal, ModalDismissReasons, NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { Upload } from '../../shared/models/upload';

import { UploadService } from '../../core/services/upload.service';

@Component({
  selector: 'upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {

  @Input() upload: Upload = new Upload();
  // @Output() uploadChanges = new EventEmitter();

  public closeResult: string;

  task: AngularFireUploadTask;
  
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  constructor(private uploadService: UploadService) { }

  ngOnInit() {
    this.percentage, this.snapshot = this.uploadService.startUpload(this.upload);
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  removeUpload(){
    this.uploadService.deleteUpload(this.upload);

  }  


}