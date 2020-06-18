import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { HeroDetailComponent } from '../components/hero-detail/hero-detail.component';
import { HeroesComponent } from '../components/hero-list/heroes.component';
import { AttachmentListContainerComponent } from '../components/attachment-list-container/attachment-list-container.component';
import { SampleNavComponent } from '../sample/__sample-nav/sample-nav.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { UserComponent } from '../components/user/user.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'attachment', component: AttachmentListContainerComponent },
  { path: 'sample', component: SampleNavComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthService] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthService] },
  { path: 'user', component: UserComponent,  resolve: { userData: UserService}}
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
