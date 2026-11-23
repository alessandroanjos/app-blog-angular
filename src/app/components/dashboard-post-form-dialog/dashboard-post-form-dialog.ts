import { Component, Inject, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { PostService } from '../../services/post';
import { Post } from '../../models/post';
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';

@Component({
  imports: [
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
  ],
  selector: 'app-dashboard-post-form-dialog',
  styleUrl: './dashboard-post-form-dialog.css',
  templateUrl: './dashboard-post-form-dialog.html',
})
export class DashboardPostFormDialog {
  private dialogRef = inject(MatDialogRef<DashboardPostFormDialog>);

  private postService = inject(PostService);

  postForm = new FormGroup({
    author: new FormControl('', Validators.required),
    title: new FormControl(''),
    date: new FormControl(DateTime.now()),
    content: new FormControl(''),
  });

  onSubmit() {
    if (this.postForm.invalid) return;

    console.log(this.postForm.value);

    const author = this.postForm.value.author!!;
    const title = this.postForm.value.title!!;
    const date = this.postForm.value.date!!;
    const content = this.postForm.value.content!!;

    const post = new Post(uuidv4(), author, title, date, content);

    this.postService.createPost(post);

    // Opcional: passar os dados do formulário de volta para quem abriu o dialog
    this.dialogRef.close();
  }
}