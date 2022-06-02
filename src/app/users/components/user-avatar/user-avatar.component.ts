import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent implements OnInit {
  @Input() user: string = '';
  @Input() showName = true;
  @Input() size = 10;
  @Input() textSize = 'sm';

  constructor() {}

  ngOnInit(): void {}
}
