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
import { EquipamentoService } from 'src/app/shared/http-service/equipamento-service/equipamento.service';
import { ExercicioService } from 'src/app/shared/http-service/exercicio-service/exercicio.service';
export interface ExercicioListagem {
  id: string;
  nome: string;
  tipoExercicio: string;
  equipamentoNecessario: string;
  musculosTrabalhados: string;
}

const ELEMENT_DATA: ExercicioListagem[] = [
  {
    id: '',
    nome: 'Supino',
    tipoExercicio: 'Força',
    equipamentoNecessario: 'Banco Supino',
    musculosTrabalhados: 'Peito',
  },
];

@Component({
  selector: 'app-listagem-exercicio',
  templateUrl: './listagem-exercicio.component.html',
  styleUrls: ['./listagem-exercicio.component.scss'],
})
export class ListagemExercicioComponent implements AfterViewInit {
  listaExercicio: ExercicioListagem[] = [];

  displayedColumns: string[] = [
    'nome',
    'tipoExercicio',
    'equipamentoNecessario',
    'musculosTrabalhados',
    'actions',
  ];
  equipamentos: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<ExercicioListagem>;
  @ViewChild(MatTable) table!: MatTable<ExercicioListagem>;

  constructor(
    private exercicioSerivice: ExercicioService,
    private router: Router,
    private equipamentoService: EquipamentoService,
    private snack: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.carregarListaExercicios();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  carregarListaExercicios() {
    this.listaExercicio.slice(0, this.listaExercicio.length);
    this.dataSource.data = [];
    this.equipamentoService.obterTodosEquipamentos().subscribe((data) => {
      this.equipamentos = data.dados;
      this.exercicioSerivice.obterTodosExercicios().subscribe((res) => {
        
        res.dados.forEach((exercicio: any) => {
          const equipamento = this.equipamentos.find((equipamento: any) => {
            return equipamento.id === exercicio.equipamentoNecessario;
          });
          const ExercicioResumido: ExercicioListagem = {
            id: exercicio.id,
            nome: exercicio.nome,
            tipoExercicio: exercicio.tipoExercicio,
            equipamentoNecessario: equipamento.nome,
            musculosTrabalhados: exercicio.musculosTrabalhados,
          };
          this.listaExercicio.push(ExercicioResumido);
          this.dataSource.data = this.listaExercicio;
        });
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

  vaiParaEditarExercicio(row: any) {
    const id = row.id;
    this.router.navigate(['/edita-exercicio/' + id]);
  }
}
