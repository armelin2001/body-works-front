import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { CadastroComponent } from './features/cadastro/cadastro.component';
import { EditCadastroComponent } from './features/edit-cadastro/edit-cadastro.component';
import { HomeUsuarioComponent } from './features/home-usuario/home-usuario.component';
import { EditAdmComponent } from './features/edit-adm/edit-adm.component';
import { ListagemUsuarioAcademiaComponent } from './features/listagem-usuario-academia/listagem-usuario-academia.component';
import { CadastroEquipamentoComponent } from './features/cadastro-equipamento/cadastro-equipamento.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path: 'cadastro', component: CadastroComponent},
  {path: 'home-usuario/:id', component: HomeUsuarioComponent},
  {path: 'edit-cadastro/:id', component: EditCadastroComponent},
  {path: 'edit-cadastro-adm/:id/:edita', component: EditAdmComponent},
  {path: 'visualiza-instrutores', component: ListagemUsuarioAcademiaComponent},
  {path: 'equipamento-cadastro', component: CadastroEquipamentoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
