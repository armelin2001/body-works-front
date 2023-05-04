import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/shared/http-service/usuario-service/usuario.service';
import { UsuarioDto } from 'src/app/shared/models/usuario-dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-cadastro',
  templateUrl: './edit-cadastro.component.html',
  styleUrls: ['./edit-cadastro.component.scss'],
})
export class EditCadastroComponent implements OnInit {
  formularioUsuario: FormGroup;
  id: string = '';

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute
  ) {
    let emailregex: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.formularioUsuario = this.formBuilder.group({
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(emailregex)]],
      senha: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      peso: ['', [Validators.required]],
      altura: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.usuarioService.obterUsuario(this.id).subscribe(
      (res) => {
        this.formularioUsuario.patchValue({
          nome: res.nome,
          cpf: res.cpf,
          genero: res.genero,
          email: res.email,
          senha: res.senha,
          dataNascimento: res.dataNascimento,
          peso: res.peso,
          altura: res.altura,
        });
      },
      (err) => {}
    );
  }

  goBack(): void {
    this.location.back();
  }

  submitFormUsuario() {
    const usuario = this.getUsuario();
    this.usuarioService.atualizaUsuario(usuario).subscribe(
      (res) => {
        this.goBack();
      },
      (err) => {}
    );
  }

  getUsuario() {
    const formularioUsuario = this.formularioUsuario.value;
    const usuario: UsuarioDto = {
      id: this.id,
      nome: formularioUsuario.nome,
      cpf: formularioUsuario.cpf,
      genero: formularioUsuario.genero,
      email: formularioUsuario.email,
      senha: formularioUsuario.senha,
      dataNascimento: formularioUsuario.dataNascimento,
      altura: formularioUsuario.altura,
      peso: formularioUsuario.peso,
      perfil: 'usuario',
    };
    return usuario;
  }
}
