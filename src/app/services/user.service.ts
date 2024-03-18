import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly baseURL = 'https://api-tecnophones.vercel.app/api/';

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    const url = this.baseURL + "users/login";
    return this.http.post(url, user);
  }
}
