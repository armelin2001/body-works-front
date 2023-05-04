import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/http-service/login-service/login.service';
import { LoginDto } from 'src/app/shared/models/login-dto';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioDto } from 'src/app/shared/models/usuario-dto';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})


export class CadastroComponent {
  formularioUsuario: FormGroup;
  
  constructor(private formBuilder: FormBuilder,
    private router: Router, 
    private loginService: LoginService,
    public dialog: MatDialog,){
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formularioUsuario = this.formBuilder.group({
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(emailregex)]],
      senha: ['', [Validators.required]],
    });
  }

  submitFormLogin(){
    if(this.formularioUsuario.valid){
      const usuario = this.getUsuario();
      this.loginService.realizaLogin(usuario).subscribe(
        (res)=>{
          if(res.status == 200){
            this.router.navigate(['/login']);
          }
        },
        (err)=>{},
      );
    }
  }

  getUsuario(){
    const formularioLogin = this.formularioUsuario.value;
    const realizaLogin: UsuarioDto = {
      nome: formularioLogin.nome,
      cpf: formularioLogin.cpf,
      genero: formularioLogin.genero,
      email: formularioLogin.email,
      senha: formularioLogin.senha
    }
    return realizaLogin;
  }
}
