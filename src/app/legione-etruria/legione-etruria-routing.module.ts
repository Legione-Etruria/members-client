import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//laazy load auth module
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class LegioneEtruriaRoutingModule {}
