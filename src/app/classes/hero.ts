import { Attachment } from './attachment';

export interface Hero {
  id: number;
  name: string;
  imageUrl?: string;
  imageKey?: string;
  selectedFile?: Attachment;
}
