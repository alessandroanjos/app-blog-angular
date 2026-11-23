import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatAnchor } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [MatTableModule, MatIconModule, MatButtonModule],
})
export class DashboardModule {}
