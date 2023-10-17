import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { FichaService } from 'src/app/shared/http-service/ficha-service/ficha.service';
import { UsuarioService } from 'src/app/shared/http-service/usuario-service/usuario.service';
export interface OpcaoFiltro {
  id: string;
  nome: string;
}
@Component({
  selector: 'app-ficha-usuario',
  templateUrl: './ficha-usuario.component.html',
  styleUrls: ['./ficha-usuario.component.scss'],
})
export class FichaUsuarioComponent implements OnInit {
  listaUsuario: any[] = [];
  listaFicha: any[] = [];
  opcoesUsuario: OpcaoFiltro[] = [];
  opcoesFicha: OpcaoFiltro[] = [];
  carregando: boolean = true;
  formularioFichaUsuario: FormGroup;

  usuarioControl = new FormControl('', Validators.required);
  fichaControl = new FormControl('', Validators.required);
  opcoesFiltradasUsuario: Observable<OpcaoFiltro[]> | undefined;
  opcoesFiltradasFicha: Observable<OpcaoFiltro[]> | undefined;

  constructor(
    private fichaService: FichaService,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.formularioFichaUsuario = this.formBuilder.group({
      usuario: this.usuarioControl,
      ficha: this.fichaControl,
    });
  }

  ngOnInit(): void {
    this.carregando = true;
    this.fichaService.obterFichas().subscribe((res) => {
      this.opcoesFicha = res.dados.map((ficha: any) => {
        return {
          id: ficha.id,
          nome: ficha.nome,
        };
      });
    });
    this.usuarioService.obterTodosUsuarios().subscribe((res) => {
      this.opcoesUsuario = res.dados.map((usuario: any) => {
        return {
          id: usuario.id,
          nome: usuario.nome,
        };
      });
    });
    this.opcoesFiltradasUsuario = this.usuarioControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filtroUsuario(value || ''))
    );
    this.opcoesFiltradasFicha = this.fichaControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filtroFicha(value || ''))
    );
    this.carregando = false;
  }

  public salvarFichaUsuario() {
    
    const usuario = this.usuarioControl.value || '';
    const ficha = this.fichaControl.value || '';
    const idUsuario = this.opcoesUsuario.find((opcao) => opcao.nome === usuario)?.id || '';
    const idFicha = this.opcoesFicha.find((opcao) => opcao.nome === ficha)?.id || '';

    const fichaUsuario = {
      id: idUsuario,
      idFicha: idFicha,
    };
    this.usuarioService.salvarFichaUsuario(fichaUsuario).subscribe((res) => {
      this.router.navigate(['home-usuario']);
    });
  }

  private filtroUsuario(valor: string): OpcaoFiltro[] {
    const valorFiltrado = valor.toLowerCase();
    return this.opcoesUsuario.filter((opcao) =>
      opcao.nome.toLowerCase().includes(valorFiltrado)
    );
  }

  private filtroFicha(valor: string): OpcaoFiltro[] {
    const valorFiltrado = valor.toLowerCase();
    return this.opcoesFicha.filter((opcao) =>
      opcao.nome.toLowerCase().includes(valorFiltrado)
    );
  }
}
