import { Header } from './../shared/services/header';
import { Component, computed, input } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Credential } from '../core/services/credential';
import { Token } from '../core/services/token';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  userDetail = computed(() => this.credential.userDetail());
  heading = computed(() => this.header.heading());
  constructor(
    private readonly credential: Credential,
    private readonly tokenService: Token,
    private readonly router: Router,
    private readonly header: Header
  ) {}

  logOut() {
    this.credential.userDetail.set(null);
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
  }
}
