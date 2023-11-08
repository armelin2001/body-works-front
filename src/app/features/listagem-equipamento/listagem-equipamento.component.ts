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
import {
  IEquipamentoDTO,
  EQUIPAMENTO_TIPO
} from 'src/app/shared/models/equipamento.dto';
import { EquipamentoService } from 'src/app/shared/http-service/equipamento-service/equipamento.service';
export interface EquipamentoListagem {
  id: string;
  nome: string;
  tipo: string;
}

const ELEMENT_DATA: EquipamentoListagem[] = [
  {
    id: '',
    nome: 'Supino',
    tipo: 'Livre'
  },
];

@Component({
  selector: 'app-listagem-equipamento',
  templateUrl: './listagem-equipamento.component.html',
  styleUrls: ['./listagem-equipamento.component.scss'],
})
export class ListagemEquipamentoComponent{
  listaEquipamentos: EquipamentoListagem[] = [];

  displayedColumns: string[] = [
    'nome',
    'tipo',
    'actions'
  ];
  equipamentos: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<EquipamentoListagem>;
  @ViewChild(MatTable) table!: MatTable<EquipamentoListagem>;

  constructor(
    private equipamentoSerivice: EquipamentoService,
    private router: Router,
    private snack: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.carregarListaEquipamentos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  carregarListaEquipamentos() {
    this.listaEquipamentos.slice(0, this.listaEquipamentos.length);
    this.dataSource.data = [];
    this.equipamentoSerivice.obterTodosEquipamentos().subscribe((res) => {

          res.dados.forEach((equipamentos: any) => {
            const equipamentoResumido: EquipamentoListagem = {
              id: equipamentos.id,
              nome: equipamentos.nome,
              tipo: equipamentos.tipo,
            };
            this.listaEquipamentos.push(equipamentoResumido);
            this.dataSource.data = this.listaEquipamentos;
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

    vaiParaEditarEquipamentos(row: any) {
      const id = row.id;
      this.router.navigate(['/edita-equipamento/' + id]);
    }
}
