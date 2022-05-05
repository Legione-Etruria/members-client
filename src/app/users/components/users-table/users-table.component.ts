import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  combineLatest,
  debounceTime,
  map,
  Observable,
  startWith,
  tap,
} from 'rxjs';
import { User } from '../../../auth/models/user';

@Component({
  selector: 'golden-users-table',
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent implements OnInit {
  @Input() users!: Observable<User[]>;
  @Input() currentUser: User = {} as User;
  @Input() currentParams?: string;
  @Input() loading = true;

  public searchField: FormControl;
  public filteredUsers$!: Observable<User[]>;
  constructor() {
    this.searchField = new FormControl('');
  }

  ngOnInit() {
    this.loading = true;
    const searchTerm$ = this.searchField.valueChanges.pipe(
      startWith(this.searchField.value)
    );

    this.filteredUsers$ = combineLatest([this.users, searchTerm$])
      .pipe(
        debounceTime(200),
        map(([ticketsInstance, searchTerm]) =>
          ticketsInstance.filter((user: User) => {
            const userArray = [
              user.email,
              user.figtMembership,
              user.firstName,
              user.lastName,
              user.battleName,
            ];

            return (
              searchTerm === '' ||
              userArray.some((i) =>
                i?.toLowerCase().includes(searchTerm.toLowerCase())
              )
            );
          })
        )
      )
      .pipe(tap(() => (this.loading = false)));
  }
}
