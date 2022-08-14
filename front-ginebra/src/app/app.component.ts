import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  title = 'Ginebra se baña';
  ngOnInit(): void {
    const user = this.authService.user;

    !user && this.authService.validateJwt().subscribe();
  }
}
