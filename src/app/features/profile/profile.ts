import { Component, computed } from '@angular/core';
import { Credential } from '../../core/services/credential';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  userDetail = computed(() => this.credential.userDetail());
  constructor(private readonly credential: Credential) {}
}
