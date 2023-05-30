import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UsuarioService } from 'src/app/shared/http-service/usuario-service/usuario.service';
import { UsuarioDto } from 'src/app/shared/models/usuario-dto';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

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

  get validaDataNascimento(): FormControl {
    const input = this.formularioUsuario.get('dataNascimento') as FormControl;
    const dataAtual = moment().year();
    const dataNascimento = moment(input.value).year();
    if (
      dataNascimento >= dataAtual ||
      dataNascimento > dataAtual - 18 ||
      dataNascimento < dataAtual - 100
    ) {
      input.setErrors({ dataNascimentoInvalida: true });
    } else {
      input.setErrors(null);
    }
    return this.formularioUsuario.get('dataNascimento') as FormControl;
  }

  get cpf(): FormControl {
    let regexCpf = '([0-9]{11})';
    const cpf = this.formularioUsuario.get('cpf') as FormControl;
    if (!cpf.value.match(regexCpf)) {
      cpf.setErrors({ cpfInvalido: true });
    } else {
      cpf.setErrors(null);
    }

    return this.formularioUsuario.get('cpf') as FormControl;
  }

  get altura(): FormControl {
    const altura = this.formularioUsuario.get('altura') as FormControl;
    const alturaTratada = Number(altura.value.replace(',', '.'));
    console.log(altura.value);
    if (alturaTratada < 0.9 || alturaTratada > 2.3) {
      altura.setErrors({ alturaInvalida: true });
    } else {
      altura.setErrors(null);
    }
    return this.formularioUsuario.get('altura') as FormControl;
  }

  get peso(): FormControl {
    const peso = this.formularioUsuario.get('peso') as FormControl;
    if (peso.value < 40 || peso.value > 200) {
      peso.setErrors({ pesoInvalido: true });
    } else {
      peso.setErrors(null);
    }
    return this.formularioUsuario.get('peso') as FormControl;
  }
}
