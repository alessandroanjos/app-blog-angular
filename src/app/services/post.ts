import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Post } from '../models/post';


@Injectable({
  providedIn: 'root',
})
export class PostService {
  private httpClient = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/posts';

  createPost(post: Post): Promise<Post> {
    return firstValueFrom(this.httpClient.post<Post>(this.baseUrl, post));
  }

  findAll(): Promise<Post[]> {
    return firstValueFrom(this.httpClient.get<Post[]>(this.baseUrl));
  }
}