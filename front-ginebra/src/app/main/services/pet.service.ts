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
  IPetBath,
  ISinglePetResponse,
} from '../../shared/interfaces/interfaces';
import {
  IgetLinkedPetsResponse,
  IgetPetByIdResponse,
  ILinkedUser,
  IPet,
} from 'src/app/shared/interfaces/interfaces';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.userLinkedPetsChange.subscribe(
      (userLinkedPets) => (this._userLinkedPets = userLinkedPets)
    );
    this.selectedPetChange.subscribe((pet) => {
      this._selectedPet = pet;
    });
    this.authService.userChange.subscribe((user) => {
      this.getLinkedPetsByUser(user._id);
      this.getPetById();
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
    const pet = { ...this._selectedPet };
    if (!pet.imgUrl || pet.imgUrl === '')
      pet.imgUrl = 'assets/images/unknownPet.jpg';

    return pet;
  }

  createPet(pet: IPet) {
    const url = `${this.baseUrl}${this.routes.createPet}`;
    const body = { ...pet };
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.httpClient
      .post<ISinglePetResponse>(url, body, { headers })
      .subscribe((resp) => {
        if (resp.ok) {
          Swal.fire('Mascota creada con éxito', resp.message, 'success');
          this.selectedPetChange.next(resp.pet);
          this.router.navigateByUrl('main/selectedPet');
        } else {
          Swal.fire('Error', resp.message, 'error');
        }
      });
  }

  getPetById(petId: string = '62f4bea5ad3a2957faa248ed') {
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
              linkedUser.linkedUser._id === this.authService.user?._id
          );
          pet.viewAuthorization = linkedUser?.viewAuthorization || false;
          pet.editAuthorization = linkedUser?.editAuthorization || false;
          pet.creator = linkedUser?.creator || false;

          this.selectedPetChange.next(pet);
        }
      });
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
              (linkedUser) => linkedUser.linkedUser._id === userId
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

  updatePet(pet: IPet, petId: string = '') {
    petId = petId !== '' ? petId : this.selectedPet._id;

    const url = `${this.baseUrl}${this.routes.updatePet}${petId}`;
    const body = { ...pet };
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.httpClient
      .put<ISinglePetResponse>(url, body, { headers })
      .subscribe((resp) => {
        if (resp.ok) {
          this.selectedPetChange.next(resp.pet);
        } else {
          Swal.fire('Error', resp.message, 'error');
        }
      });
  }

  registerBath(petBath: IPetBath) {
    const url = `${this.baseUrl}${this.routes.registerBath}${this.selectedPet._id}`;
    const body = { ...petBath };
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.httpClient
      .post<ISinglePetResponse>(url, body, { headers })
      .subscribe((resp) => {
        if (resp.ok) {
          this.selectedPetChange.next(resp.pet);
          this.router.navigateByUrl('main/selectedPet');
        } else {
          Swal.fire('Error', resp.message, 'error');
        }
      });
  }
}
