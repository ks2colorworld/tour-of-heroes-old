import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Attachment } from 'src/app/classes/attachment';
import { AttachmentService } from 'src/app/services/attachment.service';

@Component({
  selector: 'app-attachment-upload',
  templateUrl: './attachment-upload.component.html',
  styleUrls: ['./attachment-upload.component.css']
})
export class AttachmentUploadComponent implements OnInit {

  private readonly _defaultUploadLabel = 'Upload';
  private readonly _defaultFileAccept = 'image/gif, image/jpeg, image/png';

  selectedFiles: FileList;
  currentFile: Attachment;
  progress: {percentage: number} = {percentage: 0};

  @Input() __UploadLabel__: string;
  @Input() __FileAccept__: string;

  public get uploadButtonLabel(): string {
    return this.__UploadLabel__ ? this.__UploadLabel__ : this._defaultUploadLabel;
  }
  public get fileAcceptExtension(): string {
    return this.__FileAccept__ ? this.__FileAccept__ : this._defaultFileAccept;
  }

  // custom event 사용법 >> (__UploadComplete__)='this.doSomething($event)'
  @Output() __UploadComplete__ = new EventEmitter();

  constructor(
    private fileService: AttachmentService,
  ) { }

  ngOnInit(): void {
  }

  selectFile(event) {
    // TODO : 파일이 선택되었는지 체크함. >> isFileSelected? __FileSelected__ 이벤트
    this.selectedFiles = event.target.files;
  }

  upload() {
    const file = this.selectedFiles[0];

    this.currentFile = new Attachment(file);
    this.fileService.pushFileToStorage(this.currentFile, this.progress,
      (fileUpload: Attachment) => {
        if (fileUpload) {
          console.log(`upload complete! ${fileUpload.key}`);
          this.selectedFiles = undefined;
          this.currentFile = undefined;
          // custom event 발생시킴
          this.__UploadComplete__.emit({value: fileUpload});
        }
      });
  }
}
