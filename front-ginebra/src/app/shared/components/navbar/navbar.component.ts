import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IUser } from '../../interfaces/interfaces';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  user: IUser | null;

  constructor(private authService: AuthService) {
    this.user = authService.user;
    this.authService.userChange.subscribe((user) => {
      this.imgUrl = user.imgUrl || 'assets/images/unknownUser.jpg';
    });
    console.log('CONSTRUCTOR NAVBAR ', this.user);
  }

  imgUrl = 'assets/images/unknownUser.jpg';

  ngOnInit(): void {
    if (this.user?.imgUrl) {
      this.imgUrl = this.user?.imgUrl;
    }
  }

  logout() {
    this.authService.logout();
  }
}
