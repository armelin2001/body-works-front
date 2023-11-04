import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as Highcharts from 'highcharts';
import { ExercicioService } from 'src/app/shared/http-service/exercicio-service/exercicio.service';
import { TreinoService } from 'src/app/shared/http-service/treino-service/treino.service';
import { LocalstorageService } from 'src/app/shared/local-storage/localstorage.service';

export interface TreinoElemento {
  nomeExercicio: string;
  cargaMaxima: number;
  totalRepeticoes: number;
  totalSeries: number;
  chartOptionsCarga: Highcharts.Options;
  chartOptionsRepeticoes: Highcharts.Options;
}
const baseChardOptions: Highcharts.Options = {
  chart: {
    backgroundColor: '#6b6969',
  },
  legend: {
    backgroundColor: '#6b6969',
  },
  xAxis: {
    labels: {
      style: {
        color: '#6b6969',
      },
    },
  },
};
const DATA_TREINO: TreinoElemento[] = [
  {
    nomeExercicio: 'Supino',
    cargaMaxima: 100,
    totalRepeticoes: 150,
    totalSeries: 15,
    chartOptionsCarga: {
      ...baseChardOptions,
      title: {
        text: 'Carga KG',
      },
      series: [
        {
          type: 'line',
          color: '#e04679',
          name: 'Carga KG',
          data: [100, 34, 22, 72, 10],
        },
      ],
    },
    chartOptionsRepeticoes: {
      ...baseChardOptions,
      title: {
        text: 'Repetições',
      },
      series: [
        {
          type: 'line',
          color: '#e04679',
          name: 'Repetições',
          data: [10, 9, 12, 8, 10],
        },
      ],
    },
  },

];

@Component({
  selector: 'app-usuario-historico-treino',
  templateUrl: './usuario-historico-treino.component.html',
  styleUrls: ['./usuario-historico-treino.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class UsuarioHistoricoTreinoComponent implements AfterViewInit {
  dataSource!: MatTableDataSource<TreinoElemento>;
  Highcharts: typeof Highcharts = Highcharts;
  columnsToDisplay = [
    'nomeExercicio',
    'cargaMaxima',
    'totalRepeticoes',
    'totalSeries',
  ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: TreinoElemento | undefined | null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  baseChardOptions: Highcharts.Options = {
    chart: {
      backgroundColor: '#6b6969',
    },
    legend: {
      backgroundColor: '#6b6969',
    },
    xAxis: {
      tickWidth: 0,
      lineWidth: 1,
      labels: {
        style: {
          color: '#6b6969',
        },
      },
    },
  };
  constructor(
    private exercicioService: ExercicioService,
    private treinoService: TreinoService,
    private localStorage: LocalstorageService
  ) {
    this.dataSource = new MatTableDataSource(DATA_TREINO);

    const usuario = this.localStorage.obter('usuario') as any;
    const idUsuario = String(usuario.id);
    const listaExerciciosTreino: any[] = [];
    this.treinoService.obterTreinosPorIdUsuario(idUsuario).subscribe((res) => {
      res.forEach((element: any) => {
        element.exercicios.forEach((exercicio: any) => {
          listaExerciciosTreino.push(exercicio);
        });
      });

      const exerciciosUnicos: any = {};
      const idsExercicios: string[] = [];

      listaExerciciosTreino.forEach((exercicio: any) => {
        const idExercicio = exercicio.idExercicio;

        if (!exerciciosUnicos[idExercicio]) {
          exerciciosUnicos[idExercicio] = true;
          idsExercicios.push(exercicio.idExercicio);
        }
      });
      const exerciciosSemNome: TreinoElemento[] = [];

      idsExercicios.forEach((idExercicios) => {
        const exercicioFiltradoPorId = listaExerciciosTreino.filter(
          (exercicio) => exercicio.idExercicio === idExercicios
        );
        const listaCarga: number[] = [];
        const listaRepeticoes: number[] = [];
        let totalRepeticoes: number = 0;
        let totalSeries: number = 0;

        exercicioFiltradoPorId.forEach((exercicio: any) => {
          totalSeries = totalSeries + exercicio.series;
          exercicio.carga.forEach((carga: number) => listaCarga.push(carga));
          exercicio.repeticoes.forEach((repeticao: number) =>
            listaRepeticoes.push(repeticao)
          );
        });

        const cargaMaxima = Math.max(...listaCarga);
        totalRepeticoes = listaRepeticoes.reduce(
          (total, numero) => total + numero
        );

        const exercicio: TreinoElemento = {
          nomeExercicio: idExercicios,
          cargaMaxima,
          totalRepeticoes,
          totalSeries,
          chartOptionsCarga: {
            ...this.baseChardOptions,
            series: [
              {
                type: 'line',
                color: '#e04679',
                name: 'Carga KG',
                data: listaCarga,
              },
            ],
          },
          chartOptionsRepeticoes: {
            ...this.baseChardOptions,
            title: {
              text: 'Repetições',
            },
            series: [
              {
                type: 'line',
                color: '#e04679',
                name: 'Repetições',
                data: listaRepeticoes,
              },
            ],
          },
        };

        exerciciosSemNome.push(exercicio);
      });
      this.exercicioService.obterTodosExercicios().subscribe((res) => {
        const listaExercicios = res.dados;
        exerciciosSemNome.forEach((exercicio) => {
          const idExercicio = exercicio.nomeExercicio;
          const exercicioFiltradoPorId = listaExercicios.find(
            (exercicio: any) => exercicio.id === idExercicio
          );
          exercicio.nomeExercicio = exercicioFiltradoPorId.nome;
        });
      });
      this.dataSource.data = exerciciosSemNome; 
    });
  }
  ngAfterViewInit(): void {
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