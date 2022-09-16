import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAnnouncementComponent } from './containers/add-announcement/add-announcement.component';
import { AnnouncementsComponent } from './containers/announcements/announcements.component';

const routes: Routes = [
  {
    path: 'list',
    component: AnnouncementsComponent,
  },
  {
    path: 'add',
    component: AddAnnouncementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnouncementsRoutingModule {}
