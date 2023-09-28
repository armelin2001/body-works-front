import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/http-service/login-service/login.service';
import { LoginDto } from 'src/app/shared/models/login-dto';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalstorageService } from 'src/app/shared/local-storage/localstorage.service';
import { AuthService } from 'src/app/shared/http-service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
  formularioLogin: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService,
    public dialog: MatDialog,
    private snack: MatSnackBar,
    private localStorage: LocalstorageService
  ) {
    let emailregex: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.formularioLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(emailregex)]],
      senha: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  submitFormLogin() {
    if (this.formularioLogin.valid) {
      const login = this.getLogin();
      this.loginService.realizaLogin(login).subscribe(
        (res) => {
          this.localStorage.adicionar('usuario', res);
          //this.router.navigate(['/home-usuario/']);
          this.authService.obterToken(login).subscribe(
            (res) => {
              this.localStorage.adicionar('token', res.access_token);
              this.router.navigate(['/home-usuario/']);
            },
            (err) => {
              this.snack.open(err.error.message, 'OK', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
            }
          );
        },
        (err) => {
          this.snack.open(err.error.message, 'OK', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      );
    }
  }

  getLogin() {
    const formularioLogin = this.formularioLogin.value;
    const realizaLogin: LoginDto = {
      email: formularioLogin.email,
      senha: formularioLogin.senha,
    };
    return realizaLogin;
  }
}
