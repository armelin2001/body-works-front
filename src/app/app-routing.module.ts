import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { CadastroComponent } from './features/cadastro/cadastro.component';
import { EditCadastroComponent } from './features/edit-cadastro/edit-cadastro.component';
import { HomeUsuarioComponent } from './features/home-usuario/home-usuario.component';
import { EquipamentoListComponent } from './features/lista-equipamentos/lista-equipamentos.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path: 'cadastro', component: CadastroComponent},
  {path: 'home-usuario/:id', component: HomeUsuarioComponent},
  {path: 'edit-cadastro/:id', component: EditCadastroComponent},
  {path: 'lista-equipamentos', component: EquipamentoListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
