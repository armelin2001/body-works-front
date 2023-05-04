import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/http-service/login-service/login.service';
import { LoginDto } from 'src/app/shared/models/login-dto';
import { MatDialog } from '@angular/material/dialog';

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
    public dialog: MatDialog
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
    console.log('aqui!');
    if (this.formularioLogin.valid) {
      const login = this.getLogin();
      console.log(this.formularioLogin.value);
      this.loginService.realizaLogin(login).subscribe(
        (res) => {
          this.router.navigate(['/home-usuario/'+res.id]);
        },
        (err) => {
          console.log(err);
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
