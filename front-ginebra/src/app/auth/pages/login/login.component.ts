import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  myForm: UntypedFormGroup = this.formBuilder.group({
    email: [
      'javieron.garcia@gmail.com',
      [Validators.required, Validators.email],
    ],
    password: ['secret', [Validators.required, Validators.minLength(6)]],
  });

  ngOnInit(): void {
    this.authService.validateJwt().subscribe((response) => {
      if (response) {
        this.router.navigateByUrl('/main');
      }
    });
  }

  login() {
    const { email, password } = this.myForm.value;
    this.authService.login(email, password).subscribe((response) => {
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
