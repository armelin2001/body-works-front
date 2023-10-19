import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { CadastroComponent } from './features/cadastro/cadastro.component';
import { EditCadastroComponent } from './features/edit-cadastro/edit-cadastro.component';
import { HomeUsuarioComponent } from './features/home-usuario/home-usuario.component';
import { EditAdmComponent } from './features/edit-adm/edit-adm.component';
import { ListagemUsuarioAcademiaComponent } from './features/listagem-usuario-academia/listagem-usuario-academia.component';
import { CadastroEquipamentoComponent } from './features/cadastro-equipamento/cadastro-equipamento.component';
import { ListagemEquipamentoComponent } from './features/listagem-equipamento/listagem-equipamento.component';
import { EditEquipamentoComponent } from './features/edit-equipamento/edit-equipamento.component';
import { CadastroExercicioComponent } from './features/cadastro-exercicio/cadastro-exercicio.component';
import { ListagemUsuarioComponent } from './features/listagem-usuario/listagem-usuario.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { CadastroFichaComponent } from './features/cadastro-ficha/cadastro-ficha.component';
import { FichaUsuarioComponent } from './features/ficha-usuario/ficha-usuario.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'home-usuario', component: HomeUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'edit-cadastro/:id', component: EditCadastroComponent, canActivate: [AuthGuard] },
  { path: 'edit-cadastro-adm/:id/:edita', component: EditAdmComponent, canActivate: [AuthGuard] },
  { path: 'visualiza-instrutores', component: ListagemUsuarioAcademiaComponent, canActivate: [AuthGuard] },
  { path: 'equipamento-cadastro', component: CadastroEquipamentoComponent, canActivate: [AuthGuard] },
  { path: 'visualiza-equipamentos', component: ListagemEquipamentoComponent, canActivate: [AuthGuard] },
  { path: 'edita-equipamento/:id', component: EditEquipamentoComponent, canActivate: [AuthGuard] },
  { path: 'cadastro-exercicio', component: CadastroExercicioComponent, canActivate: [AuthGuard] },
  { path: 'visualiza-usuario', component: ListagemUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'cadastro-ficha-treino', component: CadastroFichaComponent, canActivate: [AuthGuard] },
  { path: 'usuario-ficha', component: FichaUsuarioComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
