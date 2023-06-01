import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioAcademiaService } from 'src/app/shared/http-service/usuario-academia/usuario-academia.service';

@Component({
  selector: 'app-card-usuario-academia',
  templateUrl: './card-usuario-academia.component.html',
  styleUrls: ['./card-usuario-academia.component.scss'],
})
export class CardUsuarioAcademiaComponent {
  @Input()
  id: string | undefined = '';

  @Input()
  nome: string = '';

  @Input()
  cpf: string = '';

  @Input()
  email: string = '';

  @Output()
  idRemovido = new EventEmitter<string>();
 
  constructor(
    private usuarioAcademiaService: UsuarioAcademiaService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  vaiParaEditarInstrutor() {
    this.router.navigate(['/edit-cadastro-adm/' + this.id + '/' + true]);
  }

  deletaInstrutor() {
    if (this.id) {
      this.usuarioAcademiaService.deletaUsuarioAcademia(this.id).subscribe(
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
          this.idRemovido.emit(this.id);
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
