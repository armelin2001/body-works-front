import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UsuarioAcademiaService } from 'src/app/shared/http-service/usuario-academia/usuario-academia.service';
import { LocalstorageService } from 'src/app/shared/local-storage/localstorage.service';
import { UsuarioAcademiaAdmDto } from 'src/app/shared/models/usuario-academia.dto';
import { Location } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-adm',
  templateUrl: './edit-adm.component.html',
  styleUrls: ['./edit-adm.component.scss'],
})
export class EditAdmComponent {
  formularioUsuario: FormGroup;
  id: string = '';

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private usuarioAcademiaService: UsuarioAcademiaService,
    private activatedRoute: ActivatedRoute,
    private snack: MatSnackBar,
    private localStorage: LocalstorageService
  ) {
    let emailregex: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.formularioUsuario = this.formBuilder.group({
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(emailregex)]],
      senha: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    console.log(this.id);
    this.usuarioAcademiaService.obterUsuarioAcademia(this.id).subscribe(
      (res) => {
        this.formularioUsuario.patchValue({
          nome: res.nome,
          cpf: res.cpf,
          genero: res.genero,
          email: res.email,
          senha: res.senha,
        });
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

  getUsuarioAdm() {
    const formularioUsuario = this.formularioUsuario.value;
    const usuario = this.localStorage.obter('usuario') as any;

    const usuarioAdm: UsuarioAcademiaAdmDto = {
      id: this.id,
      nome: formularioUsuario.nome,
      cpf: formularioUsuario.cpf,
      email: formularioUsuario.email,
      senha: formularioUsuario.senha,
      adm: usuario.adm,
    };
    return usuarioAdm;
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

  get senha(): FormControl {
    const senha = this.formularioUsuario.get('senha') as FormControl;
    if (senha.value.length < 6) {
      senha.setErrors({ senhaInvalida: true });
    }
    return this.formularioUsuario.get('senha') as FormControl;
  }

  get email(): FormControl {
    const email = this.formularioUsuario.get('email') as FormControl;
    if (email.value.length < 10) {
      email.setErrors({ emailInvalido: true });
    }
    return this.formularioUsuario.get('email') as FormControl;
  }

  get nome(): FormControl {
    const nome = this.formularioUsuario.get('nome') as FormControl;
    if (nome.value.length < 5) {
      nome.setErrors({ nomeInvalido: true });
    }
    return this.formularioUsuario.get('nome') as FormControl;
  }

  get genero(): FormControl {
    const genero = this.formularioUsuario.get('genero') as FormControl;
    if (genero.value.length < 1) {
      genero.setErrors({ generoInvalido: true });
    }
    return this.formularioUsuario.get('genero') as FormControl;
  }

  get validaDataNascimento(): FormControl {
    const input = this.formularioUsuario.get('dataNascimento') as FormControl;
    const dataAtual = moment().year();
    const dataNascimento = moment(input.value).year();
    if (
      dataNascimento >= dataAtual ||
      dataNascimento > dataAtual - 1 ||
      dataNascimento < dataAtual - 100
    ) {
      input.setErrors({ dataNascimentoInvalida: true });
    } else {
      input.setErrors(null);
    }
    return this.formularioUsuario.get('dataNascimento') as FormControl;
  }

  submitFormUsuario() {
    const usuarioAdm = this.getUsuarioAdm();
    this.usuarioAcademiaService.atualizaUsuarioAcademia(usuarioAdm).subscribe(
      (res) => {
        this.localStorage.remover('usuario');
        this.localStorage.adicionar('usuario', res);
        this.goBack();
      },
      (err) => {}
    );
  }

  goBack(): void {
    this.location.back();
  }
}
