import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  formTitle = 'Nova postagem';
  submitButtonLabel = 'Salvar';

  private dialogRef = inject(MatDialogRef<DashboardPostFormDialog>);

  private postService = inject(PostService);

  public readonly data = inject<{ id: string }>(MAT_DIALOG_DATA);

  postForm = new FormGroup({
    author: new FormControl('', Validators.required),
    title: new FormControl(''),
    //nas versões mais recentes dos tipos da biblioteca Luxon (@types/luxon),
    //o tipo DateTime passou a receber um parâmetro genérico indicando se a data é válida (DateTime<true>)
    // ou potencialmente inválida (DateTime<boolean>).
    date: new FormControl<DateTime | null>(DateTime.now()),
    content: new FormControl(''),
  });

  ngOnInit() {
    if (this.data) {
      this.formTitle = 'Editar postagem';
      this.submitButtonLabel = 'Editar';

      //TODO: recuperar o post e popular o formulário

      this.postService.findPostByIdPost(this.data.id).subscribe((post) => {
        this.postForm.setValue({
          author: post.author,
          date: post.date,
          title: post.title,
          content: post.content,
        });
      });
    }
  }

  onSubmit() {

    if (this.postForm.invalid) return;

    const author = this.postForm.value.author!!;
    const title = this.postForm.value.title!!;
    const date = this.postForm.value.date!!;
    const content = this.postForm.value.content!!;


    console.log(this.postForm.value);

    if (this.data) {
      const post = new Post(this.data.id, author, title, date, content);
      this.postService.updatePost(post).subscribe((post) => {
        console.log('Post criado:', post);
        this.dialogRef.close();
      });
    } else {
      const post = new Post(uuidv4(), author, title, date, content);
      this.postService.createPost(post).subscribe((post) => {
        console.log('Post criado:', post);
        this.dialogRef.close();
      });
    }
  }
}
