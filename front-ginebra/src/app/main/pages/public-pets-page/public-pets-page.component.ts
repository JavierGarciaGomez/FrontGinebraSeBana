import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-pets-page',
  templateUrl: './public-pets-page.component.html',
  styleUrls: ['./public-pets-page.component.scss'],
})
export class PublicPetsPageComponent implements OnInit {
  publicPets = [];
  constructor() {}

  ngOnInit(): void {}
}
