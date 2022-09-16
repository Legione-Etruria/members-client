import { Component, EventEmitter, Output } from '@angular/core';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { Papa } from 'ngx-papaparse';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
})
export class UploadFileComponent {
  @Output() fileChanged = new EventEmitter<{
    base64: string;
    name: string;
    type: string;
  }>();
  public file?: File;

  // public uploadLogs$ = new Subject<{
  //   assigned: Rfid[];
  //   errors: { publicId: string; msg: string }[];
  // }>();

  constructor(private papa: Papa, private toastr: ToastrService) {}

  public loading = false;

  // in app.component.ts

  onSelect(event: NgxDropzoneChangeEvent) {
    // console.log(event);
    this.file = event.addedFiles[0];
  }

  onRemove() {
    // console.log(event);
    this.file = undefined;
  }

  onSubmit() {
    if (!this.file) {
      return;
    }

    this.loading = true;

    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      if (!fileReader.result) {
        return;
      }

      // this.file = undefined;
      this.papa.parse(fileReader.result as string, {
        delimiter: ',',
        header: true,
        complete: (result) => {
          // console.log(result);
          this.fileChanged.emit({
            base64: fileReader.result as string,
            name: this.file?.name || 'ignoto',
            type: this.file?.type || 'pdf',
          });
        },
      });

      this.loading = false;
    };

    fileReader.readAsText(this.file);
  }
}
