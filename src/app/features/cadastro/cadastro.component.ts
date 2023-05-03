import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/http-service/login-service/login.service';
import { LoginDto } from 'src/app/shared/models/login-dto';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})


export class CadastroComponent {
  formularioLogin: FormGroup;
  
  constructor(private formBuilder: FormBuilder,
    private router: Router, 
    private loginService: LoginService,
    public dialog: MatDialog,){
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formularioLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(emailregex)]],
      senha: ['', [Validators.required]],
    });
  }

  submitFormLogin(){
    if(this.formularioLogin.valid){
      const login = this.getLogin();
      console.log(this.formularioLogin.value);
      this.loginService.realizaLogin(login).subscribe(
        (res)=>{
          // salvar token no localstorage
          if(res.status == 200){
            this.router.navigate(['/']);
          }
        },
        (err)=>{},
      );
    }
  }

  getLogin(){
    const formularioLogin = this.formularioLogin.value;
    const realizaLogin: LoginDto = {
      email: formularioLogin.email,
      senha: formularioLogin.senha
    }
    return realizaLogin;
  }
}
