import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ValidationService } from '../../../shared/services/validation';
import { HttpClient } from '@angular/common/http';
import { ILoginRes } from '../../../shared/models/login';
import { Credential } from '../../core/services/credential';
import { Token } from '../../core/services/token';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  fb = inject(FormBuilder);
  loginForm = this.fb.group({
    username: this.fb.control('', [ValidationService.required]),
    password: this.fb.control('', [ValidationService.required]),
  });

  constructor(
    private http: HttpClient,
    private readonly credentialService: Credential,
    private readonly tokenService: Token,
    private readonly router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const payload = this.loginForm.getRawValue();
    this.http.post<ILoginRes>('/auth/login', payload).subscribe({
      next: (res: ILoginRes) => {
        const { accessToken, refreshToken, ...rest } = res;
        this.credentialService.userDetail.set(rest);
        this.tokenService.setToken(accessToken);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.toastr.error(err?.error?.message || 'Something went wrong!');
      },
    });
  }
}
