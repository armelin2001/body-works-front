import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './features/login/login.component';
import { MaterialModule } from 'src/material.module';
import { LoginService } from './shared/http-service/login-service/login.service';
import { HttpClientModule } from '@angular/common/http';
import { CadastroComponent } from './features/cadastro/cadastro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from './shared/http-service/usuario-service/usuario.service';
import { EditCadastroComponent } from './features/edit-cadastro/edit-cadastro.component';
import { HomeUsuarioComponent } from './features/home-usuario/home-usuario.component';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { LocalstorageService } from './shared/local-storage/localstorage.service';
import { EditAdmComponent } from './features/edit-adm/edit-adm.component';
import { UsuarioAcademiaService } from './shared/http-service/usuario-academia/usuario-academia.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    EditCadastroComponent,
    HomeUsuarioComponent,
    EditAdmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxMaskDirective,
  ],
  providers: [
    LoginService,
    UsuarioService,
    UsuarioAcademiaService,
    provideNgxMask(),
    LocalstorageService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
