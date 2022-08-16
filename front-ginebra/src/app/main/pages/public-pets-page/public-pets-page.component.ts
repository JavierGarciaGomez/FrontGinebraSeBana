import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PetService } from '../../services/pet.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-public-pets-page',
  templateUrl: './public-pets-page.component.html',
  styleUrls: ['./public-pets-page.component.scss'],
})
export class PublicPetsPageComponent implements OnInit {
  constructor(
    private petService: PetService,
    private authService: AuthService
  ) {
    this.petService.getPublicPets();
  }

  get publicPets() {
    return this.petService.publicPets;
  }

  get user() {
    return this.authService.user;
  }

  ngOnInit(): void {}

  async linkNewUser(petId: string) {
    const newLinkedUser = {
      linkedUser: this.user!._id,
      viewAuthorization: true,
      editAuthorization: false,
    };
    this.petService.linkUser(newLinkedUser, petId);
  }
}
