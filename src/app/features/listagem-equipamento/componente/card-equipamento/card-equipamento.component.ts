import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EquipamentoService } from 'src/app/shared/http-service/equipamento-service/equipamento.service';

@Component({
  selector: 'app-card-equipamento',
  templateUrl: './card-equipamento.component.html',
  styleUrls: ['./card-equipamento.component.scss'],
})
export class CardEquipamentoComponent {
  @Input()
  id: string | undefined = '';

  @Input()
  nome: string = '';

  @Input()
  tipo: string = '';

  @Output()
  removido = new EventEmitter<boolean>();

  constructor(
    private equipamentoService: EquipamentoService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  vaiParaEditarEquipamento() {
    this.router.navigate(['/edita-equipamento/' + this.id]);
  }

  deletaEquipamento() {
    if (this.id) {
      this.equipamentoService.deletarEquipamento(this.id).subscribe(
        (res) => {
          this.snack.open(
            'Equipamento ' + res.nome + ' removido com sucesso!',
            'OK',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );
          this.removido.emit(true);
        },
        (err) => {}
      );
    }
  }
}
