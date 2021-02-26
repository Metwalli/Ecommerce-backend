import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropzoneDirective } from './dropzone.directive';
import { UploaderComponent } from './uploader/uploader.component';
import { UploadTaskComponent } from './upload-task/upload-task.component';



@NgModule({
  declarations: [DropzoneDirective, UploaderComponent, UploadTaskComponent],
  imports: [
    CommonModule
  ],
  exports: [
    UploaderComponent, 
    UploadTaskComponent
  ]
})
export class ImageUploaderModule { }
