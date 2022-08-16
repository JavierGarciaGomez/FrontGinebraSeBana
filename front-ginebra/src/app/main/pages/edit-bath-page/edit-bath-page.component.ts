import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PetService } from '../../services/pet.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IPetBath } from 'src/app/shared/interfaces/interfaces';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-edit-bath-page',
  templateUrl: './edit-bath-page.component.html',
  styleUrls: ['./edit-bath-page.component.scss'],
})
export class EditBathPageComponent implements OnInit {
  constructor(
    private petService: PetService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    // if (!petService.selectedBath) router.navigateByUrl('/main');
  }
  myForm: FormGroup = this.formBuilder.group({
    date: ['', Validators.required],
    bather: [''],
    bathType: [''],
    shampoo: [''],
  });

  get selectedBath() {
    return this.petService.selectedBath;
  }

  ngOnInit(): void {
    const formattedDateToInput = dayjs(this.selectedBath?.date).format(
      'YYYY-MM-DD'
    );

    this.myForm.setValue({
      date: formattedDateToInput || '',
      bather: this.selectedBath!.bather || '',
      bathType: this.selectedBath!.bathType || '',
      shampoo: this.selectedBath!.shampoo || '',
    });
  }

  invalidField(field: string) {
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
  }

  updateBath() {
    const bath: IPetBath = this.myForm.value;
    const pet = { ...this.petService.selectedPet };
    const newRegisteredBaths = pet.registeredBaths.map((element) => {
      if (element._id === this.selectedBath!._id) {
        element = bath;
      }
      return element;
    });

    pet.registeredBaths = newRegisteredBaths;
    this.petService.updatePet(pet);

    this.router.navigateByUrl('/main');
  }
}
