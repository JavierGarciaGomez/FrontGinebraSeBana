import { Component, OnInit } from '@angular/core';
import { fireSwalConfirmation } from 'src/app/shared/helpers/helpers';
import { IPet } from 'src/app/shared/interfaces/interfaces';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-pet-page',
  templateUrl: './pet-page.component.html',
  styles: [],
})
export class PetPageComponent implements OnInit {
  constructor(private petService: PetService) {}
  get selectedPet() {
    return this.petService.selectedPet;
  }
  unknownUserImgSrc: string = 'assets/images/unknownUser.jpg';

  ngOnInit(): void {}

  async deletePet() {
    const { isConfirmed } = await fireSwalConfirmation();
    isConfirmed && this.petService.deletePet();
  }

  async removeLinkedUser(id: string) {
    console.log(this.selectedPet.linkedUsers);
    const { isConfirmed } = await fireSwalConfirmation();

    if (isConfirmed) {
      const newLinkedUsers = this.selectedPet.linkedUsers.filter(
        (element) => element.linkedUser._id !== id
      );

      const pet = { ...this.selectedPet };
      pet.linkedUsers = newLinkedUsers;
      this.petService.updatePet(pet);
    }

    // isConfirmed && this.petService.deletePet();
  }
}
