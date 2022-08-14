import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import {
  getLinkedPetsResponse,
  IPet,
} from 'src/app/shared/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {
    this.userLinkedPetsChange.subscribe((pets) => {
      this._userLinkedPets = pets;
    });
  }
  private baseUrl: string = `${environment.baseUrl}/pets`;
  routes = {
    createPet: '/createPet',
    getPublicPets: '/getPublicPets',
    getAllPets: '/getAllPets',
    getPetById: '/getPetById/:petId',
    getLinkedPetsByUser: '/getLinkedPetsByUser/', // :userId
    updatePet: '/updatePet/:petId',
    linkPublicPetToUser: '/linkPublicPetToUser/:petId',
    linkUser: '/linkUser/:petId',
    deletePet: '/deletePet/:petId',
    registerBath: '/registerBath/:petId',
  };
  private _userLinkedPets: IPet[] | undefined;
  get userLinkedPets() {
    return this._userLinkedPets;
  }

  userLinkedPetsChange: Subject<IPet[]> = new Subject<IPet[]>();

  getLinkedPetsByUser(userId: string) {
    console.log(userId);
    const url = `${this.baseUrl}${this.routes.getLinkedPetsByUser}${userId}`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    // return
    // todo response interface
    this.httpClient
      .get<getLinkedPetsResponse>(url, { headers })
      .pipe(
        tap(),
        map((resp) => resp),
        catchError((err: HttpErrorResponse) => {
          return of(err.error);
        })
      )
      .subscribe((resp: getLinkedPetsResponse) => {
        if (resp.ok) {
          const petsWithImgUrl = resp.pets.map((pet) => {
            if (!pet.imgUrl || pet.imgUrl === '')
              pet.imgUrl = 'assets/images/unknownPet.jpg';
            const linkedUser = pet.linkedUsers.find(
              (linkedUser) => linkedUser.linkedUser === userId
            );

            pet.viewAuthorization = linkedUser?.viewAuthorization || false;
            pet.editAuthorization = linkedUser?.editAuthorization || false;
            pet.creator = linkedUser?.creator || false;

            return pet;
          });
          this.userLinkedPetsChange.next(petsWithImgUrl);
        }
      });
  }
}
