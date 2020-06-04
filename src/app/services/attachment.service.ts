import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';

import firebase from 'firebase/app';

import { Attachment } from './../classes/attachment';

import { MessageService } from './message.service';
import { UtilService } from './util.service';


@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  private readonly collectionName = 'uploads';
  private get storageBasePath(): string {
    return `/${this.collectionName}`;
  }

  constructor(
    private firestore: AngularFirestore,
    private fireStorage: AngularFireStorage,
    private messageService: MessageService,
    private util: UtilService
  ) {}

  pushFileToStorage(pFile: Attachment, progress: {percentage: number}, callback?: (file: Attachment) => void) {
    // file info 저장 후 > file 저장
    // 1 - We add a message with a loading icon that will get updated with the shared image.
    this.firestore.collection<Attachment>(
      this.collectionName
    ).add({
      name: pFile.name,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(fileUploadRef => {
      // 2 - Upload the image to Cloud Storage.
      const filePath = `${this.storageBasePath}/${fileUploadRef.id}/${pFile.name}`;
      const storageRef = this.fireStorage.storage.ref();
      const uploadTask = storageRef.child(filePath).put(pFile.file);

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        // observer >> 추가 : 업로드 진행사항 표시
        (snapshot: UploadTaskSnapshot) => {
          progress.percentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        // error
        error => {
          console.log(error);
        },
        // complate
        () => {
          // 3 - Generate a public URL for the file.
          uploadTask.snapshot.ref.getDownloadURL().then(imageUrl => {
            pFile.key = fileUploadRef.id;
            pFile.url = imageUrl;
            // 4 - Update the chat message placeholder with the image's URL.
            return fileUploadRef.update({
              key: fileUploadRef.id,
              url: imageUrl,
              storageUri: uploadTask.snapshot.metadata.fullPath
            }).then(_ => {
              this.log(`file upload complete : ${pFile.name}`);
              console.log(`File available at ${pFile.url}`);
              if (callback) { callback(pFile); }
            });
          });
        }
      );
    }).catch(this.util.handleErrorPromise<Attachment>(this.pushFileToStorage.name, null, this.log));
  }
  getFileList(numItems: number, page: number= 1): Promise<Attachment[]> {
    // throw new Error(`not implemented ${this.getFileUploads.name}`);

    // 페이징 아직 구현되어 있지 않음.
    console.warn('페이징 아직 구현되어 있지 않음.', page);
    let index = page - 1;
    index = index < 0 ? 0 : index;

    return this.firestore.collection<Attachment>(
      this.collectionName,
      query => query.orderBy('timestamp', 'desc').limit(numItems)
    ).get()
    .pipe(
      map(snapshots => {
        return snapshots.docs.map(doc => {
          const data = doc.data() as Attachment;
          const id = doc.id;
          return {id, ...data};
        });
      }),
      tap(_ => this.log('fetched files')),
      catchError(this.util.handleErrorObservable<Attachment[]>(this.getFileList.name, [], this.log))
    ).toPromise();
  }
  deleteFileFromStorage(pFile: Attachment): Promise<any> {
    // throw new Error(`not implemented ${this.deleteFileUpload.name}`);
    return this.firestore.doc<Attachment>(
      `${this.collectionName}/${pFile.key}`
    ).delete().then(_ => {
      const ref = this.fireStorage.ref(
        `${this.storageBasePath}/${pFile.key}`
      );
      return ref.listAll().pipe(
        tap(dir => {
          dir.items.forEach(fileRef => {
            // console.log(fileRef.fullPath); // 삭제되는 파일확인(폴더안에 파일 모두 삭제됨.)
            this.fireStorage.ref(fileRef.fullPath).delete();
          });
          dir.prefixes.forEach(folderRef => {
            // 폴더 안에 폴더 있을 경우 재귀함수
            // https://stackoverflow.com/a/56844189/4273222
            /* 참고 코드

              deleteFolderContents(path) {
                const ref = firebase.storage().ref(path);
                ref.listAll()
                  .then(dir => {
                    dir.items.forEach(fileRef => {
                      this.deleteFile(ref.fullPath, fileRef.name);
                    });
                    dir.prefixes.forEach(folderRef => {
                      this.deleteFolderContents(folderRef.fullPath);
                    })
                  })
                  .catch(error => {
                    console.log(error);
                  });
              }

              deleteFile(pathToFile, fileName) {
                const ref = firebase.storage().ref(pathToFile);
                const childRef = ref.child(fileName);
                childRef.delete()
              }

            */
          });
          this.log(`deleted file ${pFile.name}`);
        }),
        catchError(this.util.handleErrorObservable<any>(this.deleteFileFromStorage.name, pFile, this.log))
      ).toPromise();

      // return this.fireStorage.ref(
      //   `${this.basePath}/${fileUpload.key}/*`
      // ).delete().pipe(
      //   tap(_=>this.log(`delete ${fileUpload.name} file key=${fileUpload.key}`))
      // ).toPromise()
    }).catch(this.util.handleErrorPromise<any>(this.deleteFileFromStorage.name, null, this.log));
  }
  private log(message: string) {
    this.messageService.add(`AttachmentSerive: ${message}`);
  }
}
