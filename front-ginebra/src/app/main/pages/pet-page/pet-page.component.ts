import { Component, OnInit } from '@angular/core';
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
}
