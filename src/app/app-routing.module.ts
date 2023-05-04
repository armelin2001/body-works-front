import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { CadastroComponent } from './features/cadastro/cadastro.component';
import { EditCadastroComponent } from './features/edit-cadastro/edit-cadastro.component';
import { HomeUsuarioComponent } from './features/home-usuario/home-usuario.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path: 'cadastro', component: CadastroComponent},
  {path: 'home-usuario', component: HomeUsuarioComponent},
  {path: 'edit-cadastro', component: EditCadastroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
