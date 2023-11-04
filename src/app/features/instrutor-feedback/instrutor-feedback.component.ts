import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { TreinoService } from 'src/app/shared/http-service/treino-service/treino.service';
import { LocalstorageService } from 'src/app/shared/local-storage/localstorage.service';

export interface ComentarioUsuario {
  dataTreino: string;
  usuarioNome: string;
  nomeTreino: string;
  comentario: string;
}

const COMENTARIO_DATA: ComentarioUsuario[] = [
  {
    dataTreino: '10/10/2021',
    usuarioNome: 'João',
    nomeTreino: 'Treino A',
    comentario: 'Treino muito bom!',
  },
];
@Component({
  selector: 'app-instrutor-feedback',
  templateUrl: './instrutor-feedback.component.html',
  styleUrls: ['./instrutor-feedback.component.scss'],
})
export class InstrutorFeedbackComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'dataTreino',
    'usuarioNome',
    'nomeTreino',
    'comentario',
  ];
  dataSource!: MatTableDataSource<ComentarioUsuario>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  listaComentarios: ComentarioUsuario[] = [];
  idInstrutor: string = '';

  constructor(
    private localStorage: LocalstorageService,
    private treinoService: TreinoService
  ) {
    const usuario = this.localStorage.obter('usuario') as any;
    this.dataSource = new MatTableDataSource(COMENTARIO_DATA);
    this.idInstrutor = String(usuario.id);
    this.treinoService
      .obterComentariosTreinosInstrutor(this.idInstrutor)
      .subscribe((res) => {
        res.forEach((element: any) => {
          this.listaComentarios.push({
            dataTreino: moment(element.dataTreino).format('DD/MM/YYYY'),
            usuarioNome: element.usuarioNome,
            nomeTreino: element.treinoNome,
            comentario: element.comentario,
          });
        });
        const users = this.listaComentarios;
        this.dataSource = new MatTableDataSource(users);
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
