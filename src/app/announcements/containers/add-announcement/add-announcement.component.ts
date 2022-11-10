import { Component } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';
import { map } from 'rxjs';
import { Announcement } from 'src/app/models/announcement';
import { UsersService } from 'src/app/users/services/users.service';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.scss'],
})
export class AddAnnouncementComponent {
  public users$ = this.usersService
    .getUsers()
    .pipe(map((i) => i.map((j) => ({ value: j._id, label: j.battleName }))));

  public data: Partial<Announcement & { users: string[] }> = {
    title: '',
    description: '',
    location: '',
    attachments: [],
    users: [],
  };

  public selectedUsers: { item_id: string; item_text: string }[] = [];

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Seleziona Tutti',
    unSelectAllText: 'Deseleziona Tutti',
    searchPlaceholderText: 'Cerca',
    itemsShowLimit: 3,
    allowSearchFilter: true,
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

  constructor(private usersService: UsersService) {}

  public handleFileChanged(file: {
    name: string;
    base64: string;
    type: string;
  }) {
    this.data.attachments?.push(file);
  }

  public handleUnSelectUser(user: { item_id: string }) {
    this.data.users?.splice(this.data.users.indexOf(user.item_id), 1);
  }

  public handleSelectUser(user: { item_id: string }) {
    this.data.users?.push(user.item_id as string);
  }

  public handleSelectAllUsers(users: { item_id: string }[]) {
    (this.data.users as string[]) = users.map((i) => i.item_id as string);
  }
}
