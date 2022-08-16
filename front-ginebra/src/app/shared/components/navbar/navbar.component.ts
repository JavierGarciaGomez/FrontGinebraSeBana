import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IUser, IPet } from '../../interfaces/interfaces';
import { PetService } from '../../../main/services/pet.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  imgUrl = 'assets/images/unknownUser.jpg';

  get user() {
    return this.authService.user;
  }
  get pets() {
    return this.petService.userLinkedPets;
  }
  get selectedPet() {
    return this.petService.selectedPet;
  }

  constructor(
    private authService: AuthService,
    private petService: PetService
  ) {
    console.log('user', authService.user);
    console.log('pet', petService.selectedPet);
  }

  ngOnInit(): void {
    if (this.user?.imgUrl) {
      this.imgUrl = this.user?.imgUrl;
    }
    console.log(this.selectedPet);
  }

  logout() {
    this.authService.logout();
  }

  selectPet(pet: IPet) {
    this.petService.selectedPetChange.next(pet);
  }
}
