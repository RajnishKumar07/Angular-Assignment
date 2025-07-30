import { Injectable, signal } from '@angular/core';
import { ICredential } from '../../../shared/models/credential';

@Injectable({
  providedIn: 'root',
})
export class Credential {
  userDetail = signal<ICredential | null>(null);
}
