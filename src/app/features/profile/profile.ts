import { Component, computed } from '@angular/core';
import { Credential } from '../../core/services/credential';
import { Header } from '../../shared/services/header';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  userDetail = computed(() => this.credential.userDetail());
  constructor(
    private readonly credential: Credential,
    private readonly header: Header
  ) {
    this.header.heading.set('Profile Page');
  }
}
