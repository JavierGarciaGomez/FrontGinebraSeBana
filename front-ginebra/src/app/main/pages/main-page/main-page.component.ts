import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styles: [],
})
export class MainPageComponent implements OnInit {
  constructor() {}
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
