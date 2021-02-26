import { Component, Input } from '@angular/core';

import { Upload } from '../../shared/models/upload';

@Component({
  selector: 'uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent {

  isHovering: boolean;

  @Input() uploadList: Upload[] = [];
  // @Input() uploadUrls: string[] = [];

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.uploadList.push(new Upload(files.item(i)));
      // this.uploadUrls.push("");
      // this.files.push(files.item(i));
    }
  }

  onUploadChanges(u: Upload){
    if(u.url != ""){
      let index = this.uploadList.indexOf(u);
    }

  }
}