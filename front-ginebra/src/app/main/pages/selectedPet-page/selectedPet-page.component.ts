import { Component, OnInit } from '@angular/core';
import { PetService } from '../../services/pet.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './selectedPet-page.component.html',
  styles: [],
})
export class SelectedPetPageComponent implements OnInit {
  constructor(private petService: PetService) {}

  get selectedPet() {
    return this.petService.selectedPet;
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  showers = [
    {
      date: new Date(),
      type: 'Peluquería',
      doneBy: 'Javier García',
      shampoos: ['Chan, Shamp'],
    },
    {
      date: new Date(),
      type: 'Peluquería',
      doneBy: 'Javier García',
      shampoos: ['Chan, Shamp'],
    },
    {
      date: new Date(),
      type: 'Peluquería',
      doneBy: 'Javier García',
      shampoos: ['Chan, Shamp'],
    },
    {
      date: new Date(),
      type: 'Peluquería',
      doneBy: 'Javier García',
      shampoos: ['Chan, Shamp'],
    },
    {
      date: new Date(),
      type: 'Peluquería',
      doneBy: 'Javier García',
      shampoos: ['Chan, Shamp'],
    },
  ];

  ngOnInit(): void {}
}
