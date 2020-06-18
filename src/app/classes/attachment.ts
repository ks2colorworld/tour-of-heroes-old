export class Attachment {
  key?: string;
  name: string;
  url?: string;
  file?: File;
  timestamp?: any;
  constructor(file: File) {
    this.file = file;
    this.name = file.name;
  }
}
