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
  IgetLinkedPetsResponse,
  IgetPetByIdResponse,
  ILinkedUser,
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
    this.userLinkedPetsChange.subscribe(
      (userLinkedPets) => (this._userLinkedPets = userLinkedPets)
    );
    this.selectedPetChange.subscribe((pet) => {
      this._selectedPet = pet;
    });
    this.authService.userChange.subscribe((user) => {
      this.getLinkedPetsByUser(user._id);
      this.getPet();
    });
  }
  userLinkedPetsChange: Subject<IPet[]> = new Subject<IPet[]>();
  selectedPetChange: Subject<IPet> = new Subject<IPet>();
  private baseUrl: string = `${environment.baseUrl}/pets`;
  private _userLinkedPets: IPet[] = [];
  private _selectedPet!: IPet;

  routes = {
    createPet: '/createPet',
    getPublicPets: '/getPublicPets',
    getAllPets: '/getAllPets',
    getPetById: '/getPetById/', // petID
    getLinkedPetsByUser: '/getLinkedPetsByUser/', // :userId
    updatePet: '/updatePet/', // petID
    linkPublicPetToUser: '/linkPublicPetToUser/', // petID
    linkUser: '/linkUser/', // petID
    deletePet: '/deletePet/', // petID
    registerBath: '/registerBath/', // petID
  };
  get userLinkedPets() {
    return this._userLinkedPets;
  }
  get selectedPet() {
    return this._selectedPet;
  }

  getLinkedPetsByUser(userId: string) {
    const url = `${this.baseUrl}${this.routes.getLinkedPetsByUser}${userId}`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );
    this.httpClient
      .get<IgetLinkedPetsResponse>(url, { headers })
      .pipe(
        tap(),
        catchError((err: HttpErrorResponse) => {
          return of(err.error);
        })
      )
      .subscribe((resp: IgetLinkedPetsResponse) => {
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

  getPet(petId: string = '62f4bea5ad3a2957faa248ed') {
    const url = `${this.baseUrl}${this.routes.getPetById}${petId}`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );
    this.httpClient
      .get<IgetPetByIdResponse>(url, { headers })
      .pipe(
        tap(),
        catchError((err: HttpErrorResponse) => {
          return of(err.error);
        })
      )
      .subscribe((resp: IgetPetByIdResponse) => {
        if (resp.ok) {
          const { pet } = resp;
          if (!pet.imgUrl || pet.imgUrl === '') {
            pet.imgUrl = 'assets/images/unknownPet.jpg';
          }
          const linkedUser = pet.linkedUsers.find(
            (linkedUser: ILinkedUser) =>
              linkedUser.linkedUser === this.authService.user?._id
          );
          pet.viewAuthorization = linkedUser?.viewAuthorization || false;
          pet.editAuthorization = linkedUser?.editAuthorization || false;
          pet.creator = linkedUser?.creator || false;

          this.selectedPetChange.next(pet);
        }
      });
  }
}
