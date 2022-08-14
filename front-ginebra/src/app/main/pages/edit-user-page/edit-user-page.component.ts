import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service';
import { IUser } from '../../../shared/interfaces/interfaces';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.scss'],
})
export class EditUserPageComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  currentData!: IUser;

  myForm: FormGroup = this.formBuilder.group({
    fullName: ['', Validators.required],
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    imgUrl: [''],
  });

  ngOnInit(): void {
    const user = this.authService.user;
    console.log({ user });
    if (user?._id) this.currentData = { ...user };

    this.myForm.setValue({
      username: user?.username || '',
      fullName: user?.fullName || '',
      email: user?.email || '',
      imgUrl: user?.email || '',
    });
  }

  invalidField(field: string) {
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
  }

  update() {
    const { username, email, fullName, imgUrl } = this.myForm.value;

    this.authService
      .updateUser(
        username,
        email,
        fullName,
        imgUrl,
        this.authService.user?._id!
      )
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

/**
 *                 <div className="collaboratorUpdate_uploadImgContainer">
                  <img
                    className="collaboratorUpdate_img"
                    src={activeCollaborator.imgUrl}
                    alt=""
                  />
                  <label htmlFor="file">
                    <Publish
                      onClick={handlePictureUpload}
                      type="button"
                      sx={{ fontSize: 30 }}
                    />
                  </label>
                  <input
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    name="file"
                  />
                </div>





                
  const handlePictureUpload = (e) => {
    e.preventDefault();

    document.querySelector("#file").click();
  };
  const handleFileChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (file) {
      const tempImgUrl = await uploadImg(file);
      setimgUrl(tempImgUrl);
    }
  };
 */
