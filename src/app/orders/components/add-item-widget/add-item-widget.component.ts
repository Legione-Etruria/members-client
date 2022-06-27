import { Component, Input } from '@angular/core';
import { User } from 'src/app/auth/models/user';

@Component({
  selector: 'app-add-item-widget',
  templateUrl: './add-item-widget.component.html',
  styleUrls: ['./add-item-widget.component.scss'],
})
export class AddItemWidgetComponent {
  @Input() users: User[] = [];

  public selectedUser?: { battleName: string; _id: string };

  public inputDropdown: string = '';
  public showDropdown = false;

  constructor() {}

  public filterUsers() {
    return this.users.filter((i) => {
      const array = [
        i.battleName.toLowerCase(),
        i.firstName.toLowerCase(),
        i.lastName.toLowerCase(),
        i.email.toLowerCase(),
      ];

      return (
        array.some((i) =>
          i?.toLowerCase().includes(this.inputDropdown.toLowerCase())
        ) || this.inputDropdown === ''
      );
    });
  }
}
