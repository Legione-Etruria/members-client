import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { Announcement } from 'src/app/models/announcement';
import { ParsedFile } from 'src/app/shared/upload-file/upload-file.component';

@Component({
  selector: 'app-announcement-form',
  templateUrl: './announcement-form.component.html',
  styleUrls: ['./announcement-form.component.scss'],
})
export class AnnouncementFormComponent implements OnInit {
  @Input() hideElements: (
    | 'shops'
    | 'submit'
    | 'orderNotes'
    | 'startDate'
    | 'dueDate'
  )[] = [];
  @Input() loading = false;
  @Input() announcementData?: Announcement;
  @Input() users: { value: string; label: string }[] = [];
  @Output() submitted = new EventEmitter<Partial<Announcement>>();

  public form!: FormGroup;

  public editor = new Editor({});

  public toolbar: Toolbar = [
    // default value
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    // [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear'],
  ];
  // colorPresets = ['red', '#FF0000', 'rgb(255, 0, 0)'];

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(this.announcementData?.title || [], [
        Validators.required,
      ]),
      description: new FormControl(this.announcementData?.description),
      users: new FormControl(this.announcementData?.users || [], [
        Validators.required,
        Validators.minLength(1),
      ]),
      attachments: new FormControl(
        this.announcementData?.attachments || [],
        []
      ),
      location: new FormControl(this.announcementData?.location || '', []),
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted.emit(this.form.value);
  }

  public handleFileChanged(file: ParsedFile) {
    const attachments = this.form.get('attachments');
    attachments?.setValue([...attachments?.value, file]);
  }

  public handleFileRemoved(file: ParsedFile) {
    const attachments = this.form.get('attachments');
    attachments?.setValue(
      attachments?.value.filter((f: ParsedFile) => f.name !== file.name)
    );
  }
}
