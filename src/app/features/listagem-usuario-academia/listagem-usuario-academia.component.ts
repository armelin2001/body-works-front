import {
  Component,
  Input,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { UsuarioAcademiaService } from 'src/app/shared/http-service/usuario-academia/usuario-academia.service';
export interface UsuarioAcademiaListagem {
  id: string;
  nome: string;
  cpf: string;
  dataNascimento: string;
}

const ELEMENT_DATA: UsuarioAcademiaListagem[] = [
  {
    id: '',
    nome: 'instrutor',
    cpf: '12345678910',
    dataNascimento: '10/10/2021',
  },
];

@Component({
  selector: 'app-listagem-usuario-academia',
  templateUrl: './listagem-usuario-academia.component.html',
  styleUrls: ['./listagem-usuario-academia.component.scss'],
})
export class ListagemUsuarioAcademiaComponent implements AfterViewInit {
  listaInstrutores: UsuarioAcademiaListagem[] = [];

  displayedColumns: string[] = ['nome', 'cpf', 'dataNascimento', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<UsuarioAcademiaListagem>;
  @ViewChild(MatTable) table!: MatTable<UsuarioAcademiaListagem>;

  constructor(
    private usuarioAcademiaService: UsuarioAcademiaService,
    private router: Router,
    private snack: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.carregarListaInstrutores();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  carregarListaInstrutores() {
    this.listaInstrutores.slice(0, this.listaInstrutores.length);
    this.dataSource.data = [];
    this.usuarioAcademiaService
      .obterTodosUsuariosAcademia()
      .subscribe((res) => {
        res.dados.forEach((usuario: any) => {
          if (!usuario.adm) {
            const usuarioAcademiaResumido: UsuarioAcademiaListagem = {
              id: usuario.id,
              nome: usuario.nome,
              dataNascimento: moment(usuario.dataNascimento).format(
                'DD/MM/YYYY'
              ),
              cpf: usuario.cpf,
            };
            this.listaInstrutores.push(usuarioAcademiaResumido);
            this.dataSource.data = this.listaInstrutores;
            
          }
        });
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  vaiParaEditarInstrutor(row: any) {
    const id = row.id;
    this.router.navigate(['/edit-cadastro-adm/' + id + '/' + true]);
  }

  deletaInstrutor(row: any) {
    const idInstrutor = row.id;
    if (idInstrutor) {
      this.usuarioAcademiaService.deletaUsuarioAcademia(idInstrutor).subscribe(
        (res) => {
          this.snack.open(
            'Instrutor ' + res.nome + ' removido com sucesso!',
            'OK',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );
          this.carregarListaInstrutores();
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
}
