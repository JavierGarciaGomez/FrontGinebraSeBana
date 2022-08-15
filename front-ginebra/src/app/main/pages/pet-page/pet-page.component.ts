import { Component, OnInit } from '@angular/core';
import { fireSwalConfirmation } from 'src/app/shared/helpers/helpers';
import { IPet } from 'src/app/shared/interfaces/interfaces';
import { PetService } from '../../services/pet.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-pet-page',
  templateUrl: './pet-page.component.html',
  styles: [],
})
export class PetPageComponent implements OnInit {
  constructor(
    private petService: PetService,
    private authService: AuthService
  ) {}
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

  async linkNewUser() {
    const resp: any = await Swal.fire({
      title: 'Submit your Github username',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true,
      preConfirm: async (username) => {
        try {
          const resp = await this.authService.getUserByUsername(username);

          if (!resp.ok) {
            throw new Error(resp.statusText);
            // pet.linkedUsers.push(resp.user)
          }

          return resp.json();
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (!resp.isConfirmed) return;

    const editAuthroizationResp: any = await Swal.fire({
      title: '¿Otorgas permiso de edición al usuario?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      denyButtonText: `No`,
    });

    const editAuthorization = editAuthroizationResp.isConfirmed;

    const user = resp.value.user;
    if (!user) return;

    const newLinkedUser = {
      linkedUser: user._id,
      viewAuthorization: true,
      editAuthorization,
    };

    this.petService.linkUser(newLinkedUser);
  }
}
