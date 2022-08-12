import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from '../material/material.module';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';

@NgModule({
  declarations: [ErrorPageComponent, NavbarComponent, FooterComponent, WelcomePageComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [NavbarComponent, FooterComponent],
})
export class SharedModule {}
