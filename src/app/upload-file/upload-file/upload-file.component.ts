import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  files!: Set<File>;
  progress = 0;

  constructor(private uploadFileService: UploadFileService) { }

  ngOnInit(): void {
  }

  onChange(event: any) {
    //const selectedFiles: FileList = event.srcElement.files;

    this.files = new Set();

    const fileNames =  [...event.srcElement.files].map((file) => `${file.name}`).join(', ');

    [...event.srcElement.files].map(file => this.files.add(file));

    document.getElementById('customFileLabel')!.innerHTML = fileNames;

    this.progress = 0;
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.uploadFileService.upload(this.files, `${environment.BASE_URL}/upload`)
        .subscribe((event: HttpEvent<Object>) => {

          console.log(event);

          if(event.type === HttpEventType.Response) {
            console.log('Upload Concluído')
          }
          else if(event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round((event.loaded * 100) / event.total!);
            console.log('Progresso: ', percentDone);
            this.progress = percentDone;
          }
        });
    }
  }
}
