import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ExercicioService } from 'src/app/shared/http-service/exercicio-service/exercicio.service';


@Component({
  selector: 'app-card-exercicio',
  templateUrl: './card-exercicio.component.html',
  styleUrls: ['./card-exercicio.component.scss']
})
export class CardExercicioComponent {
  @Input()
  id: string | undefined = '';

  @Input()
  nome: string = '';

  @Input()
  tipoExercicio: string = '';

  @Input()
  equipamentoNecessario: string = '';

  @Input()
  nivelDificuldade: string = '';

  @Input()
  videoDemonstrativo: string = '';
  
  @Input()
  musculosTrabalhados: string = '';

  @Output()
  removido = new EventEmitter<boolean>();

  constructor(
    private execicioService: ExercicioService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  vaiParaEditarExercicio() {
    this.router.navigate(['/edita-exercicio/' + this.id]);
  }

  deletaExercicio() {
    if (this.id) {
      this.execicioService.deletarExercicio(this.id).subscribe(
        (res) => {
          this.snack.open(
            'Exercício ' + res.nome + ' removido com sucesso!',
            'OK',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );
          this.removido.emit(true);
          this.router.navigate(['/home-usuario/']);
        },
        (err) => {
          console.error('Erro ao excluir exercício:', err);
        }
      );
    }
  }

}
