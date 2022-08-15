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
    this.petService.selectedPetChange.subscribe((selectedPet) => {
      const hasRegisteredBaths = selectedPet.registeredBaths.length > 0;
      let lastBathDate = null;
      let daysPassed = null;
      let nextBathDate: any = dayjs().add(
        this.selectedPet.bathPeriodicity,
        'day'
      );
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
}
