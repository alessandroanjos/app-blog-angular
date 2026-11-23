import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Post } from '../models/post';


@Injectable({
  providedIn: 'root',
})
export class PostService {
  private httpClient = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/posts';

  /**
  createPost(post: Post): Promise<Post> {
    return firstValueFrom(this.httpClient.post<Post>(this.baseUrl, post));
  }
  */

  createPost(post: Post): Observable<Post> {
    return this.httpClient.post<Post>(this.baseUrl, post);
  }
  /**
   * findAll(): Promise<Post[]> {
   *     return firstValueFrom(this.httpClient.get<Post[]>(this.baseUrl));
   *   }
   */

  findAll(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.baseUrl);
  }

  /**
  updatePost(post: Post): Promise<void> {
    return this.httpClient
      .put(this.baseUrl + `/${post.id}`, post)
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  */

  updatePost(post: Post): Observable<void> {
    return this.httpClient.put<void>(this.baseUrl + `/${post.id}`, post);
  }

  /**
  deletePost(id: string): Promise<void> {
    return this.httpClient
      .delete(this.baseUrl + `/${id}`)
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
  */

  deletePost(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.baseUrl + `/${id}`);
  }

  /**
  findPostByIdPost(id: string): Promise<Post> {
    return this.httpClient
      .get<Post>(this.baseUrl + `/${id}`)
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
    */

  findPostByIdPost(id: string): Observable<Post> {
    return this.httpClient.get<Post>(this.baseUrl + `/${id}`)
  }
}
