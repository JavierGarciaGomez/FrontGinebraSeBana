import {
  Component,
  OnInit,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { PetService } from '../../services/pet.service';
import * as dayjs from 'dayjs';
import {
  ICounterBathInfo,
  IPetBath,
} from 'src/app/shared/interfaces/interfaces';
import { IPet, IDictionary } from '../../../shared/interfaces/interfaces';

import Swal from 'sweetalert2';

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

  async registerBath() {
    let bathersOptions: IDictionary = {};
    let shampoosOptions: IDictionary = {};
    let bathTypesOptions: IDictionary = {};

    this.selectedPet.bathers.forEach((element) => {
      bathersOptions[element] = element;
    });
    this.selectedPet.shampoos.forEach((element) => {
      shampoosOptions[element] = element;
    });
    this.selectedPet.bathTypes.forEach((element) => {
      bathTypesOptions[element] = element;
    });

    const batherSelect: any = await Swal.fire({
      title: '¿Quién bañó a la mascota?',
      input: 'radio',
      inputOptions: bathersOptions,
      showCancelButton: true,
    });

    const bathTypeSelect: any = await Swal.fire({
      title: '¿Qué tipo de baño se realizó?',
      input: 'radio',
      inputOptions: bathTypesOptions,
      showCancelButton: true,
    });

    const shampooSelect: any = await Swal.fire({
      title: '¿Quién bañó a la mascota?',
      input: 'radio',
      inputOptions: shampoosOptions,
      showCancelButton: true,
    });

    const bath: IPetBath = {
      date: new Date(),
      bather: batherSelect.value,
      shampoo: shampooSelect.value,
      bathType: bathTypeSelect.value,
    };

    this.petService.registerBath(bath);
  }
}
