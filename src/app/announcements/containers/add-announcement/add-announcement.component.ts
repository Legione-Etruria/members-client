import { Component, OnInit } from '@angular/core';
import { Announcement } from 'src/app/models/announcement';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.scss'],
})
export class AddAnnouncementComponent implements OnInit {
  public data: Partial<Announcement> = {
    title: '',
    description: '',
    location: '',
    attachments: [],
  };

  public froalaOptions = {
    placeholderText: 'Inserisci una descrizione',
    charCounterCount: true,
    toolbarButtons: [
      'alignLeft',
      'alignCenter',
      'formatOLSimple',
      'alignRight',
      'alignJustify',
      'formatOL',
      'formatUL',
      'paragraphFormat',
      'paragraphStyle',
      'lineHeight',
      'outdent',
      'indent',
      'quote',
      'bold',
      'italic',
      'underline',
      'strikeThrough',
      'subscript',
      'superscript',
      'fontFamily',
      'fontSize',
      'textColor',
      'backgroundColor',
      'inlineClass',
      'inlineStyle',
      'clearFormatting',
      'insertLink',
      'insertImage',
      'insertVideo',
      'insertTable',
      'emoticons',
      'fontAwesome',
      'specialCharacters',
      'embedly',
      'insertFile',
      'insertHR',
      'undo',
      'redo',
      'fullscreen',
      'print',
      'getPDF',
      'spellChecker',
      'selectAll',
      'html',
      'help',
    ],
  };

  constructor() {}

  ngOnInit(): void {}

  public handleFileChanged(file: {
    name: string;
    base64: string;
    type: string;
  }) {
    this.data.attachments?.push(file);
  }
}
