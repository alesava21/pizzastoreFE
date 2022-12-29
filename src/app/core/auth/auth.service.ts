import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private apiServer = 'http://localhost:8080/api/auth/login';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient){}

  private userLoggedSubject$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  login(loginForm: User): Observable<User> {
    return this.http.post<{'jwt-token': string}>(this.apiServer, JSON .stringify(loginForm), this.httpOptions).pipe(
      map(res => { 
        return {username: loginForm.username, token: res['jwt-token'] }
      })
    );
  }

  setUserLogged(user: User | null) {
    this.userLoggedSubject$.next(user);
  }

  getUserLogged(): Observable<User | null>{
    return this.userLoggedSubject$.asObservable();
  }

  isLoggedIn(): boolean {
    return this.userLoggedSubject$.value ? !!this.userLoggedSubject$.value.token : false;
  }

  getUserToken(): string | null | undefined {
    return this.userLoggedSubject$.value ? this.userLoggedSubject$.value.token : null;
  }

  logout() {
    this.setUserLogged(null);
  }

}
