import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './features/login/login.component';
import { MaterialModule } from 'src/material.module';
import { LoginService } from './shared/http-service/login-service/login.service';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpClient,
} from '@angular/common/http';
import { CadastroComponent } from './features/cadastro/cadastro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from './shared/http-service/usuario-service/usuario.service';
import { EditCadastroComponent } from './features/edit-cadastro/edit-cadastro.component';
import { MatCardModule } from '@angular/material/card';
import { HomeUsuarioComponent } from './features/home-usuario/home-usuario.component';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { LocalstorageService } from './shared/local-storage/localstorage.service';
import { EditAdmComponent } from './features/edit-adm/edit-adm.component';
import { UsuarioAcademiaService } from './shared/http-service/usuario-academia/usuario-academia.service';
import { ListagemUsuarioAcademiaComponent } from './features/listagem-usuario-academia/listagem-usuario-academia.component';
import { CadastroEquipamentoComponent } from './features/cadastro-equipamento/cadastro-equipamento.component';
import { EquipamentoService } from './shared/http-service/equipamento-service/equipamento.service';
import { MenuLateralComponent } from './shared/components/menu-lateral/menu-lateral.component';
import { ListagemEquipamentoComponent } from './features/listagem-equipamento/listagem-equipamento.component';
import { EditEquipamentoComponent } from './features/edit-equipamento/edit-equipamento.component';
import { CadastroExercicioComponent } from './features/cadastro-exercicio/cadastro-exercicio.component';
import { ExercicioService } from './shared/http-service/exercicio-service/exercicio.service';
import { ListagemUsuarioComponent } from './features/listagem-usuario/listagem-usuario.component';
import { CardUsuarioComponent } from './features/listagem-usuario/components/card-usuario.component';
import { AuthService } from './shared/http-service/auth/auth.service';
import { TokenInterceptor } from './shared/components/interceptors/token-interceptor/token.interceptor';
import { AuthGuard } from './shared/guards/auth.guard';
import { AuthServiceGuard } from './shared/auth/auth.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CadastroFichaComponent } from './features/cadastro-ficha/cadastro-ficha.component';
import { FichaService } from './shared/http-service/ficha-service/ficha.service';
import { FichaUsuarioComponent } from './features/ficha-usuario/ficha-usuario.component';
import { UsuarioTreinoComponent } from './features/usuario-treino/usuario-treino.component';
import { UsuarioTreinoCoreComponent } from './features/usuario-treino-core/usuario-treino-core.component';
import { HistoricoTreinoService } from './shared/http-service/historico-treino-service/historico-treino.service';
import { ExercicioTreinoComponent } from './features/usuario-treino-core/components/exercicio-treino/exercicio-treino.component';
import { TreinoService } from './shared/http-service/treino-service/treino.service';
import { InstrutorFeedbackComponent } from './features/instrutor-feedback/instrutor-feedback.component';
import { UsuarioHistoricoTreinoComponent } from './features/usuario-historico-treino/usuario-historico-treino.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { PresencaService } from './shared/http-service/presenca/presenca.service';
import { EditExercicioComponent } from './features/edit-exercicio/edit-exercicio.component';
import { ListagemExercicioComponent } from './features/listagem-exercicio/listagem-exercicio.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    EditCadastroComponent,
    HomeUsuarioComponent,
    EditAdmComponent,
    ListagemUsuarioAcademiaComponent,
    CadastroEquipamentoComponent,
    MenuLateralComponent,
    ListagemEquipamentoComponent,
    EditEquipamentoComponent,
    CadastroExercicioComponent,
    ListagemUsuarioComponent,
    CardUsuarioComponent,
    CadastroFichaComponent,
    FichaUsuarioComponent,
    UsuarioTreinoComponent,
    UsuarioTreinoCoreComponent,
    ExercicioTreinoComponent,
    InstrutorFeedbackComponent,
    UsuarioHistoricoTreinoComponent,
    EditExercicioComponent,
    ListagemExercicioComponent,
  ],
  imports: [
    BrowserModule,
    HighchartsChartModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxMaskDirective,
    MatCardModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    LoginService,
    UsuarioService,
    UsuarioAcademiaService,
    AuthService,
    EquipamentoService,
    ExercicioService,
    FichaService,
    AuthServiceGuard,
    AuthGuard,
    HistoricoTreinoService,
    PresencaService,
    TreinoService,
    provideNgxMask(),
    LocalstorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
