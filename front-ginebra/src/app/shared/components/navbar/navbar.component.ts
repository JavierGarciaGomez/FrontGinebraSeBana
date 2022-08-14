import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IUser, IPet } from '../../interfaces/interfaces';
import { PetService } from '../../../main/services/pet.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  user: IUser | null;
  pets: IPet[] = [];

  constructor(
    private authService: AuthService,
    private petService: PetService
  ) {
    this.user = authService.user;
    this.authService.userChange.subscribe((user) => {
      this.imgUrl = user.imgUrl || 'assets/images/unknownUser.jpg';
    });
    if (this.user) {
    }
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
