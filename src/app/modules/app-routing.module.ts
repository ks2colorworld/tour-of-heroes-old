import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { HeroDetailComponent } from '../components/hero-detail/hero-detail.component';
import { HeroesComponent } from '../components/hero-list/heroes.component';
import { AttachmentListContainerComponent } from '../components/attachment-list-container/attachment-list-container.component';
import { SampleNavComponent } from '../sample/__sample-nav/sample-nav.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'attachment', component: AttachmentListContainerComponent },
  { path: 'sample', component: SampleNavComponent },
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
