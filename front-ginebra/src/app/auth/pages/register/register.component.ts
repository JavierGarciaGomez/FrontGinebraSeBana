import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  myForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirmation: ['', [Validators.required, Validators.minLength(6)]],
  });

  ngOnInit(): void {
    this.authService.validateJwt().subscribe((response) => {
      if (response) {
        this.router.navigateByUrl('/main');
      }
    });
  }

  register() {
    console.log({ form: this.myForm });
    const { username, email, password, passwordConfirmation } =
      this.myForm.value;

    if (password !== passwordConfirmation) {
      Swal.fire('Error', 'Las contraseñas insertadas no coinciden', 'error');
    }

    this.authService
      .register(username, email, password)
      .subscribe((response) => {
        if (response.ok) {
          this.router.navigateByUrl('/main');
        } else {
          Swal.fire('Error', response.message, 'error');
        }
      });
  }

  invalidField(field: string) {
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
  }
}
