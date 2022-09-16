import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { SharedModule } from '../shared/shared.module';
import { AnnouncementsRoutingModule } from './announcements-routing.module';
import { AnnouncementFormComponent } from './components/announcement-form/announcement-form.component';
import { AddAnnouncementComponent } from './containers/add-announcement/add-announcement.component';
import { AnnouncementsComponent } from './containers/announcements/announcements.component';

@NgModule({
  declarations: [
    AnnouncementsComponent,
    AddAnnouncementComponent,
    AnnouncementFormComponent,
  ],
  imports: [
    CommonModule,
    AnnouncementsRoutingModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule,
    SharedModule,
    FormsModule,
  ],
})
export class AnnouncementsModule {}
