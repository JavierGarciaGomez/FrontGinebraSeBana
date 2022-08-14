import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../shared/interfaces/interfaces';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styles: [],
})
export class UserProfilePageComponent implements OnInit {
  user: IUser;

  constructor(private authService: AuthService) {
    this.user = authService.user!;
  }

  ngOnInit(): void {}
}
