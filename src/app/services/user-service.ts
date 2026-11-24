import { Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = `http://localhost:3000/users`;

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<void> {
    return this.http.post<void>(this.baseUrl, user);
  }

  updateUser(
    user: Pick<User, 'id' | 'name' | 'email' | 'isActive'> & Partial<Pick<User, 'password'>>,
  ): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${user.id}`, user);
  }

  deleteUserById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  findUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  findAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }
}
