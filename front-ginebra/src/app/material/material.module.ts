import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
  ],
})
export class MaterialModule {}
