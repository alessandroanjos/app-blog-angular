import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [MatDialogModule, MatButtonModule],
  selector: 'app-delete-dialog-component',
  styleUrl: './delete-dialog-component.css',
  templateUrl: './delete-dialog-component.html',
})
export class DeleteDialogComponent {
  title: string = '';
  text: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: string; title: string; text: string }) {}

  ngAfterContentInit() {
    this.title = this.data.title;
    this.text = this.data.text;
  }
}
