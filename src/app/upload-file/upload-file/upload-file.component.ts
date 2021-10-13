import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  files!: Set<File>;

  constructor(private uploadFileService: UploadFileService) { }

  ngOnInit(): void {
  }

  onChange(event: any) {
    //const selectedFiles: FileList = event.srcElement.files;

    this.files = new Set();

    const fileNames =  [...event.srcElement.files].map((file) => `${file.name}`).join(', ');

    [...event.srcElement.files].map(file => this.files.add(file));

    document.getElementById('customFileLabel')!.innerHTML = fileNames;
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.uploadFileService.upload(this.files, 'http://localhost:8000/upload')
        .subscribe((response) => console.log('Upload Concluído', response));
    }
  }
}
