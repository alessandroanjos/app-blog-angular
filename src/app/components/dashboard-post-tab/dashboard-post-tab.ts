import { Component, signal } from '@angular/core';

import { Post } from '../../models/post';
import { DashboardPostFormDialog } from '../dashboard-post-form-dialog/dashboard-post-form-dialog';
import { PostService } from '../../services/post';
import { PostDeleteDialog } from '../post-delete-dialog/post-delete-dialog';
import { DatePipe } from '@angular/common';
import { DashboardModule } from '../../modules/dashboard/dashboard-module';
import { MatDialog } from '@angular/material/dialog';

@Component({
  imports: [DashboardModule, DatePipe],
  selector: 'app-dashboard-post-tab',
  styleUrl: './dashboard-post-tab.css',
  templateUrl: './dashboard-post-tab.html',
})
export class DashboardPostTab {
  constructor(
    private dialog: MatDialog,
    private postService: PostService,
  ) {}

  // versao sem o signals
  //posts: Post[] = [];

  // com o signals
  posts = signal<Post[]>([]);

  // Faz o subscribe automaticamente, atualiza a tela e limpa a memória ao destruir o componente
  //posts = toSignal(this.postService.findAll(), { initialValue: [] });

  //displayedHearders

  displayedColumns = ['id', 'author', 'title', 'date', 'edit', 'delete'];

  ngOnInit() {
    this.loadPost();
  }

  openPostFormDialog() {
    console.log('Abrindo Dialog');
    const dialogRef = this.dialog.open(DashboardPostFormDialog);
    //notifica quando o form é fechado
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Result', result);
      this.loadPost();
    });
  }

  openEditPost(idValue: string) {
    console.log('Abrindo Dialog', idValue);
    const dialogRef = this.dialog.open(DashboardPostFormDialog, {
      data: { id: idValue },
    });
    //notifica quando o form é fechado
    dialogRef.afterClosed().subscribe((result) => {
      this.loadPost();
    });
  }

  deletePostDialog(idValue: string){
    console.log('Abrindo Dialog para excluir', idValue);
    const dialogRef = this.dialog.open(PostDeleteDialog, {
      data: { id: idValue },
    });
    //notifica quando o form é fechado
    dialogRef.afterClosed().subscribe((result) => {
      if (result==='true'){
        this.postService.deletePost(idValue).subscribe(()=>{
          this.loadPost();
        })
      }
      this.loadPost();
    });
  }

  loadPost() {
    this.postService.findAll().subscribe({
      next: (response) => {
        this.posts.set(response);
        console.log('Trazendo os posts: ', response);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('acabou..');
      },
    });
  }
}
