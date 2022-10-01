import { Injectable } from '@angular/core';
import { ApiHttpService } from 'src/app/api-http';

@Injectable()
export class AnnouncementsService {
  constructor(private apiHttp: ApiHttpService) {}
}
