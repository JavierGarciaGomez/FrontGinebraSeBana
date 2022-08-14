import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service';
import { IUser } from '../../../shared/interfaces/interfaces';

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.scss'],
})
export class EditUserPageComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  currentData!: IUser;

  myForm: FormGroup = this.formBuilder.group({
    fullName: ['', Validators.required],
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
  });

  ngOnInit(): void {
    const user = this.authService.user;
    console.log({ user });
    if (user?._id) this.currentData = { ...user };

    this.myForm.setValue({
      username: user?.username || '',
      fullName: user?.fullName || '',
      email: user?.email || '',
    });
  }

  invalidField(field: string) {
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
  }

  update() {
    const { username, email, fullName } = this.myForm.value;
    this.authService
      .updateUser(username, email, fullName, this.authService.user?._id!)
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
}
