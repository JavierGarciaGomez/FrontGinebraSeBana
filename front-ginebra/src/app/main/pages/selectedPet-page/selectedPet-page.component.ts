import {
  Component,
  OnInit,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { PetService } from '../../services/pet.service';
import * as dayjs from 'dayjs';
import { ICounterBathInfo } from 'src/app/shared/interfaces/interfaces';
import { IPet } from '../../../shared/interfaces/interfaces';
dayjs().format();

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
export class SelectedPetPageComponent implements OnInit, AfterViewInit {
  constructor(private petService: PetService) {
    if (this.selectedPet._id) {
      this.setCounterBathInfo(this.selectedPet);
    }
    this.petService.selectedPetChange.subscribe((selectedPet) => {
      this.setCounterBathInfo(selectedPet);
    });
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
  _counterBathInfo: ICounterBathInfo | null = null;
  get selectedPet() {
    return this.petService.selectedPet;
  }
  get counterBathInfo() {
    return this._counterBathInfo;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // this.isLoading = false;
  }

  setCounterBathInfo(selectedPet: IPet) {
    const hasRegisteredBaths =
      selectedPet.registeredBaths && selectedPet.registeredBaths.length > 0;
    let lastBathDate = null;
    let daysPassed = null;
    let nextBathDate: any = dayjs().add(selectedPet.bathPeriodicity, 'day');

    let daysLeft = nextBathDate.diff(dayjs(), 'day');
    if (hasRegisteredBaths) {
      const latestBath = selectedPet.registeredBaths.reduce(
        (prevValue, registerdBath) =>
          prevValue.date > registerdBath.date ? prevValue : registerdBath
      );
      lastBathDate = dayjs(latestBath.date);
      daysPassed = dayjs().diff(lastBathDate, 'day');
      nextBathDate = dayjs(lastBathDate).add(
        this.selectedPet.bathPeriodicity,
        'day'
      );
      daysLeft = nextBathDate.diff(dayjs(), 'day');
      lastBathDate = lastBathDate.toDate();
    }

    this._counterBathInfo = {
      hasRegisteredBaths,
      lastBathDate,
      daysPassed,
      nextBathDate,
      daysLeft,
    };
  }
}
