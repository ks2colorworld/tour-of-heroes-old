import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnChangeParentComponent } from '../sample/on-change/on-change-parent/on-change-parent.component';
import { CustomEventComponent } from '../sample/custom-event/custom-event/custom-event.component';


const routes: Routes = [
  { path: 'sample/onchange', component: OnChangeParentComponent },
  { path: 'sample/custom-event', component: CustomEventComponent },
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class SampleRoutingModule { }

// ng g module modules/sample-routing --flat --module=app
