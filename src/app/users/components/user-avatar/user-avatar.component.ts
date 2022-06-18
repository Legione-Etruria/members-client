import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent {
  @Input() user: string = 'Ignoto';
  @Input() showName = true;
  @Input() size = 10;
  @Input() textSize = 'sm';
  @Input() allowSwitch = false;

  public showUsersCards = false;
}
