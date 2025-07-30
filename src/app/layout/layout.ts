import { Component, computed, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Credential } from '../core/services/credential';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  userDetail = computed(() => this.credential.userDetail());
  constructor(private readonly credential: Credential) {}
}
