import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/shared/http-service/usuario-service/usuario.service';
import { LocalstorageService } from 'src/app/shared/local-storage/localstorage.service';

@Component({
  selector: 'app-home-usuario',
  templateUrl: './home-usuario.component.html',
  styleUrls: ['./home-usuario.component.scss'],
})
export class HomeUsuarioComponent implements OnInit {
  showAccountMenu = false;
  id: string = '';
  adm: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private localStorage: LocalstorageService
  ) {}

  ngOnInit() {
    const usuario = this.localStorage.obter('usuario') as any;
    this.adm = usuario.adm;
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  navigateToEditCadastro(): void {
    this.router.navigate(['/edit-cadastro/' + this.id]);
  }

  logout() {
    this.localStorage.remover('usuario');
    this.router.navigate(['/login']);
  }

  navegaParaEditAdm() {
    this.router.navigate(['/edit-cadastro-adm/' + this.id + "/" + true]);
  }

  navegarParaCadastroInstrutor(){
    this.router.navigate(['/cadastro-instrutor/' + this.id + "/" + false]);
  }
}
