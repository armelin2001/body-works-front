import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioDto } from 'src/app/shared/models/usuario-dto';
import { UsuarioService } from 'src/app/shared/http-service/usuario-service/usuario.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  formularioUsuario: FormGroup;
  
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService){
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formularioUsuario = this.formBuilder.group({
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      nascimento: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(emailregex)]],
      senha: ['', [Validators.required]],
    });
  }

  submitFormUsuario(){
    if(this.formularioUsuario.valid){
      const usuario = this.getUsuario();
      this.usuarioService.cadastrarUsuario(usuario).subscribe(
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
      nascimento: formularioLogin.nascimento,
      genero: formularioLogin.genero,
      email: formularioLogin.email,
      senha: formularioLogin.senha,
      perfil: 'usuario'
    }
    return realizaLogin;
  }
}
