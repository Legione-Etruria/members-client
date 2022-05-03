import { Subject } from 'rxjs';

export class TailwindDialogRef {
  close(result?: any): void {
    this._afterClosed.next(result);
  }

  private readonly _afterClosed = new Subject<any>();

  afterClosed = this._afterClosed.asObservable();
}
