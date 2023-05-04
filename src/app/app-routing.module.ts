import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { CadastroComponent } from './features/cadastro/cadastro.component';
import { EditCadastroComponent } from './features/edit-cadastro/edit-cadastro.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path: 'cadastro', component: CadastroComponent},
  {path: 'edit-cadastro', component: EditCadastroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
