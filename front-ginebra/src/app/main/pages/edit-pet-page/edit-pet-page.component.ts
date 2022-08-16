import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { PetService } from '../../services/pet.service';
import { SharedService } from '../../../shared/services/shared.service';
import { Router } from '@angular/router';
import { IPet } from '../../../shared/interfaces/interfaces';

@Component({
  selector: 'app-edit-pet-page',
  templateUrl: './edit-pet-page.component.html',
  styleUrls: ['./edit-pet-page.component.scss'],
})
export class EditPetPageComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private petService: PetService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  myForm: FormGroup = this.formBuilder.group({
    imgUrl: [''],
    petName: ['testPet', [Validators.required, Validators.minLength(2)]],
    bathPeriodicity: ['4', Validators.required],
    isPublic: [true],
    shampoos: ['Shampoo1, Shampoo2'],
    bathTypes: ['casero, estética'],
    bathers: ['Javier, América', Validators.required],
  });

  get selectedPet() {
    return this.petService.selectedPet;
  }

  ngOnInit(): void {
    this.setNewFormValues();
    this.petService.selectedPetChange.subscribe(() => {
      this.setNewFormValues();
    });
  }

  invalidField(field: string) {
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
  }

  setNewFormValues() {
    this.myForm.setValue({
      imgUrl: this.selectedPet.imgUrl || '',
      petName: this.selectedPet.petName || '',
      bathPeriodicity: this.selectedPet.bathPeriodicity || '',
      isPublic: this.selectedPet.isPublic || '',
      shampoos: this.selectedPet.shampoos.toString() || '',
      bathTypes: this.selectedPet.bathTypes.toString() || '',
      bathers: this.selectedPet.bathers.toString() || '',
    });
  }

  updatePet() {
    const pet: IPet = this.myForm.value;
    console.log({ pet });
    pet.shampoos = (pet.shampoos as unknown as string).split(',');
    pet.bathers = (pet.bathers as unknown as string).split(',');
    pet.bathTypes = (pet.bathTypes as unknown as string).split(',');

    this.petService.updatePet(pet);
  }

  async handleImgUpload(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      const tempImg: String | null = await this.sharedService.uploadImg(
        fileList[0]
      );
      this.myForm.controls['imgUrl'].patchValue(tempImg);
    }
  }
}
