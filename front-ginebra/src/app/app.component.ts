import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { PetService } from './main/services/pet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService // private petService: PetService
  ) {
    console.log('APPCOMPONENT - constructor');
  }

  title = 'Ginebra se baña';
  ngOnInit(): void {}
}

// petName
// bathPeriodicity
// isPublic
// shampoos
// bathTypes
// linkedUsers
// registerdBaths
// imgUrl
// creationDate
