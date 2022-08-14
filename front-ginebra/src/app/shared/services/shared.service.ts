import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  async uploadImg(file: File, fireSwal: boolean = true) {
    fireSwal &&
      Swal.fire({
        title: 'Uploading...',
        text: 'Please wait...',
        allowOutsideClick: false,
        // onBeforeOpen: () => {
        //   Swal.showLoading();
        // },
      });

    // cloudinary
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dwalcv9li/upload';
    const formData = new FormData();
    formData.append('upload_preset', 'react-course');
    formData.append('file', file);
    try {
      // cloudinary request
      const resp = await fetch(cloudUrl, {
        method: 'POST',
        body: formData,
      });

      if (resp.ok) {
        // get the response
        const cloudResp = await resp.json();
        // return the url
        fireSwal && Swal.close();
        return cloudResp.secure_url;
      } else {
        fireSwal && Swal.close();
        return null;
      }
    } catch (error) {
      fireSwal && Swal.close();
      throw error;
    }
  }
}
