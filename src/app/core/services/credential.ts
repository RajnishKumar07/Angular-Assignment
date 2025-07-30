import { effect, Injectable, signal } from '@angular/core';
import { ICredential } from '../../../shared/models/credential';

@Injectable({
  providedIn: 'root',
})
export class Credential {
  userDetail = signal<ICredential | null>(null);
  constructor() {
    const userDetail = localStorage.getItem('userDetails');
    if (userDetail) {
      this.userDetail.set(JSON.parse(userDetail));
    } else {
      this.userDetail.set(null);
    }
    effect(() => {
      localStorage.setItem('userDetails', JSON.stringify(this.userDetail()));
    });
  }
}
