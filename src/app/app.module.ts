import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './services/in-memory-data.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { UserResolver } from './services/user.resolver';

import { AppComponent } from './app.component';
import { HeroesComponent } from './components/hero-list/heroes.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { MessagesComponent } from './components-shared/messages/messages.component';
import { AppRoutingModule } from './modules/app-routing.module';
import { SampleRoutingModule } from './modules/sample-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroSearchComponent } from './components-shared/hero-search/hero-search.component';
import { HeroDetailViewComponent } from './components/hero-detail-viewer/hero-detail-view.component';
import { AttachmentListComponent } from './components-shared/attachment-list/attachment-list.component';
import { AttachmentUploadComponent } from './components-shared/attachment-upload/attachment-upload.component';
import { AttachmentListContainerComponent } from './components/attachment-list-container/attachment-list-container.component';
import { SampleNavComponent } from './sample/__sample-nav/sample-nav.component';
import { OnChangeChildComponent } from './sample/on-change/on-change-child/on-change-child.component';
import { OnChangeParentComponent } from './sample/on-change/on-change-parent/on-change-parent.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    HeroDetailViewComponent,
    AttachmentListComponent,
    AttachmentUploadComponent,
    AttachmentListContainerComponent,
    SampleNavComponent,
    OnChangeChildComponent,
    OnChangeParentComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SampleRoutingModule,
    HttpClientModule,

    // HttpClientInMemoryWebApiModule 모듈은 HTTP 요청을 가로채고 서버의 응답을 흉내냅니다.
    // 실제 서버가 준비되면 이 부분을 제거하면 됩니다.
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // ),

    // firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  providers: [
    AuthService,
    UserService,
    AuthGuard,
    UserResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
