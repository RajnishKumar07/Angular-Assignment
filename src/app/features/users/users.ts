import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, linkedSignal, OnInit, signal } from '@angular/core';
import { IUser, IUserRes } from '../../../shared/models/users';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, startWith } from 'rxjs';

@Component({
  selector: 'app-users',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit {
  allUsers = signal<IUser[]>([]);
  filteredUsers = linkedSignal(() => [...this.allUsers()]);
  searchControl = new FormControl('');
  constructor(private readonly http: HttpClient) {
    this.getProductDetail();
  }
  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        filter((keyword) => keyword === '' || keyword?.trim() !== ''),
        distinctUntilChanged()
      )
      .subscribe((searchTerm) => {
        if (searchTerm) {
          const filteredData = this.allUsers().filter(
            (user) =>
              `${user.firstName} ${user.lastName}`
                .toLowerCase()
                .includes(searchTerm) ||
              user.email.toLowerCase().includes(searchTerm)
          );

          this.filteredUsers.set([...filteredData]);
        } else {
          this.filteredUsers.set([...this.allUsers()]);
        }
      });
  }

  private getProductDetail() {
    this.http.get<IUserRes>('/users').subscribe({
      next: (res) => {
        this.allUsers.set(res.users);
      },
    });
  }
}
