import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnChangeParentComponent } from '../sample/on-change/on-change-parent/on-change-parent.component';


const routes: Routes = [
  { path: 'sample/onchange', component: OnChangeParentComponent },
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class SampleRoutingModule { }

// ng g module modules/sample-routing --flat --module=app
