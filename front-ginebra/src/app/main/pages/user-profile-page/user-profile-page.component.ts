import { Component, OnInit } from '@angular/core';
import { IUser, IPet } from '../../../shared/interfaces/interfaces';
import { AuthService } from '../../../auth/services/auth.service';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styles: [],
})
export class UserProfilePageComponent implements OnInit {
  user: IUser;
  userLinkedPets: IPet[];

  constructor(
    private authService: AuthService,
    private petService: PetService
  ) {
    this.user = authService.user!;
    // this.petService.getLinkedPetsByUser(this.authService.user?._id!);

    if (!this.user.imgUrl) this.user.imgUrl = 'assets/images/unknownUser.jpg';
    this.userLinkedPets = petService.userLinkedPets || [];
  }

  ngOnInit(): void {}
}
