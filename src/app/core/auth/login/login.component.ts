import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  utente: User = { username: "", password: "", token: "" };
  errorMessage: string = '';
  destroy$: Subject<boolean> = new Subject();

  constructor(private router: Router, private authService: AuthService) { }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit(): void {
  }

  login(loginForm: NgForm) {
    if (loginForm.valid)
      this.authService.login(loginForm.value).pipe(takeUntil(this.destroy$)).subscribe(res => 
      { 
        this.authService.setUserLogged(res);
        this.router.navigateByUrl("list");
       });
    else
      this.errorMessage = 'Attenzione! Operazione fallita! Il form non è stato validato';
  }

}
