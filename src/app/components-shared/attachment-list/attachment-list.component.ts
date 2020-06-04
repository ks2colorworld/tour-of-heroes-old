import { AttachmentService } from 'src/app/services/attachment.service';
import { Component, OnInit } from '@angular/core';
import { Attachment } from 'src/app/classes/attachment';

@Component({
  selector: 'app-attachment-list',
  templateUrl: './attachment-list.component.html',
  styleUrls: ['./attachment-list.component.css']
})
export class AttachmentListComponent implements OnInit {

  files: Attachment[];
  selectedFile: Attachment;

  constructor(
    private file: AttachmentService
  ) { }

  ngOnInit(): void {
    this.getFileList();
  }

  getFileList() {
    this.file.getFileList(100)
    .then(files => {
      // console.log(files);
      this.files = files;
    });
  }

  deleteFile(pFile: Attachment) {
    this.file.deleteFileFromStorage(pFile).then(_ => {
      this.files = this.files.filter(h => h.key !== pFile.key);
    });
  }

}
