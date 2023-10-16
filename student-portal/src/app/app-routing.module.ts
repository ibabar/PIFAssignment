import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostMessageComponent } from './post-message/post-message.component';

const routes: Routes = [
  {
    path: '',
    component: PostMessageComponent,
    pathMatch: 'full',
  },
  {
    path: 'msg',
    component: PostMessageComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
