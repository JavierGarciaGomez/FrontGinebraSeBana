import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password-page',
  templateUrl: './change-password-page.component.html',
  styleUrls: ['./change-password-page.component.scss'],
})
export class ChangePasswordPageComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  myForm: FormGroup = this.formBuilder.group({
    prevPassword: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirmation: ['', [Validators.required, Validators.minLength(6)]],
  });

  ngOnInit(): void {}

  changePassword() {
    const { prevPassword, password, passwordConfirmation } = this.myForm.value;

    if (password !== passwordConfirmation) {
      Swal.fire('Error', 'Las contraseñas insertadas no coinciden', 'error');
      return;
    }

    this.authService
      .changePassword(prevPassword, password, this.authService.user?._id!)
      .subscribe((response) => {
        if (response.ok) {
          Swal.fire(
            'Actualizado',
            'El usuario ha sido actualizado con éxito',
            'success'
          );
          this.router.navigateByUrl('/main/userProfile');
        } else {
          Swal.fire('Error', response.message, 'error');
        }
      });
  }

  invalidField(field: string) {
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
  }
}
