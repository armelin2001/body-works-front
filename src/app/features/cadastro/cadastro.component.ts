import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioDto } from 'src/app/shared/models/usuario-dto';
import { UsuarioService } from 'src/app/shared/http-service/usuario-service/usuario.service';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioAcademiaAdmDto } from 'src/app/shared/models/usuario-academia.dto';
import { UsuarioAcademiaService } from 'src/app/shared/http-service/usuario-academia/usuario-academia.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent {
  formularioUsuario: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private snack: MatSnackBar,
    private usuarioAcademiaService: UsuarioAcademiaService,
    private translateService: TranslateService,
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
      adm: [false],
      codigo: [''],
    });
  }

  submitFormUsuario() {
    const formularioUsuario = this.formularioUsuario.value;
    if (formularioUsuario.adm) {
      const usuarioAdm = this.getUsuarioAdm();
      this.usuarioAcademiaService
        .cadastrarUsuarioAcademia(usuarioAdm)
        .subscribe(
          (res) => {
            this.router.navigate(['/login']);
          },
          (err) => {
            this.snack.open(err.error.message, 'OK', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          }
        );
    } else {
      const usuario = this.getUsuario();

      this.usuarioService.cadastrarUsuario(usuario).subscribe(
        (res) => {
          this.router.navigate(['/login']);
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

  getUsuario() {
    const formularioLogin = this.formularioUsuario.value;
    const realizaLogin: UsuarioDto = {
      nome: formularioLogin.nome,
      cpf: formularioLogin.cpf,
      genero: formularioLogin.genero,
      email: formularioLogin.email,
      senha: formularioLogin.senha,
      dataNascimento: formularioLogin.dataNascimento,
      perfil: 'usuario',
      statusPagamento: 'ativo',
    };
    return realizaLogin;
  }

  getUsuarioAdm() {
    const formularioUsuarioAcademiAdm = this.formularioUsuario.value;
    const usuarioAcademiAdm: UsuarioAcademiaAdmDto = {
      nome: formularioUsuarioAcademiAdm.nome,
      cpf: formularioUsuarioAcademiAdm.cpf,
      email: formularioUsuarioAcademiAdm.email,
      senha: formularioUsuarioAcademiAdm.senha,
      adm: formularioUsuarioAcademiAdm.adm,
      codigo: formularioUsuarioAcademiAdm.codigo,
      genero: formularioUsuarioAcademiAdm.genero,
      dataNascimento: formularioUsuarioAcademiAdm.dataNascimento,
    };
    return usuarioAcademiAdm;
  }

  get validaDataNascimento(): FormControl {
    const input = this.formularioUsuario.get('dataNascimento') as FormControl;
    const dataAtual = moment().year();
    const dataNascimento = moment(input.value).year();
    const adm = this.formularioUsuario.get('adm')?.value;
    const idadeMinima = adm ? 18 : 12;
    if (
      dataNascimento >= dataAtual ||
      dataNascimento > dataAtual - idadeMinima ||
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

  get genero(): FormControl {
    const genero = this.formularioUsuario.get('genero') as FormControl;
    if (genero.value.length < 1) {
      genero.setErrors({ generoInvalido: true });
    }
    return this.formularioUsuario.get('genero') as FormControl;
  }

  get nome(): FormControl {
    const nome = this.formularioUsuario.get('nome') as FormControl;
    if (nome.value.length < 5) {
      nome.setErrors({ nomeInvalido: true });
    }
    return this.formularioUsuario.get('nome') as FormControl;
  }

  get adm(): FormControl {
    return this.formularioUsuario.get('adm') as FormControl;
  }
}
