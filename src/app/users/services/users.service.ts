import { Injectable } from '@angular/core';
import { ApiHttpService } from 'src/app/api-http';
import { User } from '../../auth/models/user';

@Injectable()
export class UsersService {
  constructor(private apiHttpService: ApiHttpService) {}

  public getUsers(role?: string | undefined) {
    return this.apiHttpService.get<User[]>(
      `/api/v1/users/get-all${role ? '/' + role : ''}`
    );
  }

  public getClientiIds() {
    return this.apiHttpService.get<{ name: string; value: string }[]>(
      '/api/v1/clienti/get-ids'
    );
  }

  public editUser(id: string, toEdit: Partial<User>) {
    return this.apiHttpService.post<User>(`/api/v1/users/edit`, { id, toEdit });
  }

  public deleteUser(id: string) {
    return this.apiHttpService.delete<User>(`/api/v1/users/delete/${id}`);
  }
}
