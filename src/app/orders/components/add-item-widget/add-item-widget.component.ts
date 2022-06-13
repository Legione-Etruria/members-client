import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/auth/models/user';

@Component({
  selector: 'app-add-item-widget',
  templateUrl: './add-item-widget.component.html',
  styleUrls: ['./add-item-widget.component.scss'],
})
export class AddItemWidgetComponent implements OnInit {
  @Input() users: User[] = [];

  public selectedUser?: { battleName: string; _id: string };

  public showDropdown = false;

  constructor() {}

  ngOnInit(): void {}
}
