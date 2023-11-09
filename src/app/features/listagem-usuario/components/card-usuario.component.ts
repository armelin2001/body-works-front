import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UsuarioService } from 'src/app/shared/http-service/usuario-service/usuario.service'; // Atualize este caminho

@Component({
  selector: 'app-card-usuario',
  templateUrl: './card-usuario.component.html',
  styleUrls: ['./card-usuario.component.scss'],
})
export class CardUsuarioComponent {
  @Input() usuario: any;
  @Output() statusChanged = new EventEmitter<any>();

  constructor(
    private snack: MatSnackBar,
    private usuarioService: UsuarioService,
    private router: Router,
    private translateService: TranslateService,
    ) {}

  atualizarStatusPagamento() {
    this.usuarioService
      .atualizarStatusPagamento(this.usuario.id, this.usuario.statusPagamento)
      .subscribe(
        (res) => {
          this.statusChanged.emit(res);
        },
        (err) => {
          console.error('Erro ao atualizar status de pagamento:', err);
        }
      );
  }

  formatCPF(cpf: string): string {
    return `${cpf.substr(0, 3)}.${cpf.substr(3, 3)}.${cpf.substr(
      6,
      3
    )}-${cpf.substr(9, 2)}`;
  }
  excluirUsuario() {
    if(this.usuario.statusPagamento !== 'cancelado'){
      this.snack.open(
        this.translateService.instant('tsCardUsuario.barraCancelamentoUsuario'),
        'OK',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        }
      );
      return;
    }
    this.usuarioService.excluirUsuario(this.usuario.id).subscribe(
      (res) => {
        this.router.navigate(['/visualiza-usuario/']);
      },
      (err) => {
        console.error('Erro ao excluir usuário:', err);
      }
    );
  }
}
